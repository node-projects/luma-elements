import {test} from 'node:test';
import assert from 'node:assert/strict';
import {releaseVersion} from '../scripts/release-version.mjs';
test('stable releases derive the npm version from the release tag',()=>{
 assert.deepEqual(releaseVersion({release:{tag_name:'v2.3.4'}}),{version:'2.3.4',tag:'v2.3.4',distTag:'latest'});
 assert.equal(releaseVersion({release:{tag_name:'2.3.4'}}).version,'2.3.4');
});
test('prereleases use next instead of replacing latest',()=>{
 assert.equal(releaseVersion({release:{tag_name:'v2.3.4-beta.1'}}).distTag,'next');
 assert.equal(releaseVersion({release:{tag_name:'v2.3.4',prerelease:true}}).distTag,'next');
});
test('invalid versions, shell-like tags, drafts, and leading-zero identifiers are rejected',()=>{
 for(const tag_name of ['v01.2.3','v1.2','latest','v1.2.3-beta.01','v1.2.3; echo test','--help'])assert.throws(()=>releaseVersion({release:{tag_name}}));
 assert.throws(()=>releaseVersion({release:{tag_name:'v1.2.3',draft:true}}));assert.throws(()=>releaseVersion({}));
});

test('the release command versions both package files without creating a git tag',async()=>{
 const {mkdtemp,writeFile,readFile,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');const {execFileSync}=await import('node:child_process');const {fileURLToPath}=await import('node:url');
 const directory=await mkdtemp(join(tmpdir(),'luma-release-test-'));
 try{
  await writeFile(join(directory,'package.json'),JSON.stringify({name:'release-smoke',version:'0.1.0'}));
  await writeFile(join(directory,'package-lock.json'),JSON.stringify({name:'release-smoke',version:'0.1.0',lockfileVersion:3,packages:{'':{name:'release-smoke',version:'0.1.0'}}}));
  await writeFile(join(directory,'event.json'),JSON.stringify({release:{tag_name:'v2.4.1-beta.2',prerelease:true}}));
  execFileSync(process.execPath,[fileURLToPath(new URL('../scripts/release-version.mjs',import.meta.url))],{cwd:directory,env:{...process.env,GITHUB_EVENT_PATH:join(directory,'event.json'),GITHUB_OUTPUT:join(directory,'output')},stdio:'pipe'});
  assert.equal(JSON.parse(await readFile(join(directory,'package.json'),'utf8')).version,'2.4.1-beta.2');
  const lock=JSON.parse(await readFile(join(directory,'package-lock.json'),'utf8'));assert.equal(lock.version,'2.4.1-beta.2');assert.equal(lock.packages[''].version,'2.4.1-beta.2');
  assert.match(await readFile(join(directory,'output'),'utf8'),/version=2\.4\.1-beta\.2\ndist_tag=next/);
 }finally{await rm(directory,{recursive:true,force:true});}
});
