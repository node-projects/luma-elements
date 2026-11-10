import {LumaElement,register,escape,accent,clamp} from './base.js';
import {common,entity,prop} from './metadata.js';
import {LumaEntity,LumaEntities,LumaStack} from './components.js';
import {type ChartSeries} from './charts.js';
import {icon} from './icons.js';

const safeUrl=(value:string):string=>{try{const u=new URL(value,document.baseURI);return ['http:','https:','blob:'].includes(u.protocol)?u.href:'';}catch{return '';}};
export class LumaSingleEntity extends LumaEntity {
  static schema={...entity,unit:prop('string','','Unit for the displayed entity state.')};declare unit:string;
  protected render():void {this.root.innerHTML=`<section class="card pad stack" part="card"><button class="entity-button" aria-label="${escape(this.label)}" ${this.disabled?'disabled':''}>${this.entityContent()}</button><div class="stat">${escape(this.state)}<span class="unit">${escape(this.unit)}</span></div></section>`;this.bindEntityAction('button');}
}
register('luma-entity',LumaSingleEntity,'Single entity state card with details action.');
export class LumaHorizontalStack extends LumaStack {static schema={...LumaStack.schema,direction:prop('string','horizontal','Horizontal layout direction.')};}
register('luma-horizontal-stack',LumaHorizontalStack,'Horizontal stack composed through the shared stack layout.');
export class LumaVerticalStack extends LumaStack {static schema={...LumaStack.schema,direction:prop('string','vertical','Vertical layout direction.')};}
register('luma-vertical-stack',LumaVerticalStack,'Vertical stack composed through the shared stack layout.');
export class LumaConditional extends LumaElement {
  static schema={visible:prop('boolean',true,'Whether the slotted content is visible. An application can derive this from any condition.')};declare visible:boolean;
  protected render():void {this.root.innerHTML=`<div part="content" ${this.visible?'':'hidden'}><slot></slot></div>`;}
}
register('luma-conditional',LumaConditional,'Conditional slotted card wrapper driven by a boolean property.');
export class LumaEntityFilter extends LumaEntities {
  static schema={...LumaEntities.schema,states:prop('array',['on','home','active'],'Show entities whose state is in this list. Empty means show all.')};declare states:string[];
  protected render():void {this.root.innerHTML='<luma-entities></luma-entities>';this.configure('luma-entities',{label:this.label,entities:this.entities.filter(e=>!this.states.length||this.states.includes(e.state)),disabled:this.disabled});this.on('luma-entities','luma-change',e=>{e.stopPropagation();const rows=(e as CustomEvent).detail.value;this.change('entities',this.entities.map(old=>rows.find((row:{entityId?:string;label:string})=>old.entityId?row.entityId===old.entityId:row.label===old.label)||old));});}
}
register('luma-entity-filter',LumaEntityFilter,'Entities card filtered by supplied entity states, preserving hidden rows when visible rows change.');
export class LumaArea extends LumaEntities {
  static schema={...LumaEntities.schema,temperature:prop('number',22,'Area temperature.'),humidity:prop('number',50,'Area humidity percentage.')};declare temperature:number;declare humidity:number;
  protected render():void {super.render();const badges=document.createElement('div');badges.className='row';badges.innerHTML=`<luma-badge icon="temperature" color="orange" state="${this.temperature} °C"></luma-badge><luma-badge icon="humidity" color="blue" state="${this.humidity} %"></luma-badge>`;this.root.querySelector('section')!.prepend(badges);}
}
register('luma-area',LumaArea,'Area summary composed from entity rows, header toggle, and temperature/humidity badges.');
export class LumaHomeSummary extends LumaArea {}
register('luma-home-summary',LumaHomeSummary,'Home-wide state summary using the same area/entity primitives.');

