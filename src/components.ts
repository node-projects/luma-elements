import { LumaElement, register, escape, active, accent, clamp } from './base.js';
import { common, entity, cardHeader, prop, type Schema } from './metadata.js';
import { icon } from './icons.js';
import './primitives.js';
import './controls.js';
import './features.js';
import type {FeatureDefinition} from './features.js';
import {lightControlSchema} from './light-controls.js';

export interface EntityData { label:string; state:string; icon?:string; secondary?:string; entityId?:string; color?:string; toggle?:boolean; disabled?:boolean; }
export class LumaEntity extends LumaElement {
  static schema=entity;
  declare icon:string;declare state:string;declare secondary:string;declare entityId:string;declare color:string;
  declare domain:string;declare detailProperties:Record<string,unknown>;declare entityAttributes:Record<string,unknown>;
  declare tapAction:string;declare iconTapAction:string;declare holdAction:string;declare doubleTapAction:string;
  protected bindEntityAction(selector:string,isIcon=false):void {
    const target=this.root.querySelector<HTMLElement>(selector);if(!target)return;
    let hold:ReturnType<typeof setTimeout>|undefined;let click:ReturnType<typeof setTimeout>|undefined;let held=false;
    const run=(action:string)=>{if(this.disabled)return;if(action==='auto')action=!this.interactionDisabled&&(this.getValue('toggle')||['light','switch','input_boolean','fan','automation','siren'].includes(this.domain||this.entityId.split('.')[0]))?'toggle':'more-info';if(action==='toggle')this.change('state',active(this.state)?'off':'on');else this.action(action);};
    target.addEventListener('pointerdown',event=>{if(event.button!==0)return;held=false;if(this.holdAction!=='none')hold=setTimeout(()=>{held=true;run(this.holdAction);},500);});
    for(const type of ['pointerup','pointerleave','pointercancel'])target.addEventListener(type,()=>clearTimeout(hold));
    target.addEventListener('contextmenu',event=>{if(this.holdAction!=='none')event.preventDefault();});
    target.addEventListener('click',()=>{if(held){held=false;return;}const action=isIcon?this.iconTapAction:this.tapAction;if(this.doubleTapAction==='none')run(action);else{clearTimeout(click);click=setTimeout(()=>run(action),250);}});
    target.addEventListener('dblclick',()=>{if(this.doubleTapAction!=='none'){clearTimeout(click);run(this.doubleTapAction);}});
  }
  protected entityContent():string {
    return `<span part="icon" class="icon-circle ${active(this.state)?'active':''}" style="--accent:${accent(this.color)}"><slot name="icon">${icon(this.icon)}</slot></span><span class="grow"><span class="name truncate" style="display:block" part="name">${escape(this.label)}</span><span class="state muted" part="state">${escape(this.secondary || this.state)}</span></span>`;
  }
  protected entityProperties():Record<string,unknown> { return {label:this.label,icon:this.icon,state:this.state,secondary:this.secondary,entityId:this.entityId,color:this.color,disabled:this.disabled,domain:this.domain,entityAttributes:this.entityAttributes,detailProperties:{...this.configuration,...this.detailProperties}}; }
  protected bindChildChange(selector:string, property:string, target=property):void {
    this.on(selector,'luma-change',e=>{const detail=(e as CustomEvent).detail;if(detail.property!==property)return;e.stopPropagation();this.change(target,detail.value);});
    this.on(selector,'luma-input',e=>{const detail=(e as CustomEvent).detail;if(detail.property!==property)return;e.stopPropagation();this.emit('luma-input',{property:target,value:detail.value,entityId:this.entityId});});
  }
}
export class LumaBadge extends LumaEntity {
  static schema={...entity};
  protected render():void {
    this.root.innerHTML=`<button part="badge" class="card row" style="border-radius:24px;padding:8px 12px;gap:8px;min-height:36px;font-size:12px" ${this.disabled?'disabled':''} aria-label="${escape(`${this.label}: ${this.secondary || this.state}`)}"><span style="color:${accent(this.color)};display:flex">${icon(this.icon)}</span>${escape(this.label)} ${escape(this.secondary || this.state)}</button>`;
    this.bindEntityAction('button');
  }
}
register('luma-badge',LumaBadge,'A compact state badge, matching the pills above a Lovelace dashboard.');

