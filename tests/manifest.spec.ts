import {test,expect} from '@playwright/test';
import {readFile,access} from 'node:fs/promises';

test('designer manifest points to real JS modules, exports, registrations, and inheritance',async({page,request})=>{
 const manifest=JSON.parse(await readFile('custom-elements.json','utf8'));
 expect(manifest.schemaVersion).toBe('1.0.0');
 const modulePaths=new Set(manifest.modules.map((m:any)=>m.path));
 const definitions:any[]=[];
 for(const module of manifest.modules){
  expect(module.path).toMatch(/^dist\/[^/]+\.js$/);await access(module.path);
  expect((await request.get('/'+module.path)).ok()).toBe(true);
  for(const declaration of module.declarations){
   if(declaration.superclass?.module)expect(modulePaths.has(declaration.superclass.module)).toBe(true);
   if(!declaration.customElement)continue;
   expect(declaration.description).toBeTruthy();
   for(const attribute of declaration.attributes)expect(declaration.members.some((member:any)=>member.name===attribute.fieldName&&member.description)).toBe(true);
  }
  definitions.push(...module.exports.filter((e:any)=>e.kind==='custom-element-definition'));
 }
 expect(definitions.length).toBeGreaterThan(100);expect(new Set(definitions.map(d=>d.name)).size).toBe(definitions.length);
 await page.route('**/designer.html',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><script type="importmap">{"imports":{"@node-projects/base-custom-webcomponent":"./vendor/base-custom-webcomponent/index.js"}}</script>'}));
 await page.goto('/designer.html');
 const results=await page.evaluate(async definitions=>{
  const result=[];
  for(const definition of definitions){
   const module=await import('/'+definition.declaration.module);const constructor=module[definition.declaration.name];
   const element=document.createElement(definition.name);
   result.push({tag:definition.name,exported:typeof constructor==='function',registered:customElements.get(definition.name)===constructor,instance:element instanceof constructor});
  }
  return result;
 },definitions);
 expect(results.filter(r=>!r.exported||!r.registered||!r.instance)).toEqual([]);
});

test('published export map permits each designer-facing module path',async()=>{
 const pkg=JSON.parse(await readFile('package.json','utf8'));const manifest=JSON.parse(await readFile('custom-elements.json','utf8'));
 expect(pkg.customElements).toBe('custom-elements.json');
 for(const module of manifest.modules){
  expect(pkg.exports['./dist/*.js'].import).toBe('./dist/*.js');
  const resolved=import.meta.resolve(pkg.name+'/'+module.path);
  expect(resolved).toMatch(new RegExp(module.path.replaceAll('.','\\.')+'$'));
 }
});