export class LumaBarChart extends LumaElement {
  static schema={...common,series:prop('array',[],'Series of {name,color?,data:number[]} for grouped bars.'),unit:prop('string','','Value unit.')};declare series:ChartSeries[];declare unit:string;
  protected render():void {const series=this.series.map(s=>({...s,data:s.data.map(p=>typeof p==='number'?p:p.y).filter(Number.isFinite)}));const count=Math.max(0,...series.map(s=>s.data.length));const max=Math.max(1,...series.flatMap(s=>s.data));const width=420/Math.max(1,count);this.root.innerHTML=count?`<svg viewBox="0 0 470 210" class="chart" role="img" aria-label="${escape(this.label||'Bar chart')}" part="chart"><line x1="35" y1="180" x2="460" y2="180" class="gridline"/>${series.map((s,j)=>s.data.map((value,i)=>`<rect tabindex="0" role="img" aria-label="${escape(`${s.name}: ${value} ${this.unit}`)}" x="${38+i*width+j*width/series.length}" y="${180-clamp(value/max,0,1)*160}" width="${Math.max(1,width/series.length-4)}" height="${clamp(value/max,0,1)*160}" rx="3" fill="${accent(s.color||['blue','orange','green'][j%3])}"><title>${escape(s.name)}: ${value}${escape(this.unit)}</title></rect>`).join('')).join('')}<text x="35" y="202">${escape(this.unit)}</text></svg>`:'<div class="empty">No chart data</div>';}
}
register('luma-bar-chart',LumaBarChart,'Standalone grouped SVG bar chart with keyboard-focusable value labels.');
export class LumaStatisticsGraph extends LumaElement {
  static schema={...common,series:prop('array',[],'Chart series using the line/bar-chart data format.'),unit:prop('string','','Value unit.'),chartType:prop('string','line','line or bar.')};declare series:ChartSeries[];declare unit:string;declare chartType:string;
  protected render():void {const tag=this.chartType==='bar'?'luma-bar-chart':'luma-line-chart';this.root.innerHTML=`<section class="card pad" part="card"><h2 class="title">${escape(this.label||'Statistics')}</h2><${tag}></${tag}></section>`;this.configure(tag,{label:this.label,series:this.series,unit:this.unit});}
}
register('luma-statistics-graph',LumaStatisticsGraph,'Statistics card composed from independently usable line or grouped-bar chart components.');
export class LumaStatistic extends LumaElement {
  static schema={...common,value:prop('number',0,'Precomputed statistic from your application.'),unit:prop('string','','Statistic unit.'),period:prop('string','Today','Description of the aggregation period.')};declare value:number;declare unit:string;declare period:string;
  protected render():void {this.root.innerHTML=`<section class="card pad stack" part="card"><div class="name">${escape(this.label||'Statistic')}</div><div class="stat">${escape(this.value)}<span class="unit">${escape(this.unit)}</span></div><span class="muted small">${escape(this.period)}</span></section>`;}
}
register('luma-statistic',LumaStatistic,'Statistic value and period card, independent of the backend that computed it.');
export interface DistributionItem {label:string;value:number;color?:string;}
export class LumaDistribution extends LumaElement {
  static schema={...common,items:prop('array',[],'Distribution segments as {label,value,color?}.'),unit:prop('string','kWh','Segment value unit.')};declare items:DistributionItem[];declare unit:string;
  protected render():void {const total=this.items.reduce((sum,i)=>sum+Math.max(0,i.value),0);this.root.innerHTML=`<section class="card pad stack" part="card"><h2 class="title">${escape(this.label||'Distribution')}</h2><div part="bar" style="display:flex;height:24px;border-radius:8px;overflow:hidden">${this.items.map((item,i)=>`<div title="${escape(item.label)}: ${item.value}${escape(this.unit)}" role="img" aria-label="${escape(item.label)}: ${item.value}${escape(this.unit)}" style="width:${total?Math.max(0,item.value)/total*100:0}%;background:${accent(item.color||['blue','orange','green','purple'][i%4])}"></div>`).join('')}</div>${this.items.map(item=>`<div class="row spread"><span>${escape(item.label)}</span><span>${escape(item.value)} ${escape(this.unit)}</span></div>`).join('')}</section>`;}
}
register('luma-distribution',LumaDistribution,'Distribution/energy-breakdown card with proportional segments and value labels.');
export class LumaClock extends LumaElement {
  static schema={...common,time:prop('string','','ISO date/time to display. Empty follows the local clock.'),locale:prop('string','en','Intl formatting locale.'),timeZone:prop('string','','IANA time zone; empty uses the browser zone.'),showSeconds:prop('boolean',false,'Display seconds.')};declare time:string;declare locale:string;declare timeZone:string;declare showSeconds:boolean;
  private ticker:ReturnType<typeof setInterval>|undefined;
  connectedCallback():void {super.connectedCallback();if(!this.ticker)this.ticker=setInterval(()=>{if(!this.time)this.requestUpdate();},1000);}
  disconnectedCallback():void {clearInterval(this.ticker);this.ticker=undefined;}
  protected render():void {const date=this.time?new Date(this.time):new Date();let time='Invalid date',day='';try{time=date.toLocaleTimeString(this.locale,{hour:'2-digit',minute:'2-digit',...(this.showSeconds?{second:'2-digit'}:{}),...(this.timeZone?{timeZone:this.timeZone}:{})});day=date.toLocaleDateString(this.locale,{weekday:'long',month:'long',day:'numeric',...(this.timeZone?{timeZone:this.timeZone}:{})});}catch{}this.root.innerHTML=`<section class="card pad center stack" part="card">${this.label?`<span>${escape(this.label)}</span>`:''}<time class="stat">${escape(time)}</time><span class="muted">${escape(day)}</span></section>`;}
}
register('luma-clock',LumaClock,'Local or supplied-time clock card with locale/time-zone formatting and timer cleanup.');
export class LumaDate extends LumaClock {protected render():void {super.render();const time=this.root.querySelector('time')!;time.textContent=this.time?new Date(this.time).toLocaleDateString(this.locale):new Date().toLocaleDateString(this.locale);}}
register('luma-date',LumaDate,'Date card using the shared locale-aware clock foundation.');