export class LumaCard extends LumaElement {
  static schema={...common};
  protected render():void { this.root.innerHTML=`<section class="card pad" part="card">${this.label?`<h2 class="title" part="title">${escape(this.label)}</h2>`:''}<slot></slot><slot name="footer"></slot></section>`; }
}
register('luma-card',LumaCard,'A rounded card shell with title, default content slot, and footer slot.');

export class LumaHeading extends LumaElement {
  static schema={...common,icon:prop('string','','Optional heading icon.'),level:prop('number',2,'Semantic heading level from 1 to 6.')};
  declare icon:string;declare level:number;
  protected render():void { const level=Math.round(clamp(this.level,1,6));this.root.innerHTML=`<div class="row spread" part="heading"><h${level} class="row" style="font-size:16px;font-weight:500;margin:12px 4px;gap:10px">${this.icon?icon(this.icon):''}${escape(this.label)}</h${level}><slot></slot></div>`; }
}
register('luma-heading',LumaHeading,'A section heading with an optional icon and a slot for sensor badges.');

export class LumaTile extends LumaEntity {
  static schema={...entity,toggle:prop('boolean',false,'Make the icon toggle on/off instead of opening entity details.'),feature:prop('string','','Optional embedded control: brightness, temperature, or cover.'),value:prop('number',0,'Value of the embedded brightness (%) or temperature (°C) control.'),features:prop('array',[],'Additional standalone feature controls as {type,label?,config?}; all public feature kinds are supported by luma-feature.')};
  declare toggle:boolean;declare feature:string;declare value:number;declare features:FeatureDefinition[];
  protected render():void {
    const iconToggle=!this.interactionDisabled&&(this.iconTapAction==='toggle'||this.iconTapAction==='auto'&&(this.toggle||['light','switch','input_boolean','fan','automation','siren'].includes(this.domain||this.entityId.split('.')[0])));
    this.root.innerHTML=`<article class="card tile" part="card"><div class="row" style="gap:10px"><button class="flat" style="padding:0;min-width:36px;min-height:36px" aria-label="${escape(iconToggle?'Toggle '+this.label:'More information about '+this.label)}" ${this.disabled?'disabled':''}><span class="icon-circle ${active(this.state)?'active':''}" style="--accent:${accent(this.color)}"><slot name="icon">${icon(this.icon)}</slot></span></button><button class="entity-button grow" part="content" aria-label="${escape(this.label)}" ${this.disabled?'disabled':''}><span class="grow"><span part="name" class="name truncate" style="display:block">${escape(this.label)}</span><span part="state" class="state">${escape(this.secondary || (this.feature==='brightness'&&active(this.state)?this.value+' %':this.state))}</span></span></button></div>${this.feature==='brightness'?`<div class="controls" style="--accent:${accent(this.color)};padding:0"><luma-slider class="grow"></luma-slider></div>`:this.feature==='temperature'?'<luma-number style="margin-top:10px"></luma-number>':this.feature==='cover'?'<div class="controls" style="margin-top:10px"><luma-button id="open"></luma-button><luma-button id="stop"></luma-button><luma-button id="close"></luma-button></div>':''}${this.features.map((_,i)=>`<luma-feature data-feature="${i}" style="margin-top:10px"></luma-feature>`).join('')}<slot name="features"></slot></article>`;
    this.features.forEach((feature,index)=>{this.configure(`[data-feature="${index}"]`,{...feature,entityId:this.entityId,disabled:this.interactionDisabled});this.on(`[data-feature="${index}"]`,'luma-change',event=>{event.stopPropagation();this.change('features',this.features.map((old,i)=>i===index?{...old,config:(event as CustomEvent).detail.value}:old));});});
    this.bindEntityAction('.flat',true);
    this.bindEntityAction('.entity-button');
    this.configure('luma-slider',{label:`${this.label} brightness`,value:this.value,hideLabel:true,disabled:this.interactionDisabled});
    this.configure('luma-number',{label:'',value:this.value,min:5,max:35,step:.5,unit:' °C',disabled:this.interactionDisabled});
    this.bindChildChange('luma-slider','value');this.bindChildChange('luma-number','value');
    for(const [id,name] of [['open','up'],['stop','stop'],['close','down']]){this.configure(`#${id}`,{label:id,icon:name,variant:'text',disabled:this.interactionDisabled});this.on(`#${id}`,'luma-action',e=>{e.stopPropagation();this.action(id);});}
  }
}
register('luma-tile',LumaTile,'A Home Assistant-style tile composed with optional brightness, target-temperature, and cover controls.');

