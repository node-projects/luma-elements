import {register, active, escape, type LumaElement} from './base.js';
import {LumaEntity} from './components.js';
import {entity, cardHeader, prop, type Schema} from './metadata.js';
import {type Command} from './controls.js';

export interface DeviceControl {type:string;property?:string;label:string;options?:string;min?:number;max?:number;step?:number;unit?:string;commands?:Command[];}
/** Declarative composition of independently usable controls. No per-device SVG/input implementation. */
export class LumaDevice extends LumaEntity {
  static schema:Schema={...entity,...cardHeader,data:prop('object',{},'Values for custom properties referenced by control definitions.'),controls:prop('array',[],'Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag.')};
  declare controls:DeviceControl[];declare data:Record<string,unknown>;declare showHeader:boolean;
  private layoutKey="";
  protected get deviceControls():DeviceControl[]{return this.controls;}
  protected render():void {
    const controls=this.deviceControls;
    const layoutKey=JSON.stringify([controls,this.showHeader]);if(layoutKey!==this.layoutKey){this.layoutKey=layoutKey;this.root.innerHTML=`<section class="card pad stack" part="card"><div id="device-state" class="center" ${this.showHeader?'hidden':''} style="font-size:36px;padding:12px 0">${this.state==='on'?'On':this.state==='off'?'Off':escape(this.state)}</div><luma-entity-row ${this.showHeader?'':'hidden'}></luma-entity-row>${controls.map((_,i)=>`<div data-control="${i}"></div>`).join('')}<slot></slot></section>`;}
    this.root.querySelector('#device-state')!.textContent=this.state==='on'?'On':this.state==='off'?'Off':this.state;
    const properties=this.entityProperties();if(!this.secondary){const current=this.getValue('currentHumidity')??this.getValue('currentTemperature');const battery=this.getValue('battery');if(current!==undefined)properties.secondary=`${current}${this.domain==='humidifier'?' %':' °C'} · ${this.state}`;else if(battery!==undefined)properties.secondary=`${this.state} · Battery ${battery}%`;}this.configure('luma-entity-row',properties);
    controls.forEach((c,i)=>{
      if(!/^luma-[a-z-]+$/.test(c.type)||!customElements.get(c.type))return;
      const holder=this.root.querySelector(`[data-control="${i}"]`)!;const type=!this.showHeader&&c.type==='luma-switch'&&c.property==='state'?'luma-control-switch':c.type;const fresh=!holder.firstElementChild;const control=(holder.firstElementChild||document.createElement(type)) as LumaElement;if(fresh)holder.append(control);
      const options=c.options?this.getValue(c.options):undefined;
      Object.assign(control,{label:c.label,vertical:!this.showHeader,disabled:this.interactionDisabled||this.state==='unavailable',entityId:this.entityId,...(c.min!==undefined?{min:c.min}:{}),...(c.max!==undefined?{max:c.max}:{}),...(c.step!==undefined?{step:c.step}:{}),...(c.unit!==undefined?{unit:c.unit}:{}),...(c.type==='luma-slider'?{showValue:true}:{}),...(options?{options}:{}),...(c.commands?{commands:c.commands}:{}),...(c.property?{[c.type==='luma-switch'?'checked':'value']:c.property==='state'?active(this.state):(Object.hasOwn((this.constructor as typeof LumaElement).schema,c.property)?this.getValue(c.property):this.data[c.property])}:{})});
      if(fresh&&c.property){control.addEventListener('luma-change',event=>{event.stopPropagation();let value=(event as CustomEvent).detail.value;if(c.property==='state')value=value?'on':'off';if(Object.hasOwn((this.constructor as typeof LumaElement).schema,c.property!))this.change(c.property!,value);else this.change('data',{...this.data,[c.property!]:value});});control.addEventListener('luma-input',event=>{event.stopPropagation();this.emit('luma-input',{property:c.property,value:(event as CustomEvent).detail.value,entityId:this.entityId});});}
    });
  }
}
register('luma-device',LumaDevice,'Composable device card driven by control definitions; each control is also a standalone web component.');
const number=(value:number,description:string)=>prop('number',value,description);
const string=(value:string,description:string)=>prop('string',value,description);
const array=(value:unknown[],description:string)=>prop('array',value,description);
const power:DeviceControl={type:'luma-switch',property:'state',label:'Power'};
const slider=(property:string,label:string,min=0,max=100,step=1,unit='%'):DeviceControl=>({type:'luma-slider',property,label,min,max,step,unit});
const select=(property:string,label:string,options:string):DeviceControl=>({type:'luma-select',property,label,options});
const commands=(items:string[]):DeviceControl=>({type:'luma-command-bar',label:'Commands',commands:items.map(action=>({action,label:action.replaceAll('-',' ')}))});