export interface TodoItem {id:string;summary:string;completed:boolean;}
export class LumaTodo extends LumaElement {
  static schema={...common,items:prop('array',[],'Items as {id,summary,completed}. Every change returns a new full array.'),newItem:prop('string','','Draft item text.')};declare items:TodoItem[];declare newItem:string;
  protected render():void {this.root.innerHTML=`<section class="card pad stack" part="card"><h2 class="title">${escape(this.label||'To do')}</h2>${this.items.map((_item,i)=>`<div class="row"><luma-checkbox data-index="${i}" class="grow"></luma-checkbox><luma-icon-button data-remove="${i}"></luma-icon-button></div>`).join('')}<luma-text-field></luma-text-field><luma-button></luma-button></section>`;this.items.forEach((_item,i)=>{const item=_item;this.configure(`[data-index="${i}"]`,{label:item.summary,checked:item.completed,disabled:this.disabled});this.on(`[data-index="${i}"]`,'luma-change',event=>{event.stopPropagation();this.change('items',this.items.map((row,j)=>j===i?{...row,completed:(event as CustomEvent).detail.value}:row));});this.configure(`[data-remove="${i}"]`,{label:'Remove '+item.summary,icon:'minus',disabled:this.disabled});this.on(`[data-remove="${i}"]`,'luma-action',event=>{event.stopPropagation();this.change('items',this.items.filter((_,j)=>j!==i));});});this.configure('luma-text-field',{label:'New item',value:this.newItem,disabled:this.disabled});this.on('luma-text-field','luma-input',event=>{event.stopPropagation();this.preview('newItem',(event as CustomEvent).detail.value);});this.on('luma-text-field','luma-change',event=>{event.stopPropagation();this.preview('newItem',(event as CustomEvent).detail.value);});this.configure('luma-button',{label:'Add item',icon:'plus',disabled:this.disabled});this.on('luma-button','luma-action',event=>{event.stopPropagation();if(!this.newItem.trim())return;this.change('items',[...this.items,{id:crypto.randomUUID(),summary:this.newItem.trim(),completed:false}]);this.setValue('newItem','');});}
}
register('luma-todo',LumaTodo,'To-do/shopping list composed from checkboxes, text field, and add/remove buttons.');
export interface CalendarEvent {id:string;summary:string;start:string;end?:string;description?:string;}
export class LumaCalendar extends LumaElement {
  static schema={...common,events:prop('array',[],'Calendar events as {id,summary,start,end?,description?}; timestamps use ISO strings.'),date:prop('string','2026-11-10','Currently selected calendar day, YYYY-MM-DD.')};declare events:CalendarEvent[];declare date:string;
  protected render():void {
    const parsed=new Date(this.date+'T12:00:00');const date=Number.isFinite(parsed.getTime())?parsed:new Date();const y=date.getFullYear(),m=date.getMonth();const days=new Date(y,m+1,0).getDate();const offset=(new Date(y,m,1).getDay()+6)%7;
    this.root.innerHTML=`<section class="card pad stack" part="card"><div class="row spread"><button class="flat" id="previous" aria-label="Previous month" ${this.disabled?'disabled':''}>‹</button><h2 class="name">${escape(this.label||date.toLocaleDateString('en',{month:'long',year:'numeric'}))}</h2><button class="flat" id="next" aria-label="Next month" ${this.disabled?'disabled':''}>›</button></div><div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:2px">${['M','T','W','T','F','S','S'].map(day=>`<span class="center small muted">${day}</span>`).join('')}${'<span></span>'.repeat(offset)}${Array.from({length:days},(_,i)=>`<button class="flat ${date.getDate()===i+1?'active':''}" data-day="${i+1}" aria-label="${y}-${String(m+1).padStart(2,'0')}-${String(i+1).padStart(2,'0')}" aria-pressed="${date.getDate()===i+1}" style="min-width:0;min-height:32px;padding:4px" ${this.disabled?'disabled':''}>${i+1}</button>`).join('')}</div><div class="stack">${this.events.filter(e=>e.start.startsWith(this.date)).map(e=>`<button class="entity-button" data-event="${escape(e.id)}" ${this.disabled?'disabled':''}><span class="name">${escape(e.summary)}</span><span class="small muted">${escape(e.start.slice(11,16)||'All day')}</span></button>`).join('')||'<span class="muted small">No events for this day</span>'}</div></section>`;
    for(const [id,delta] of [['previous',-1],['next',1]] as const)this.on('#'+id,'click',()=>{const d=new Date(y,m+delta,1,12);this.change('date',`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-01`);});
    for(const b of this.root.querySelectorAll<HTMLButtonElement>('[data-day]'))b.onclick=()=>this.change('date',`${y}-${String(m+1).padStart(2,'0')}-${b.dataset.day!.padStart(2,'0')}`);
    for(const b of this.root.querySelectorAll<HTMLButtonElement>('[data-event]'))b.onclick=()=>this.emit('luma-action',{action:'event-details',event:this.events.find(e=>e.id===b.dataset.event)});
  }
}
register('luma-calendar',LumaCalendar,'Month calendar with mouse/keyboard day selection, month navigation, and supplied event lists.');
export class LumaActivity extends LumaElement {
  static schema={...common,entries:prop('array',[],'Timeline entries as {label,state,time,entityId?}.')};declare entries:Array<{label:string;state:string;time:string;entityId?:string}>;
  protected render():void {this.root.innerHTML=`<section class="card pad stack" part="card"><h2 class="title">${escape(this.label||'Activity')}</h2>${this.entries.map(entry=>`<div class="row"><span style="color:var(--luma-primary,#03a9f4)">${icon('check')}</span><div class="grow"><div>${escape(entry.label)} ${escape(entry.state)}</div><time class="small muted">${escape(entry.time)}</time></div></div>`).join('')||'<div class="empty">No activity</div>'}</section>`;}
}
register('luma-activity',LumaActivity,'Activity/logbook timeline driven entirely by supplied entries.');
export class LumaAlert extends LumaElement {
  static schema={...common,message:prop('string','','Alert text.'),severity:prop('string','info','info, warning, error, or success.'),dismissible:prop('boolean',true,'Show a dismiss button.'),dismissed:prop('boolean',false,'Whether the alert has been dismissed.')};declare message:string;declare severity:string;declare dismissible:boolean;declare dismissed:boolean;
  protected render():void {this.root.innerHTML=this.dismissed?'':`<section class="card pad row" part="card" style="border-left:4px solid ${accent(this.severity==='error'?'red':this.severity==='warning'?'amber':this.severity==='success'?'green':'blue')}"><div class="grow"><div class="name">${escape(this.label||this.severity)}</div><p>${escape(this.message)}</p></div>${this.dismissible?'<luma-icon-button></luma-icon-button>':''}</section>`;this.configure('luma-icon-button',{label:'Dismiss alert',icon:'minus',disabled:this.disabled});this.on('luma-icon-button','luma-action',event=>{event.stopPropagation();this.change('dismissed',true);});}
}
register('luma-alert',LumaAlert,'Dismissible info/warning/error/success message card.');