export class LumaEntityRow extends LumaEntity {
  static schema={...entity,toggle:prop('boolean',false,'Show an on/off switch instead of a plain state value.')};
  declare toggle:boolean;
  protected render():void {
    this.root.innerHTML=`<div class="row entity-row" part="row"><button class="entity-button grow" ${this.disabled?'disabled':''} aria-label="${escape(this.label)}">${this.entityContent()}</button>${this.toggle?'<luma-switch></luma-switch>':''}<slot name="control"></slot></div>`;
    this.bindEntityAction('button');
    this.configure('luma-switch',{label:`Toggle ${this.label}`,checked:active(this.state),disabled:this.interactionDisabled});
    this.on('luma-switch','luma-change',e=>{e.stopPropagation();this.change('state',(e as CustomEvent).detail.value?'on':'off');});
  }
}
register('luma-entity-row',LumaEntityRow,'A reusable entity row with icon, state, and optional switch.');

export class LumaEntities extends LumaElement {
  static schema:Schema={...common,entities:prop('array',[],'Array of {label, state, icon?, secondary?, entityId?, color?, toggle?, disabled?} entity rows.'),showHeaderToggle:prop('boolean',false,'Show a header switch that toggles all rows marked toggle.')};
  declare entities:EntityData[];declare showHeaderToggle:boolean;
  protected render():void {
    this.root.innerHTML=`<section class="card pad" part="card"><div class="row spread">${this.label?`<h2 class="title">${escape(this.label)}</h2>`:''}${this.showHeaderToggle?'<luma-switch id="all"></luma-switch>':''}</div><div class="stack" style="gap:0">${this.entities.map((_,i)=>`<luma-entity-row data-index="${i}"></luma-entity-row>`).join('')}</div><slot></slot></section>`;
    this.entities.forEach((data,i)=>{this.configure(`[data-index="${i}"]`,{...data,disabled:this.interactionDisabled || data.disabled});this.on(`[data-index="${i}"]`,'luma-change',e=>{e.stopPropagation();const {property,value}=(e as CustomEvent).detail;const entities=this.entities.map((row,index)=>index===i?{...row,[property]:value}:row);this.change('entities',entities);});});
    this.configure('#all',{label:`Toggle all ${this.label}`,disabled:this.interactionDisabled,checked:this.entities.some(e=>e.toggle&&active(e.state))});
    this.on('#all','luma-change',e=>{e.stopPropagation();const on=(e as CustomEvent).detail.value;this.change('entities',this.entities.map(row=>row.toggle?{...row,state:on?'on':'off'}:row));});
  }
}
register('luma-entities',LumaEntities,'An entities card composed from entity rows, with an optional group toggle.');

export class LumaGlanceItem extends LumaEntity {
  static schema={...entity};
  protected render():void {this.root.innerHTML=`<button class="stack center" part="button" style="width:100%;align-items:center;padding:8px;background:none;color:inherit" ${this.disabled?'disabled':''}><span>${escape(this.label)}</span><span style="color:${active(this.state)?accent(this.color):'var(--luma-secondary-text,#727272)'}">${icon(this.icon)}</span><span class="small">${escape(this.secondary||this.state)}</span></button>`;this.bindEntityAction('button');}
}
register('luma-glance-item',LumaGlanceItem,'Standalone compact entity summary with a real entity-details action, reusable outside glance cards.');
export class LumaGlance extends LumaEntities {
  static schema={...common,entities:prop('array',[],'Entity summaries: {label,state,icon?,entityId?,domain?,detailProperties?}.')};
  protected render():void {
    this.root.innerHTML=`<section class="card pad" part="card">${this.label?`<h2 class="title">${escape(this.label)}</h2>`:''}<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr));gap:12px">${this.entities.map((_,i)=>`<luma-glance-item data-index="${i}"></luma-glance-item>`).join('')}</div></section>`;
    this.entities.forEach((data,index)=>{this.configure(`[data-index="${index}"]`,{...data,disabled:this.interactionDisabled||data.disabled});this.on(`[data-index="${index}"]`,'luma-change',event=>{event.stopPropagation();const {property,value}=(event as CustomEvent).detail;this.change('entities',this.entities.map((old,i)=>i===index?{...old,[property]:value}:old));});});
  }
}
register('luma-glance',LumaGlance,'A compact row of entity names, icons, and states.');

