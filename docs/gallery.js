import {catalog,detailDomains,VERSION} from './assets/luma-elements.js';
import {extraExamples,extraContents,category,energyExample,hourSeries,presetOptions,entityExample} from './examples.js';
document.querySelector('.version').firstChild.textContent='v'+VERSION+' ';
Object.assign(document.querySelector('#energy-demo'),energyExample);
const escape=value=>String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const attr=name=>name.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
const history=[{name:'Consumption',color:'blue',data:[400,520,480,700,650,950,840,1200,940,660,720,600,900,797.8]}];
const entities=[{label:'Kitchen lights',state:'on',icon:'light',toggle:true,entityId:'light.kitchen'},{label:'Front door',state:'Closed',icon:'lock',color:'green'},{label:'Garden lights',state:'off',icon:'light',toggle:true,entityId:'light.garden'}];
const forecast=[{day:'Mon',condition:'sunny',temperature:21,low:13},{day:'Tue',condition:'cloudy',temperature:19,low:12},{day:'Wed',condition:'rainy',temperature:17,low:11},{day:'Thu',condition:'sunny',temperature:22,low:14},{day:'Fri',condition:'sunny',temperature:23,low:15}];
document.querySelector('#home-sensor').series=history;
document.querySelector('luma-thermostat').presets=presetOptions;document.querySelector('luma-thermostat').preset='comfort';document.querySelector('luma-thermostat').stateLabel='Preheating';
document.querySelector('luma-tile[entity-id="light.floor_lamp"]').detailProperties={brightness:70,panel:'color',rgbColor:'#ffa24d',series:hourSeries};
document.querySelector('#home-weather').forecast=forecast;
document.querySelector('#home-entities').entities=entities;
document.querySelector('#home-glance').entities=[{label:'Front door',state:'Closed',icon:'lock'},{label:'Motion',state:'Clear',icon:'motion'},{label:'Home',state:'home',icon:'home',color:'green'}];
document.querySelector('#component-count').textContent=catalog.length;
const examples={
  'luma-icon':{name:'home',label:'Home'},
  'luma-button':{label:'Run evening scene',icon:'play'},
  'luma-switch':{label:'Living room light',checked:true},
  'luma-slider':{label:'Brightness',value:65,showValue:true,unit:'%'},
  'luma-number':{label:'Target',value:21,min:7,max:35,step:.5,unit:' °C'},
  'luma-select':{label:'HVAC mode',value:'heat',options:[{label:'Heating',value:'heat'},{label:'Cooling',value:'cool'},{label:'Off',value:'off'}]},
  'luma-badge':{label:'',icon:'temperature',state:'22.8 °C',color:'orange'},
  'luma-card':{label:'Living room'},
  'luma-heading':{label:'Living room',icon:'sofa'},
  'luma-tile':{label:'Spotlights',state:'on',icon:'light',toggle:true,feature:'brightness',value:65,entityId:'light.spotlights'},
  'luma-entity-row':{label:'Floor lamp',state:'on',toggle:true,entityId:'light.floor_lamp'},
  'luma-entities':{label:'Living room',entities,showHeaderToggle:true},
  'luma-glance':{label:'At a glance',entities:[{label:'Temperature',state:'22.8 °C',icon:'temperature'},{label:'Humidity',state:'57 %',icon:'humidity'},{label:'Door',state:'Closed',icon:'lock'}]},
  'luma-grid':{columns:2,gap:8},
  'luma-stack':{direction:'vertical',gap:8},
  'luma-thermostat':{label:'Downstairs',temperature:21,currentTemperature:20.8,state:'heating'},
  'luma-light':{label:'Reading light',state:'on',brightness:70,colorTemperature:3000},
  'luma-cover':{label:'Living room blinds',state:'open',position:85,color:'purple'},
  'luma-media-player':{label:'Living room speaker',state:'playing',mediaTitle:'A little closer to home',artist:'Evening playlist',volume:35,color:'blue'},
  'luma-weather':{label:'Outside',temperature:18,condition:'Partly cloudy',forecast},
  'luma-alarm':{label:'Home alarm',state:'disarmed'},
  'luma-history':{label:'Energy use',unit:'W',series:history},
  'luma-sensor':{label:'Temperature',value:22.8,unit:'°C',series:[{name:'Living room',data:[21,21.4,21.2,22,21.8,22.2,22.1,22.8]}]},
  'luma-gauge':{label:'Battery',value:72,unit:'%'},
  'luma-button-card':{label:'Evening scene',icon:'light',state:'on',color:'amber'},
  'luma-picture':{label:'Living room',src:'room.svg',alt:'Illustration of a calm living room with a sofa, window and plants',caption:'A place to slow down.'},
  'luma-text':{label:'Welcome home',content:'A little light. Your favorite music.\nEverything just the way you like it.'},
};
Object.assign(examples,extraExamples);
const contents={
  'luma-card':'<p style="margin:0;color:var(--luma-secondary-text)">A simple surface for your own content.</p>',
  'luma-grid':'<luma-tile label="Floor lamp" state="on" toggle></luma-tile><luma-tile label="Desk light" state="off" toggle></luma-tile>',
  'luma-stack':'<luma-tile label="Floor lamp" state="on" toggle></luma-tile><luma-tile label="Desk light" state="off" toggle></luma-tile>',
};
Object.assign(contents,extraContents);
function snippet(tag){
  const values=examples[tag] || {};
  const attributes=Object.entries(values).map(([key,value])=>{
    if(typeof value==='boolean')return value ? attr(key) : '';
    if(typeof value==='object')return `${attr(key)}='${JSON.stringify(value).replace(/'/g,'&#39;')}'`;
    return `${attr(key)}="${escape(value)}"`;
  }).filter(Boolean).join('\n  ');
  return `<${tag}${attributes?'\n  '+attributes:''}>${contents[tag]?'\n  '+contents[tag]+'\n':''}</${tag}>`;
}
let selectedCategory='all';
function filter(){const search=document.querySelector('#search').value.trim().toLowerCase();let count=0;for(const card of document.querySelectorAll('.specimen')){const shown=(!search || card.textContent.toLowerCase().includes(search))&&(selectedCategory==='all'||card.dataset.category===selectedCategory);card.hidden=!shown;if(shown)count++;}document.querySelector('#no-results').hidden=count>0;}
function buildCollection(){
  const collection=document.querySelector('#collection');
  for(const item of [...catalog].sort((a,b)=>['primitive','layout','device','card','popup'].indexOf(category(a.tag))-['primitive','layout','device','card','popup'].indexOf(category(b.tag)))){
    const card=document.createElement('article');card.className='specimen';card.id=item.tag;card.dataset.category=category(item.tag);
    const title=item.tag.replace('luma-','').split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join(' ');
    card.innerHTML=`<div class="specimen-head"><span class="tag-name">&lt;${item.tag}&gt;</span><h2>${title}</h2><p>${escape(item.description)}</p></div><div class="specimen-preview"></div><details class="example"><summary>Usage example</summary><button class="copy" type="button">Copy HTML</button><pre><code>${escape(snippet(item.tag))}</code></pre></details><details class="api"><summary>Properties & attributes <span class="muted">(${Object.keys(item.schema).length})</span></summary><div class="api-wrap"><table><thead><tr><th>Property / attribute</th><th>Type / default</th></tr></thead><tbody>${Object.entries(item.schema).map(([key,p])=>`<tr><td><code>${key}</code>${key!==attr(key)?`<div>${attr(key)}</div>`:''}<span class="api-description">${escape(p.description)}</span></td><td>${p.type}<br><code>${escape(JSON.stringify(p.default))}</code></td></tr>`).join('')}</tbody></table></div></details>`;
    const preview=document.createElement(item.tag);Object.assign(preview,examples[item.tag]);if(contents[item.tag])preview.innerHTML=contents[item.tag];card.querySelector('.specimen-preview').append(preview);
    card.querySelector('.copy').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(snippet(item.tag));e.target.textContent='Copied!';}catch{e.target.textContent='Select the code to copy';}});
    if(['luma-dialog','luma-confirm-dialog','luma-more-info'].includes(item.tag)){const button=document.createElement('luma-button');button.label='Open '+(item.tag==='luma-more-info'?'entity details':'popup');button.addEventListener('luma-action',event=>{event.stopPropagation();preview.open=true;});card.querySelector('.specimen-preview').append(button);if(item.tag==='luma-more-info'){const select=document.createElement('select');select.setAttribute('aria-label','Entity domain');select.style.cssText='max-width:200px;padding:10px;border-radius:8px;background:var(--luma-control-background);color:inherit;border:1px solid var(--luma-border)';for(const domain of Object.keys(detailDomains).sort()){const option=document.createElement('option');option.value=option.textContent=domain;select.append(option);}select.value='light';select.onchange=()=>{preview.entity=entityExample(select.value);};card.querySelector('.specimen-preview').prepend(select);}}
    collection.append(card);
  }
}
buildCollection();
for(const button of document.querySelectorAll('[data-category]')){if(button.tagName!=='BUTTON')continue;button.addEventListener('click',()=>{selectedCategory=button.dataset.category;document.querySelectorAll('.filters button').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});filter();});button.setAttribute('aria-pressed',String(button.classList.contains('selected')));}
document.querySelector('#search').addEventListener('input',filter);
function route(){const fragment=location.hash.slice(1)||'dashboard';const view=['dashboard','energy','components','usage'].includes(fragment)?fragment:'components';for(const section of document.querySelectorAll('.view'))section.hidden=section.id!==view+'-view';for(const link of document.querySelectorAll('nav a')){const current=link.dataset.view===view;link.classList.toggle('active',current);if(current)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');}document.querySelector('#breadcrumb').textContent={dashboard:'Overview',energy:'Energy demo',components:'Components',usage:'Getting started'}[view];if(fragment.startsWith('luma-'))document.getElementById(fragment)?.scrollIntoView();else window.scrollTo(0,0);}
window.addEventListener('hashchange',route);route();
function setTheme(theme){if(theme==='system')document.documentElement.removeAttribute('data-theme');else document.documentElement.dataset.theme=theme;try{localStorage.setItem('luma-theme',theme);}catch{}}
let theme='light';try{theme=localStorage.getItem('luma-theme') || 'light';}catch{}document.querySelector('#theme').value=theme;setTheme(theme);document.querySelector('#theme').addEventListener('change',e=>setTheme(e.target.value));
const events=[];
for(const type of ['luma-change','luma-action','luma-input','luma-error'])document.addEventListener(type,event=>{const source=event.composedPath().find(el=>el.localName?.startsWith('luma-'));const text=type+' · '+(source?.localName || 'component');if(document.querySelector('#last-event'))document.querySelector('#last-event').textContent=text;events.unshift({event:type,component:source?.localName,...event.detail});events.splice(8);if(document.querySelector('#events'))document.querySelector('#events').textContent=JSON.stringify(events,null,2);});