export class LumaCamera extends LumaElement {
  static schema={...common,src:prop('string','','Snapshot or video URL. HTTP(S), blob, and relative URLs are accepted.'),live:prop('boolean',false,'Render a native video element for browser-supported stream formats instead of a snapshot.'),alt:prop('string','Camera snapshot','Snapshot alternative text.'),muted:prop('boolean',true,'Start native video muted.')};declare src:string;declare live:boolean;declare alt:string;declare muted:boolean;
  protected render():void {const src=safeUrl(this.src);this.root.innerHTML=`<section class="card" part="card">${src?this.live?`<video part="video" controls playsinline ${this.muted?'muted':''} src="${escape(src)}" aria-label="${escape(this.label||'Camera')}" style="width:100%;display:block"></video>`:`<img part="image" src="${escape(src)}" alt="${escape(this.alt)}" style="width:100%;display:block">`:'<div class="empty">No camera source</div>'}<div class="pad name">${escape(this.label||'Camera')}</div></section>`;}
}
register('luma-camera',LumaCamera,'Camera snapshot or native-video card. Supply a browser-playable URL; backend WebRTC/HLS negotiation is handled by your application.');
export class LumaWebpage extends LumaElement {
  static schema={...common,src:prop('string','','HTTP(S) or relative page URL. Empty renders an empty state.'),height:prop('number',320,'Frame height in pixels.')};declare src:string;declare height:number;
  protected render():void {const src=safeUrl(this.src);this.root.innerHTML=`<section class="card" part="card">${this.label?`<h2 class="title pad">${escape(this.label)}</h2>`:''}${src?`<iframe title="${escape(this.label||'Embedded page')}" src="${escape(src)}" sandbox="allow-scripts allow-forms" referrerpolicy="no-referrer" loading="lazy" style="border:0;width:100%;height:${Math.max(80,this.height)}px"></iframe>`:'<div class="empty">No page source</div>'}</section>`;}
}
register('luma-webpage',LumaWebpage,'Sandboxed embedded webpage card. No page is fetched without a source.');
export class LumaMarkdown extends LumaElement {
  static schema={...common,content:prop('string','','Safe Markdown subset: headings, bold, italic, inline code, and line breaks. Raw HTML is escaped.')};declare content:string;
  protected render():void {const markup=escape(this.content).split('\n').map(line=>line.replace(/^(#{1,6}) (.*)$/,(_all,hashes,text)=>`<h${hashes.length}>${text}</h${hashes.length}>`).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>')).join('<br>');this.root.innerHTML=`<section class="card pad" part="card">${this.label?`<h2 class="title">${escape(this.label)}</h2>`:''}<div part="content" style="line-height:1.8">${markup}</div></section>`;}
}
register('luma-markdown',LumaMarkdown,'Safe, dependency-free Markdown-subset card; raw HTML is always escaped.');
export class LumaPictureEntity extends LumaEntity {
  static schema={...entity,src:prop('string','','Room/snapshot image URL.'),alt:prop('string','','Image description.')};declare src:string;declare alt:string;
  protected render():void {this.root.innerHTML=`<section class="card" part="card">${this.src?`<img src="${escape(safeUrl(this.src))}" alt="${escape(this.alt)}" style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover">`:''}<button class="entity-button pad" style="padding:16px" ${this.disabled?'disabled':''}>${this.entityContent()}</button><slot></slot></section>`;this.bindEntityAction('button');}
}
register('luma-picture-entity',LumaPictureEntity,'Picture card with a state-bearing entity footer and details action.');
export class LumaPictureGlance extends LumaPictureEntity {
  static schema={...LumaPictureEntity.schema,entities:prop('array',[],'Glance entities as {label,state,icon?,entityId?}.')};declare entities:unknown[];
  protected render():void {super.render();const glance=document.createElement('luma-glance');Object.assign(glance,{entities:this.entities,disabled:this.disabled});this.root.querySelector('section')!.append(glance);}
}
register('luma-picture-glance',LumaPictureGlance,'Room picture composed with independent entity glance controls.');
export class LumaPictureElements extends LumaElement {
  static schema={...common,src:prop('string','','Floorplan/background image URL.'),elements:prop('array',[],'Positioned entities as {x,y,label,state,icon?,entityId?,domain?}; x/y are percentages.')};declare src:string;declare elements:Array<{x:number;y:number;label:string;state:string;icon?:string;entityId?:string;domain?:string}>;
  protected render():void {this.root.innerHTML=`<section class="card" part="card" style="position:relative;min-height:240px">${this.src?`<img src="${escape(safeUrl(this.src))}" alt="${escape(this.label||'Floorplan')}" style="display:block;width:100%">`:''}${this.elements.map((_,i)=>`<luma-badge data-index="${i}" style="position:absolute"></luma-badge>`).join('')}</section>`;this.elements.forEach((item,i)=>{this.configure(`[data-index="${i}"]`,{...item,disabled:this.disabled});const badge=this.root.querySelector<HTMLElement>(`[data-index="${i}"]`)!;badge.style.left=clamp(item.x,0,100)+'%';badge.style.top=clamp(item.y,0,100)+'%';badge.style.transform='translate(-50%,-50%)';});}
}
register('luma-picture-elements',LumaPictureElements,'Floorplan/background with independently interactive entity badges at percentage coordinates.');
export class LumaPlant extends LumaEntity {
  static schema={...entity,moisture:prop('number',45,'Soil moisture percentage.'),temperature:prop('number',22,'Plant temperature in °C.'),illuminance:prop('number',1200,'Illuminance in lx.'),conductivity:prop('number',500,'Soil conductivity in µS/cm.')};declare moisture:number;declare temperature:number;declare illuminance:number;declare conductivity:number;
  protected render():void {this.root.innerHTML='<section class="card pad stack" part="card"><luma-entity-row></luma-entity-row><luma-attributes></luma-attributes></section>';this.configure('luma-entity-row',this.entityProperties());this.configure('luma-attributes',{data:{Moisture:this.moisture+'%',Temperature:this.temperature+' °C',Illuminance:this.illuminance+' lx',Conductivity:this.conductivity+' µS/cm'}});}
}
register('luma-plant',LumaPlant,'Plant status composed from entity row and independently reusable attribute table.');
export interface FormField {name:string;label:string;type?:string;required?:boolean;options?:string[];}
export class LumaForm extends LumaElement {
  static schema={...common,fields:prop('array',[],'Form fields as {name,label,type?,required?,options?}. Types use native text/date/time inputs.'),data:prop('object',{},'Field values keyed by field name.')};declare fields:FormField[];declare data:Record<string,unknown>;
  protected render():void {this.root.innerHTML=`<section class="card pad stack" part="card">${this.label?`<h2 class="title">${escape(this.label)}</h2>`:''}${this.fields.map((f,i)=>`<${f.options?'luma-select':'luma-text-field'} data-field="${i}"></${f.options?'luma-select':'luma-text-field'}>`).join('')}<luma-button></luma-button></section>`;this.fields.forEach((field,i)=>{this.configure(`[data-field="${i}"]`,{label:field.label,type:field.type||'text',value:this.data[field.name]??'',required:field.required,options:field.options||[],disabled:this.disabled});this.on(`[data-field="${i}"]`,'luma-change',event=>{event.stopPropagation();this.change('data',{...this.data,[field.name]:(event as CustomEvent).detail.value});});});this.configure('luma-button',{label:'Submit',disabled:this.disabled});this.on('luma-button','luma-action',event=>{event.stopPropagation();if(this.fields.some(field=>field.required&&!String(this.data[field.name]??'').trim()))return;this.emit('luma-submit',{data:{...this.data}});});}
}
register('luma-form',LumaForm,'Reusable configurator/form composed from validated fields, selects, and a submit button.');
export class LumaConversation extends LumaElement {
  static schema={...common,messages:prop('array',[],'Messages as {role,content}. Content is always escaped.'),draft:prop('string','','Draft message. Sending emits an action; no external service is contacted.')};declare messages:Array<{role:string;content:string}>;declare draft:string;
  protected render():void {this.root.innerHTML=`<section class="card pad stack" part="card"><h2 class="title">${escape(this.label||'Conversation')}</h2><div role="log" aria-live="polite" class="stack">${this.messages.map(message=>`<div style="padding:12px;border-radius:12px;background:var(--luma-control-background,#eee)"><strong class="small">${escape(message.role)}</strong><p>${escape(message.content)}</p></div>`).join('')}</div><luma-text-field></luma-text-field><luma-button></luma-button></section>`;this.configure('luma-text-field',{label:'Message',value:this.draft,disabled:this.disabled});for(const type of ['luma-input','luma-change'])this.on('luma-text-field',type,event=>{event.stopPropagation();this.preview('draft',(event as CustomEvent).detail.value);});this.configure('luma-button',{label:'Send',disabled:this.disabled});this.on('luma-button','luma-action',event=>{event.stopPropagation();if(!this.draft.trim())return;const text=this.draft.trim();this.change('messages',[...this.messages,{role:'user',content:text}]);this.setValue('draft','');this.emit('luma-action',{action:'send',text});});}
}
register('luma-conversation',LumaConversation,'Conversation UI with escaped messages, draft input, and a send event for your own assistant adapter.');
export class LumaShortcut extends LumaEntity {static schema={...entity};protected render():void {this.root.innerHTML=`<button class="card pad row" part="card" aria-label="${escape(this.label)}" ${this.disabled?'disabled':''}>${this.entityContent()}</button>`;this.on('button','click',()=>this.action('navigate'));}}
register('luma-shortcut',LumaShortcut,'Shortcut card that emits a navigate action for the application router.');
