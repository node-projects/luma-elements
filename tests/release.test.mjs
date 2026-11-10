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