export class LumaGrid extends LumaElement {
  static schema={columns:prop('number',2,'Number of equal grid columns, from 1 to 12. Set min-width to enable an auto-fitting responsive grid.'),gap:prop('number',8,'Space between cells in pixels.'),minWidth:prop('number',0,'Minimum cell width in pixels; a positive value automatically fits columns to available space.')};
  declare columns:number;declare gap:number;declare minWidth:number;
  protected render():void {this.root.innerHTML=`<div part="grid" style="display:grid;grid-template-columns:${this.minWidth>0?`repeat(auto-fit,minmax(min(100%,${this.minWidth}px),1fr))`:`repeat(${Math.round(clamp(this.columns,1,12))},minmax(0,1fr))`};gap:${Math.max(0,this.gap)}px"><slot style="display:contents"></slot></div>`;}
}
register('luma-grid',LumaGrid,'A slotted grid for composing tiles and cards with fixed or responsive columns.');
export class LumaStack extends LumaElement {
  static schema={direction:prop('string','vertical','Stack direction: vertical or horizontal.'),gap:prop('number',8,'Space between children in pixels.')};
  declare direction:string;declare gap:number;
  protected render():void {this.root.innerHTML=`<div part="stack" style="display:flex;flex-direction:${this.direction==='horizontal'?'row':'column'};gap:${Math.max(0,this.gap)}px"><slot style="display:contents"></slot></div>`;}
}
register('luma-stack',LumaStack,'A vertical or horizontal stack for composing dashboards.');