export class LumaSwitchCard extends LumaDevice {static schema={...LumaDevice.schema,domain:string('switch','Switch domain.')};protected get deviceControls():DeviceControl[]{return [power];}}
register('luma-switch-card',LumaSwitchCard,'Switch/input-boolean card composed from an entity row and power switch.');
export class LumaFan extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('fan','Fan domain.'),icon:string('fan','Fan icon.'),speed:number(50,'Fan speed percentage.'),oscillating:prop('boolean',false,'Whether the fan oscillates.'),direction:string('forward','Airflow direction.'),directions:array(['forward','reverse'],'Supported airflow directions.'),preset:string('normal','Selected preset.'),presets:array(['normal','sleep','eco'],'Supported fan presets.')};
  declare speed:number;declare oscillating:boolean;declare direction:string;declare preset:string;declare presets:string[];
  protected get deviceControls():DeviceControl[]{return [power,slider('speed','Speed'),{type:'luma-switch',property:'oscillating',label:'Oscillation'},select('direction','Direction','directions'),select('preset','Preset','presets')];}
}
register('luma-fan',LumaFan,'Fan power, speed, oscillation, direction and preset controls.');
export class LumaHumidifier extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('humidifier','Humidifier domain.'),icon:string('humidity','Humidity icon.'),humidity:number(50,'Target relative humidity percentage.'),currentHumidity:number(42,'Measured humidity.'),mode:string('normal','Selected operating mode.'),modes:array(['normal','eco','boost'],'Available operating modes.')};
  declare humidity:number;declare currentHumidity:number;declare mode:string;declare modes:string[];
  protected get deviceControls():DeviceControl[]{return [power,slider('humidity','Target humidity',0,100),select('mode','Mode','modes')];}
}
register('luma-humidifier',LumaHumidifier,'Humidifier/dehumidifier card with independently reusable power, target humidity, and mode controls.');
export class LumaVacuum extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('vacuum','Vacuum domain.'),battery:number(85,'Battery charge percentage.'),fanSpeed:string('normal','Selected cleaning power.'),fanSpeeds:array(['quiet','normal','turbo'],'Supported cleaning power levels.')};
  declare battery:number;declare fanSpeed:string;declare fanSpeeds:string[];
  protected get deviceControls():DeviceControl[]{return [commands(['start','pause','stop','return-home','locate','clean-spot']),select('fanSpeed','Cleaning power','fanSpeeds')];}
}
register('luma-vacuum',LumaVacuum,'Vacuum start/pause/stop/dock/locate/spot-clean actions and fan-speed selection.');
export class LumaLock extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('lock','Lock domain.'),icon:string('lock','Lock icon.'),state:string('locked','Authoritative lock state; issuing a command does not assume success.'),supportsOpen:prop('boolean',true,'Show the unlatch/open-door command.')};declare supportsOpen:boolean;
  protected get deviceControls():DeviceControl[]{return [commands(['lock','unlock',...(this.supportsOpen?['open']:[])])];}
}
register('luma-lock',LumaLock,'Lock/unlock/unlatch command card. The supplied state remains authoritative.');
export class LumaValve extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('valve','Valve domain.'),position:number(50,'Valve position from closed (0) to open (100).')};declare position:number;
  protected get deviceControls():DeviceControl[]{return [{type:'luma-cover-controls',label:'Valve motion'},slider('position','Position')];}
}
register('luma-valve',LumaValve,'Valve open/stop/close actions and position control.');
export class LumaWaterHeater extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('water_heater','Water heater domain.'),icon:string('temperature','Temperature icon.'),temperature:number(55,'Target water temperature.'),currentTemperature:number(48,'Measured water temperature.'),mode:string('eco','Selected operation mode.'),modes:array(['off','eco','electric','performance'],'Supported operation modes.'),away:prop('boolean',false,'Away mode enabled.')};
  declare temperature:number;declare currentTemperature:number;declare mode:string;declare modes:string[];declare away:boolean;
  protected get deviceControls():DeviceControl[]{return [{type:'luma-number',property:'temperature',label:'Water temperature',min:30,max:90,step:1,unit:' °C'},select('mode','Operation','modes'),{type:'luma-switch',property:'away',label:'Away mode'}];}
}
register('luma-water-heater',LumaWaterHeater,'Water heater target temperature, operation mode, and away mode.');
export class LumaSiren extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('siren','Siren domain.'),tone:string('alarm','Selected tone.'),tones:array(['alarm','chime','warning'],'Available siren tones.'),volume:number(50,'Siren volume percentage.'),duration:number(10,'Playback duration in seconds.')};
  declare tone:string;declare tones:string[];declare volume:number;declare duration:number;
  protected get deviceControls():DeviceControl[]{return [power,select('tone','Tone','tones'),slider('volume','Volume'),{type:'luma-number',property:'duration',label:'Duration',min:1,max:3600,step:1,unit:' s'}];}
}
register('luma-siren',LumaSiren,'Siren power, tone, volume, and duration controls.');
export class LumaRemote extends LumaDevice {static schema={...LumaDevice.schema,domain:string('remote','Remote domain.')};protected get deviceControls():DeviceControl[]{return [power,commands(['up','left','select','right','down','back','home','volume-up','volume-down'])];}}
register('luma-remote',LumaRemote,'Remote-control navigation, selection, home/back, and volume commands.');
export class LumaLawnMower extends LumaDevice {static schema={...LumaDevice.schema,domain:string('lawn_mower','Lawn mower domain.')};protected get deviceControls():DeviceControl[]{return [commands(['start-mowing','pause','dock'])];}}
register('luma-lawn-mower',LumaLawnMower,'Lawn mower start, pause, and return-to-dock commands.');
export class LumaCounter extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('counter','Counter domain.'),value:number(0,'Current counter value.'),min:number(0,'Minimum value.'),max:number(100,'Maximum value.'),step:number(1,'Increment/decrement step.')};declare value:number;declare min:number;declare max:number;declare step:number;
  protected get deviceControls():DeviceControl[]{return [{type:'luma-number',property:'value',label:'Counter',min:this.min,max:this.max,step:this.step},commands(['reset'])];}
}
register('luma-counter',LumaCounter,'Counter increment/decrement and reset controls.');
export class LumaTimer extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('timer','Timer domain.'),duration:number(300,'Configured timer duration in seconds.'),remaining:number(180,'Remaining duration in seconds, supplied by the application.'),finishesAt:string('','Optional ISO finish timestamp. A running timer displays the countdown to this instant.')};declare duration:number;declare remaining:number;declare finishesAt:string;
  private ticker:ReturnType<typeof setInterval>|undefined;
  protected get deviceControls():DeviceControl[]{return [{type:'luma-number',property:'duration',label:'Duration',min:1,max:86400,step:60,unit:' s'},commands(['start','pause','cancel','finish'])];}
  connectedCallback():void {super.connectedCallback();if(!this.ticker)this.ticker=setInterval(()=>{if(this.state==='active'&&this.finishesAt)this.requestUpdate();},1000);}
  disconnectedCallback():void {clearInterval(this.ticker);this.ticker=undefined;}
  protected render():void {super.render();const seconds=this.state==='active'&&Number.isFinite(Date.parse(this.finishesAt))?Math.max(0,Math.ceil((Date.parse(this.finishesAt)-Date.now())/1000)):this.remaining;const out=document.createElement('output');out.className='stat center';out.setAttribute('aria-label','Remaining time');out.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;this.root.querySelector('section')!.append(out);}
}
register('luma-timer',LumaTimer,'Timer duration and start/pause/cancel/finish commands, with an optional timestamp-based live countdown.');
export class LumaUpdate extends LumaDevice {
  static schema={...LumaDevice.schema,domain:string('update','Software update domain.'),installedVersion:string('1.0.0','Installed version.'),latestVersion:string('1.1.0','Available version.'),progress:number(0,'Installation progress percentage.'),releaseNotes:string('','Plain text release notes. Never interpreted as HTML.')};declare installedVersion:string;declare latestVersion:string;declare progress:number;declare releaseNotes:string;
  protected get deviceControls():DeviceControl[]{return [{type:'luma-progress',property:'progress',label:'Installation',min:0,max:100},commands(['install','skip','release-notes'])];}
  protected render():void {super.render();const p=document.createElement('p');p.textContent=`Installed ${this.installedVersion} · Available ${this.latestVersion}\n${this.releaseNotes}`;p.className='muted small';this.root.querySelector('section')!.append(p);}
}
register('luma-update',LumaUpdate,'Update versions, release notes, installation progress and install/skip commands.');
export class LumaAutomation extends LumaDevice {static schema={...LumaDevice.schema,domain:string('automation','Automation domain.')};protected get deviceControls():DeviceControl[]{return [power,commands(['trigger'])];}}
register('luma-automation',LumaAutomation,'Automation enable/disable and manual trigger controls.');
export class LumaScript extends LumaDevice {static schema={...LumaDevice.schema,domain:string('script','Script domain.')};protected get deviceControls():DeviceControl[]{return [commands(['run','stop'])];}}
register('luma-script',LumaScript,'Script run/stop commands.');
export class LumaInputText extends LumaDevice {static schema={...LumaDevice.schema,domain:string('input_text','Input text domain.'),value:string('','Current text value.')};declare value:string;protected get deviceControls():DeviceControl[]{return [{type:'luma-text-field',property:'value',label:'Text'}];}}
register('luma-input-text',LumaInputText,'Input-text entity card using the standalone text-field control.');
export class LumaInputNumber extends LumaCounter {static schema={...LumaCounter.schema,domain:string('input_number','Input number domain.')};protected get deviceControls():DeviceControl[]{return [{type:'luma-number',property:'value',label:'Value',min:this.min,max:this.max,step:this.step},slider('value','Value',this.min,this.max,this.step,'')];}}
register('luma-input-number',LumaInputNumber,'Numeric helper entity card with synchronized slider and numeric stepper.');
export class LumaInputSelect extends LumaDevice {static schema={...LumaDevice.schema,domain:string('input_select','Select/helper domain.'),value:string('home','Selected option.'),options:array(['home','away','night'],'Available options.')};declare value:string;declare options:string[];protected get deviceControls():DeviceControl[]{return [select('value','Option','options')];}}
register('luma-input-select',LumaInputSelect,'Select/helper entity card using the standalone select control.');
export class LumaInputDate extends LumaDevice {static schema={...LumaDevice.schema,domain:string('date','Date domain.'),value:string('2026-11-10','Local date string, YYYY-MM-DD.')};declare value:string;protected get deviceControls():DeviceControl[]{return [{type:'luma-date-picker',property:'value',label:'Date'}];}}
register('luma-input-date',LumaInputDate,'Date entity detail control.');
export class LumaInputTime extends LumaInputDate {static schema={...LumaInputDate.schema,domain:string('time','Time domain.'),value:string('18:30','Local time string, HH:MM[:SS].')};protected get deviceControls():DeviceControl[]{return [{type:'luma-time-picker',property:'value',label:'Time'}];}}
register('luma-input-time',LumaInputTime,'Time entity detail control.');
export class LumaInputDateTime extends LumaInputDate {static schema={...LumaInputDate.schema,domain:string('input_datetime','Date/time helper domain.'),value:string('2026-11-10T18:30','Local date/time without an implicit timezone.')};protected get deviceControls():DeviceControl[]{return [{type:'luma-datetime-picker',property:'value',label:'Date and time'}];}}
register('luma-input-datetime',LumaInputDateTime,'Date/time helper entity detail control.');
export class LumaScene extends LumaDevice {static schema={...LumaDevice.schema,domain:string('scene','Scene/button domain.')};protected get deviceControls():DeviceControl[]{return [commands([this.domain==='scene'?'activate':'press'])];}}
register('luma-scene',LumaScene,'Scene activation control, also used by scene-like entity details.');
