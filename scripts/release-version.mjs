import {readFile,appendFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
export function releaseVersion(event){
  const release=event?.release;
  if(!release||release.draft)throw new Error('A published GitHub release is required.');
  const tag=release.tag_name;
  if(typeof tag!=='string')throw new Error('Missing release tag.');
  const version=tag.replace(/^v/,'');
  const match=/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/.exec(version);
  if(!match||match[4]?.split('.').some(id=>/^\d+$/.test(id)&&id.length>1&&id.startsWith('0')))throw new Error('Release tag must be a semantic version such as v1.2.3 or v1.2.3-beta.1.');
  return {version,tag,distTag:release.prerelease||match[4]?'next':'latest'};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const event=JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH,'utf8'));
  const info=releaseVersion(event);
  execFileSync('npm',['version',info.version,'--no-git-tag-version','--ignore-scripts','--allow-same-version'],{stdio:'inherit'});
  if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,`version=${info.version}\ndist_tag=${info.distTag}\n`);
  console.log(`Release ${info.tag}: package version ${info.version}, npm dist-tag ${info.distTag}`);
}