export class LumaThermostat extends LumaEntity {
  static schema={...entity,...cardHeader,domain:prop('string','climate','Climate domain.'),icon:prop('string','temperature','Thermostat icon.'),state:prop('string','heating','Current HVAC state, such as heating, cooling, idle, or off.'),temperature:prop('number',21,'Target temperature changed by the increment/decrement control.'),currentTemperature:prop('number',20.5,'Measured room temperature.'),min:prop('number',7,'Minimum target temperature.'),max:prop('number',35,'Maximum target temperature.'),step:prop('number',.5,'Target temperature increment.'),unit:prop('string','°C','Temperature unit.'),mode:prop('string','heat','Selected HVAC mode.'),modes:prop('array',['off','heat','cool','auto'],'Available HVAC mode names.'),range:prop('boolean',false,'Enable lower/upper set points for heat/cool mode.'),highTemperature:prop('number',24,'Upper temperature set point.'),showCurrentTemperature:prop('boolean',true,'Display actual measured temperature above the dial.'),showCurrentMarker:prop('boolean',true,'Display the measured-temperature marker on the dial.'),showCurrentAsPrimary:prop('boolean',false,'Use the measured temperature as the primary dial reading and show the target below it.'),precision:prop('number',1,'Fixed decimal places; keeps the readout stable at whole and fractional temperatures.'),locale:prop('string','en','Formatting locale, e.g. de uses a comma.'),stateLabel:prop('string','','Human-readable HVAC activity label; empty uses state.'),currentTemperatureLabel:prop('string','Current temperature','Label above the measured-temperature reading.'),modeLabel:prop('string','HVAC mode','Accessible and visible mode-selector label.'),presetLabel:prop('string','Preset','Accessible and visible preset-selector label.'),controlStyle:prop('string','round','Temperature buttons: round, matching the thermostat dial, or bar.'),presets:prop('array',[],'Available climate presets; empty hides the selector.'),preset:prop('string','','Selected climate preset.'),fanModes:prop('array',[],'Available fan modes.'),fanMode:prop('string','','Selected fan mode.'),swingModes:prop('array',[],'Available swing modes.'),swingMode:prop('string','','Selected swing mode.')};
  declare temperature:number;declare currentTemperature:number;declare min:number;declare max:number;declare step:number;declare unit:string;declare mode:string;declare modes:Array<string|{value:string;label:string;icon?:string}>;declare range:boolean;declare highTemperature:number;declare presets:Array<string|{value:string;label:string;icon?:string}>;declare preset:string;declare fanModes:string[];declare fanMode:string;declare swingModes:string[];declare swingMode:string;declare showCurrentTemperature:boolean;declare showCurrentMarker:boolean;declare showCurrentAsPrimary:boolean;declare precision:number;declare locale:string;declare stateLabel:string;declare currentTemperatureLabel:string;declare modeLabel:string;declare presetLabel:string;declare controlStyle:string;
  declare showHeader:boolean;
  protected render():void {
    this.root.innerHTML=`<section class="card pad stack" part="card"><div class="row spread" ${this.showHeader?'':'hidden'}><button class="entity-button" id="details" aria-label="${escape(this.label || 'Thermostat')}" ${this.disabled?'disabled':''}><h2 class="title" style="margin:0">${escape(this.label || 'Thermostat')}</h2></button><span style="color:${this.state==='heating'?'#ff9800':'var(--luma-primary,#03a9f4)'}">${icon('temperature')}</span></div><luma-dial></luma-dial><luma-number></luma-number>${this.range?'<luma-number id="high"></luma-number>':''}<div class="mode-options" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr));gap:12px"><luma-dropdown></luma-dropdown>${this.presets.length?'<luma-dropdown id="preset"></luma-dropdown>':''}${this.fanModes.length?'<luma-dropdown id="fan-mode"></luma-dropdown>':''}${this.swingModes.length?'<luma-dropdown id="swing-mode"></luma-dropdown>':''}</div></section>`;
    this.bindEntityAction('#details');
    this.configure('luma-dial',{label:'Target temperature',value:this.temperature,min:this.min,max:this.max,step:this.step,unit:this.unit,range:this.range,highValue:this.highTemperature,color:this.state==='heating'?'var(--luma-climate-heating-color,#ff6d20)':'var(--luma-climate-cooling-color,#03a9f4)',secondary:this.stateLabel||this.state,currentValue:this.currentTemperature,currentLabel:this.currentTemperatureLabel,showCurrent:this.showCurrentTemperature,showCurrentMarker:this.showCurrentMarker,showCurrentAsPrimary:this.showCurrentAsPrimary,precision:this.precision,locale:this.locale,disabled:this.interactionDisabled});
    this.bindChildChange('luma-dial','value','temperature');
    this.configure('luma-number',{label:'Target',variant:this.range?'bar':this.controlStyle,value:this.temperature,min:this.min,max:this.range?this.highTemperature:this.max,step:this.step,unit:this.unit,disabled:this.interactionDisabled});
    this.configure('luma-dropdown',{label:this.modeLabel,icon:this.mode==='heat'?'fire':'temperature',value:this.mode,options:this.modes,disabled:this.interactionDisabled});
    this.root.querySelector<HTMLElement>('luma-number')!.style.cssText=this.controlStyle==='round'&&!this.range?'margin-top:-36px;position:relative;z-index:1':'';
    this.bindChildChange('luma-number','value','temperature');this.bindChildChange('luma-dropdown','value','mode');
    this.bindChildChange('luma-dial','highValue','highTemperature');
    this.configure('#high',{label:'Upper target',value:this.highTemperature,min:this.temperature,max:this.max,step:this.step,unit:this.unit,disabled:this.interactionDisabled});this.bindChildChange('#high','value','highTemperature');
    for(const [id,property,options] of [['preset','preset',this.presets],['fan-mode','fanMode',this.fanModes],['swing-mode','swingMode',this.swingModes]] as const){this.configure(`#${id}`,{label:id==='preset'?this.presetLabel:id==='fan-mode'?'Fan mode':'Swing mode',value:this.getValue(property),options,disabled:this.interactionDisabled});this.bindChildChange(`#${id}`,'value',property);}
  }
}
register('luma-thermostat',LumaThermostat,'A composed climate card with temperature dial, measured temperature, target control, and HVAC modes.');

export class LumaLight extends LumaEntity {
  static schema={...entity,...cardHeader,...lightControlSchema,domain:prop('string','light','Light entity domain.')};
  declare brightness:number;declare colorTemperature:number;declare rgbColor:string;declare panel:string;declare colorModes:string[];declare effects:string[];declare effect:string;
  protected change(property:string,value:unknown):void {if(['brightness','rgbColor','colorTemperature'].includes(property))this.setValue('state',property==='brightness'&&Number(value)<=0?'off':'on');super.change(property,value);}
  declare showHeader:boolean;
  protected render():void {
    this.root.innerHTML=`<section class="card pad stack" part="card"><luma-entity-row ${this.showHeader?'':'hidden'}></luma-entity-row><luma-light-controls></luma-light-controls></section>`;
    this.configure('luma-entity-row',{...this.entityProperties(),toggle:true});this.bindChildChange('luma-entity-row','state');
    this.configure('luma-light-controls',this.configuration);
    this.on('luma-light-controls','luma-change',event=>{event.stopPropagation();const {property,value}=(event as CustomEvent).detail;this.change(property,value);});
    this.on('luma-light-controls','luma-input',event=>{event.stopPropagation();this.emit('luma-input',{...(event as CustomEvent).detail,entityId:this.entityId});});
  }
}
register('luma-light',LumaLight,'A light card composed from an entity row, power switch, brightness slider, and color-temperature slider.');

