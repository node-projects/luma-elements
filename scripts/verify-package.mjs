import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
export function verifyPackage(tarball){
 const options={encoding:'utf8',maxBuffer:16*1024*1024};
 const entries=new Set(execFileSync('tar',['-tzf',tarball],options).trim().split('\n'));
 const read=name=>execFileSync('tar',['-xOf',tarball,'package/'+name],options);
 const pkg=JSON.parse(read('package.json'));
 const manifest=JSON.parse(read('custom-elements.json'));
 assert.equal(manifest.schemaVersion,'1.0.0');
 for(const module of manifest.modules){assert.match(module.path,/^dist\/[^/]+\.js$/);assert(entries.has('package/'+module.path),'Missing designer module '+module.path);}
 for(const file of ['dist/index.js','dist/index.d.ts','dist/elements.d.ts','dist/themes.css','dist/luma-elements.js','docs/API.md','docs/COVERAGE.md','docs/RELEASING.md','THIRD_PARTY_NOTICES.md','licenses/material-design-icons.txt'])assert(entries.has('package/'+file),'Missing package file '+file);
 assert.deepEqual(Object.keys(pkg.dependencies),['@node-projects/base-custom-webcomponent']);
 assert(read('dist/version.js').includes(JSON.stringify(pkg.version)),'Compiled version does not match package version');
 const elements=manifest.modules.flatMap(m=>m.exports).filter(e=>e.kind==='custom-element-definition').length;
 console.log(`Verified package ${pkg.version}: ${elements} element definitions, ${manifest.modules.length} real JavaScript modules, types, themes, and documentation.`);
 return {version:pkg.version,elements,modules:manifest.modules.length};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)verifyPackage(process.argv[2]);
