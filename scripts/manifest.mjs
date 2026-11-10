import ts from 'typescript';
import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';

/** Emit a CEM against the compiled, publishable modules, never TypeScript source paths. */
export async function writeManifest(catalog){
  const files=(await readdir('src')).filter(name=>name.endsWith('.ts')).map(name=>'src/'+name);
  const classes=new Map();
  const modules=new Map();
  for(const file of files){
    const source=ts.createSourceFile(file,await readFile(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
    const modulePath='dist/'+path.basename(file,'.ts')+'.js';
    const module={kind:'javascript-module',path:modulePath,declarations:[],exports:[]};modules.set(modulePath,module);
    for(const node of source.statements){if(!ts.isClassDeclaration(node)||!node.name)continue;
      const superclass=node.heritageClauses?.find(c=>c.token===ts.SyntaxKind.ExtendsKeyword)?.types[0].expression.getText(source);
      const fields=new Map();
      const methods=[];
      for(const member of node.members){
        if(member.modifiers?.some(m=>[ts.SyntaxKind.PrivateKeyword,ts.SyntaxKind.ProtectedKeyword,ts.SyntaxKind.StaticKeyword].includes(m.kind)))continue;
        const name=member.name?.getText(source);if(!name)continue;
        if(ts.isPropertyDeclaration(member)||ts.isGetAccessorDeclaration(member))fields.set(name,{type:member.type?.getText(source),readonly:ts.isGetAccessorDeclaration(member)});
        if(ts.isMethodDeclaration(member)&&!['ready','connectedCallback','disconnectedCallback','attributeChangedCallback'].includes(name))methods.push({kind:'method',name,privacy:'public',description:ts.getJSDocCommentsAndTags(member).map(doc=>doc.comment||'').join('\n'),parameters:member.parameters.map(p=>({name:p.name.getText(source),type:{text:p.type?.getText(source)||'unknown'},optional:!!p.questionToken})),return:{type:{text:member.type?.getText(source)||'void'}}});
      }
      classes.set(node.name.text,{name:node.name.text,module:modulePath,superclass,fields,methods,text:node.getText(source),exported:node.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword)});
    }
  }
  const lineage=name=>{const result=[];const seen=new Set();let item=classes.get(name);while(item&&!seen.has(item.name)){result.push(item);seen.add(item.name);item=classes.get(item.superclass);}return result;};
  const tagByClass=new Map(catalog.map(item=>[item.name,item]));
  const describeParts={root:'Component root wrapper.',card:'Outer card surface.',thumb:'Interactive handle or thumb.',dialog:'Native modal surface.',body:'Dialog body.',header:'Dialog header.',chart:'Standalone SVG plot.',wheel:'Hue/saturation selection surface.',arc:'Standalone SVG value arc.',fill:'Active arc/graph fill.',track:'Inactive control track.',control:'Control container.',button:'Interactive button surface.'};
  const standardEvents=[
    ['luma-change','Committed user change. Bubbles across Shadow DOM.','{property:string,value:unknown,entityId:string}'],
    ['luma-input','Live preview before commitment.','{property:string,value:unknown,entityId?:string}'],
    ['luma-action','Cancelable action request. Prevent more-info to supply your own popup.','{action:string,entityId?:string}'],
    ['luma-error','Invalid attribute value; the previous value is preserved.','{attribute:string,value:string,message:string}'],
  ];
  for(const record of classes.values()){
    const item=tagByClass.get(record.name);const chain=lineage(record.name);
    const fieldType=name=>chain.map(c=>c.fields.get(name)?.type).find(Boolean);
    const members=item?Object.entries(item.schema).map(([name,p])=>{
      const inherited=chain.slice(1).find(c=>tagByClass.get(c.name)?.schema[name]===p);
      return {kind:'field',name,privacy:'public',description:p.description,type:{text:fieldType(name)||({array:'unknown[]',object:'Record<string,unknown>',json:'unknown'}[p.type]||p.type)},default:JSON.stringify(p.default),attribute:name.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),...(inherited?{inheritedFrom:{name:inherited.name,module:inherited.module}}:{})};
    }):[];
    members.push(...record.methods);
    for(const [name,field] of record.fields)if(!members.some(m=>m.name===name))members.push({kind:'field',name,privacy:'public',type:{text:field.type||'unknown'},...(field.readonly?{readonly:true}:{})});
    const text=chain.map(c=>c.text).join('\n');
    const rendered=[];for(const candidate of chain){if(!/protected render\s*\(/.test(candidate.text))continue;rendered.push(candidate.text);if(!candidate.text.includes('super.render('))break;}
    const templateText=rendered.join('\n');
    const parts=[...new Set(['root',...[...templateText.matchAll(/part="([a-z][a-z -]*)"/g)].flatMap(match=>match[1].split(' ')),...[...templateText.matchAll(/exportparts="([a-z,: -]+)"/g)].flatMap(match=>match[1].split(',').map(value=>value.trim().split(':').at(-1)))])];
    const slots=[...new Set([...templateText.matchAll(/<slot(?:\s+name="([a-z-]+)")?/g)].map(match=>match[1]||''))];
    const css=[...new Set([...text.matchAll(/--luma-[a-z-]+/g)].map(match=>match[0]))];
    const superclass=record.superclass?(classes.has(record.superclass)?{name:record.superclass,module:classes.get(record.superclass).module}:{name:record.superclass,package:'@node-projects/base-custom-webcomponent'}):undefined;
    const extraEvents=[...new Set([...text.matchAll(/this\.emit\(['"](luma-[a-z-]+)['"]/g)].map(match=>match[1]))].filter(name=>!standardEvents.some(([known])=>known===name));
    const declaration={kind:'class',name:record.name,...(item?{description:item.description,tagName:item.tag,customElement:true}:{}),...(superclass?{superclass}:{}),members,
      ...(item?{attributes:Object.entries(item.schema).map(([name,p])=>({name:name.replace(/[A-Z]/g,c=>'-'+c.toLowerCase()),fieldName:name,description:p.description,type:{text:p.type==='boolean'?'boolean':p.type==='number'?'number':'string'},default:JSON.stringify(p.default)})),events:[...standardEvents.map(([name,description,type])=>({name,description,type:{text:'CustomEvent<'+type+'>'}})),...extraEvents.map(name=>({name,type:{text:'CustomEvent'},description:'Component-specific event; see the API and examples.'}))],cssParts:parts.map(name=>({name,description:describeParts[name]||name+' styling hook.'})),cssProperties:css.map(name=>({name,description:'Inherited theme variable.'})),slots:slots.map(name=>({name,description:name?name+' content.':'Default component content.'}))}:{}),};
    const module=modules.get(record.module);module.declarations.push(declaration);
    if(record.exported)module.exports.push({kind:'js',name:record.name,declaration:{name:record.name,module:record.module}});
    if(item)module.exports.push({kind:'custom-element-definition',name:item.tag,declaration:{name:item.name,module:record.module}});
  }
  // The public entry point reexports classes from their real implementation modules.
  const entry=modules.get('dist/index.js');
  entry.exports=[...classes.values()].filter(c=>c.exported&&c.name!=='LumaElement'||c.name==='LumaElement').map(c=>({kind:'js',name:c.name,declaration:{name:c.name,module:c.module}}));
  const manifest={schemaVersion:'1.0.0',readme:await readFile('README.md','utf8'),modules:[...modules.values()].filter(m=>m.declarations.length||m.exports.length)};
  await writeFile('custom-elements.json',JSON.stringify(manifest,null,2)+'\n');
  return manifest;
}