export class LumaCover extends LumaEntity {
  static schema={...entity,...cardHeader,icon:prop('string','cover','Cover icon.'),domain:prop('string','cover','Cover domain.'),position:prop('number',100,'Cover position, from 0 (closed) to 100 (open). Commands emit actions; position changes only when assigned or moved with the slider.'),tiltPosition:prop('number',50,'Slat tilt percentage.'),supportsTilt:prop('boolean',false,'Show independently reusable slat-tilt controls.'),controlMode:prop('string','position','Popup control panel: position, buttons, or tilt (when supported).'),lastChangedLabel:prop('string','','Application-formatted last-changed text below the popup state.')};
  declare position:number;declare tiltPosition:number;declare supportsTilt:boolean;declare controlMode:string;declare lastChangedLabel:string;
  private popupLayout="";
  declare showHeader:boolean;
  protected render():void {
    if(!this.showHeader){this.renderPopup();return;}
    this.root.innerHTML=`<section class="card pad stack" part="card"><luma-entity-row ${this.showHeader?'':'hidden'}></luma-entity-row><luma-cover-controls></luma-cover-controls><luma-slider></luma-slider>${this.supportsTilt?'<luma-command-bar id="tilt-controls"></luma-command-bar><luma-slider id="tilt"></luma-slider>':''}</section>`;
    this.configure('luma-entity-row',{...this.entityProperties(),secondary:`${this.state} · ${this.position}%`});
    this.configure('luma-cover-controls',{entityId:this.entityId,disabled:this.interactionDisabled,commands:[{action:'open',label:'open',icon:'up',disabled:this.position>=100},{action:'stop',label:'stop',icon:'stop'},{action:'close',label:'close',icon:'down',disabled:this.position<=0}]});
    this.configure('luma-slider',{label:'Position',value:this.position,unit:'%',showValue:true,disabled:this.interactionDisabled});this.bindChildChange('luma-slider','value','position');
    this.configure('#tilt-controls',{entityId:this.entityId,disabled:this.interactionDisabled,commands:[{action:'open-tilt',label:'Open tilt'},{action:'stop-tilt',label:'Stop tilt'},{action:'close-tilt',label:'Close tilt'}]});
    this.configure('#tilt',{label:'Tilt',value:this.tiltPosition,unit:'%',showValue:true,disabled:this.interactionDisabled});this.bindChildChange('#tilt','value','tiltPosition');
  }
  private renderPopup():void {
    const mode=this.controlMode==='tilt'&&this.supportsTilt?'tilt':this.controlMode==='buttons'?'buttons':'position';const key=mode+':'+this.supportsTilt;
    const tag=mode==='buttons'?'luma-cover-controls':'luma-vertical-slider';
    if(this.popupLayout!==key||!this.root.querySelector('[part=cover-panel]')){this.popupLayout=key;this.root.innerHTML=`<section class="stack center" part="cover-panel" style="gap:24px;--accent:var(--luma-cover-color,#926bc7)"><div><div class="stat" id="cover-state"></div><div class="small" id="changed" style="font-weight:500;margin-top:8px"></div></div><${tag}></${tag}><luma-segmented style="width:max-content;max-width:100%;margin:auto"></luma-segmented></section>`;if(mode!=='buttons')this.bindChildChange(tag,'value',mode==='tilt'?'tiltPosition':'position');this.on('luma-segmented','luma-change',event=>{event.stopPropagation();this.change('controlMode',(event as CustomEvent).detail.value);});}
    this.root.querySelector('#cover-state')!.textContent=this.state==='unavailable'?'Unavailable':this.state==='opening'?'Opening':this.state==='closing'?'Closing':this.position>=100?'Open':this.position<=0?'Closed':this.position+' %';this.root.querySelector('#changed')!.textContent=this.lastChangedLabel;
    this.configure(tag,mode==='buttons'?{label:'Cover motion',vertical:true,hideLabels:true,disabled:this.interactionDisabled,entityId:this.entityId,commands:[{action:'open',label:'Open',icon:'up',disabled:this.position>=100},{action:'stop',label:'Stop',icon:'stop'},{action:'close',label:'Close',icon:'down',disabled:this.position<=0}]}:{label:mode==='tilt'?'Tilt':'Position',value:mode==='tilt'?this.tiltPosition:this.position,min:0,max:100,mode:mode==='tilt'?'cursor':'end',hideLabel:true,unit:'%',disabled:this.interactionDisabled});
    this.configure('luma-segmented',{label:'Cover control',value:mode,options:[{value:'position',label:'Position',icon:'cover'},{value:'buttons',label:'Buttons',icon:'up'},...(this.supportsTilt?[{value:'tilt',label:'Tilt',icon:'menu'}]:[])],disabled:this.disabled});
  }

}
register('luma-cover',LumaCover,'A blinds/shutter card with open, stop, close actions and position control.');

export class LumaMediaPlayer extends LumaEntity {
  static schema={...entity,...cardHeader,icon:prop('string','speaker','Media player icon.'),mediaTitle:prop('string','','Current track or program title.'),artist:prop('string','','Artist, station, or source name.'),domain:prop('string','media_player','Media player domain.'),volume:prop('number',30,'Volume in percent from 0 to 100.'),muted:prop('boolean',false,'Whether audio is muted.'),position:prop('number',0,'Playback position in seconds.'),duration:prop('number',240,'Media duration in seconds.'),source:prop('string','','Selected source.'),sources:prop('array',[],'Available sources.'),soundMode:prop('string','','Selected sound mode.'),soundModes:prop('array',[],'Available sound modes.'),shuffle:prop('boolean',false,'Shuffle enabled.'),repeat:prop('string','off','Repeat mode: off, one, or all.')};
  declare mediaTitle:string;declare artist:string;declare volume:number;declare muted:boolean;declare position:number;declare duration:number;declare source:string;declare sources:string[];declare soundMode:string;declare soundModes:string[];declare shuffle:boolean;declare repeat:string;
  declare showHeader:boolean;
  protected render():void {
    this.root.innerHTML=`<section class="card pad stack" part="card"><luma-entity-row ${this.showHeader?'':'hidden'}></luma-entity-row><div class="center"><div class="name">${escape(this.mediaTitle || 'Nothing playing')}</div><div class="muted small">${escape(this.artist)}</div></div><luma-media-controls></luma-media-controls><luma-slider id="seek"></luma-slider><luma-slider id="volume"></luma-slider><luma-switch id="mute"></luma-switch><luma-switch id="shuffle"></luma-switch><luma-select id="repeat"></luma-select>${this.sources.length?'<luma-select id="source"></luma-select>':''}${this.soundModes.length?'<luma-select id="sound"></luma-select>':''}</section>`;
    this.configure('luma-entity-row',this.entityProperties());
    this.configure('luma-media-controls',{entityId:this.entityId,disabled:this.interactionDisabled,commands:[{action:'previous',label:'previous',icon:'previous'},{action:'play-pause',label:'play-pause',icon:this.state==='playing'?'pause':'play'},{action:'next',label:'next',icon:'next'}]});
    this.on('luma-media-controls','luma-action',event=>{if((event as CustomEvent).detail.action==='play-pause'){event.stopPropagation();this.change('state',this.state==='playing'?'paused':'playing');}});
    this.configure('#seek',{label:'Playback position',value:this.position,max:this.duration,showValue:true,unit:' s',disabled:this.interactionDisabled});this.bindChildChange('#seek','value','position');
    this.configure('#volume',{label:'Volume',value:this.volume,showValue:true,unit:'%',disabled:this.interactionDisabled});this.bindChildChange('#volume','value','volume');
    this.configure('#mute',{label:'Mute',checked:this.muted,disabled:this.interactionDisabled});this.bindChildChange('#mute','checked','muted');
    this.configure('#shuffle',{label:'Shuffle',checked:this.shuffle,disabled:this.interactionDisabled});this.bindChildChange('#shuffle','checked','shuffle');
    for(const [id,label,property,options] of [['repeat','Repeat','repeat',['off','one','all']],['source','Source','source',this.sources],['sound','Sound mode','soundMode',this.soundModes]] as const){this.configure(`#${id}`,{label,value:this.getValue(property),options,disabled:this.interactionDisabled});this.bindChildChange(`#${id}`,'value',property);}
  }
}
register('luma-media-player',LumaMediaPlayer,'A media player card with track metadata, playback actions, and volume control.');

export interface Forecast { day:string; condition?:string; temperature:number; low?:number; }
export class LumaWeather extends LumaElement {
  static schema={...common,domain:prop('string','weather','Weather entity domain.'),entityId:prop('string','','Weather entity identifier.'),condition:prop('string','Partly cloudy','Human-readable current weather condition.'),temperature:prop('number',22,'Current outdoor temperature.'),unit:prop('string','°C','Temperature unit.'),humidity:prop('number',57,'Relative humidity as a percentage.'),windSpeed:prop('number',12,'Wind speed in the unit specified by wind-unit.'),windUnit:prop('string','km/h','Wind speed unit.'),forecast:prop('array',[],'Forecast array: {day, condition?, temperature, low?}.')};
  declare condition:string;declare temperature:number;declare unit:string;declare humidity:number;declare windSpeed:number;declare windUnit:string;declare forecast:Forecast[];
  protected render():void {
    this.root.innerHTML=`<section class="card pad stack" part="card"><div class="row spread"><div class="row"><span style="color:var(--luma-primary,#03a9f4);transform:scale(1.5);padding:12px">${icon('weather')}</span><div><button class="entity-button name" id="weather-details" aria-label="${escape(this.label||'Weather')}" ${this.disabled?'disabled':''}>${escape(this.label||'Weather')}</button><div class="muted">${escape(this.condition)}</div></div></div><div style="font-size:30px;font-weight:300">${escape(this.temperature)}${escape(this.unit)}</div></div><div class="row spread small muted"><span>Humidity ${escape(this.humidity)}%</span><span>Wind ${escape(this.windSpeed)} ${escape(this.windUnit)}</span></div>${this.forecast.length?`<div style="display:grid;grid-template-columns:repeat(${Math.min(7,this.forecast.length)},1fr);gap:8px;border-top:1px solid var(--luma-border,#e0e0e0);padding-top:16px">${this.forecast.slice(0,7).map(day=>`<div class="stack center small" style="align-items:center;gap:8px"><span>${escape(day.day)}</span><span title="${escape(day.condition || '')}" style="color:var(--luma-primary,#03a9f4)">${icon(/sun|clear/i.test(day.condition || '')?'sun':/rain/i.test(day.condition || '')?'weather':'cloud')}</span><span>${escape(day.temperature)}°</span><span class="muted">${escape(day.low ?? '—')}°</span></div>`).join('')}</div>`:''}</section>`;this.on('#weather-details','click',()=>this.action('more-info'));
  }
}
register('luma-weather',LumaWeather,'A weather card with current conditions and up to seven daily forecast columns.');

export class LumaAlarm extends LumaEntity {
  static schema={...entity,...cardHeader,icon:prop('string','shield','Alarm status icon.'),state:prop('string','disarmed','Current alarm state. Commands emit actions and do not change the supplied state.'),domain:prop('string','alarm_control_panel','Alarm panel domain.'),modes:prop('array',['home','away','night'],'Available arming modes.'),requireCode:prop('boolean',false,'Require a non-empty code before enabling arm/disarm commands. Read the code property explicitly in your command handler.')};
  declare modes:string[];declare requireCode:boolean;
  get code():string{return (this.root.querySelector('luma-keypad') as unknown as {value:string}|null)?.value??'';}
  declare showHeader:boolean;
  protected render():void {
    this.root.innerHTML=`<section class="card pad stack" part="card"><luma-entity-row ${this.showHeader?'':'hidden'}></luma-entity-row>${this.requireCode?'<luma-keypad></luma-keypad>':''}<div class="row" style="flex-wrap:wrap">${(this.state==='disarmed'?this.modes:['disarm']).map(mode=>`<button class="pill" data-mode="${escape(mode)}" ${this.interactionDisabled||this.requireCode?'disabled':''}>${escape(mode==='disarm'?'Disarm':`Arm ${mode}`)}</button>`).join('')}</div></section>`;
    this.configure('luma-entity-row',this.entityProperties());
    this.configure('luma-keypad',{disabled:this.interactionDisabled});
    this.on('luma-keypad','luma-code-input',()=>{for(const b of this.root.querySelectorAll<HTMLButtonElement>('[data-mode]'))b.disabled=this.interactionDisabled||!this.code.length;});
    for(const button of this.root.querySelectorAll<HTMLButtonElement>('[data-mode]'))button.addEventListener('click',()=>this.action(button.dataset.mode==='disarm'?'disarm':`arm-${button.dataset.mode}`));
  }
}
register('luma-alarm',LumaAlarm,'An alarm panel with explicit arm/disarm command events; state is supplied by your application.');
