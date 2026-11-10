import {LumaElement,register,escape} from './base.js';
import {common,prop} from './metadata.js';
interface FeatureControl {tag:string;defaults:Record<string,unknown>;}
const definition=(tag:string,defaults:Record<string,unknown>={}):FeatureControl=>({tag,defaults});
const selector=definition('luma-dropdown',{value:'',options:[]});
const percentage=definition('luma-slider',{value:50,min:0,max:100,showValue:true,unit:'%'});
const toolbar=(actions:string[]):FeatureControl=>definition('luma-command-bar',{commands:actions.map(action=>({action,label:action.replaceAll('-',' ')}))});
/** Public Lovelace feature kinds mapped to independent controls, without hass state/service dependencies. */
export const featureControls:Record<string,FeatureControl>={
  'alarm-modes':toolbar(['arm-home','arm-away','arm-night','disarm']),
  'area-controls':toolbar(['lights-on','lights-off','fans-on','fans-off']),
  'bar-gauge':definition('luma-progress',{value:50}),
  'button':definition('luma-button',{label:'Press'}),
  'climate-fan-modes':selector,'climate-hvac-modes':selector,'climate-preset-modes':selector,'climate-swing-horizontal-modes':selector,'climate-swing-modes':selector,
  'counter-actions':toolbar(['increment','decrement','reset']),
  'cover-open-close':definition('luma-cover-controls'),
  'cover-position':percentage,'cover-position-favorite':definition('luma-segmented',{value:'50',options:['0','25','50','75','100']}),
  'cover-tilt':toolbar(['open-tilt','stop-tilt','close-tilt']),'cover-tilt-favorite':definition('luma-segmented',{value:'50',options:['0','50','100']}),'cover-tilt-position':percentage,
  'date-set':definition('luma-date-picker',{value:'2026-11-10'}),
  'fan-direction':definition('luma-segmented',{value:'forward',options:['forward','reverse']}),'fan-oscillate':definition('luma-switch',{checked:false}),'fan-preset-modes':selector,'fan-speed':percentage,
  'humidifier-modes':selector,'humidifier-toggle':definition('luma-switch',{checked:false}),
  'lawn-mower-commands':toolbar(['start-mowing','pause','dock']),
  'light-brightness':percentage,'light-color':definition('luma-color-picker',{value:'#ffa24d'}),'light-color-favorites':definition('luma-color-swatches',{value:'#ffa24d'}),'light-color-temp':definition('luma-color-temperature',{value:3000,vertical:false}),'light-effect':selector,
  'lock-commands':toolbar(['lock','unlock']),'lock-open-door':toolbar(['open']),
  'media-player-playback':definition('luma-media-controls'),'media-player-sound-mode':selector,'media-player-source':selector,'media-player-volume-buttons':toolbar(['volume-down','mute','volume-up']),'media-player-volume-slider':percentage,
  'numeric-input':definition('luma-number',{value:0,min:0,max:100}),
  'precipitation-forecast':definition('luma-bar-chart',{series:[]}),
  'select-options':selector,
  'target-humidity':percentage,'target-temperature':definition('luma-number',{value:21,min:7,max:35,step:.5,unit:' °C'}),
  'temperature-forecast':definition('luma-line-chart',{series:[]}),
  'timer-actions':toolbar(['start','pause','cancel','finish']),'timer-presets':definition('luma-segmented',{value:'300',options:[{value:'60',label:'1 min'},{value:'300',label:'5 min'},{value:'900',label:'15 min'}]}),
  'toggle':definition('luma-switch',{checked:false}),'trend-graph':definition('luma-line-chart',{series:[]}),
  'update-actions':toolbar(['install','skip']),
  'vacuum-commands':toolbar(['start','pause','stop','return-home']),'vacuum-fan-speed':selector,
  'valve-open-close':definition('luma-cover-controls'),'valve-position':percentage,'valve-position-favorite':definition('luma-segmented',{value:'50',options:['0','25','50','75','100']}),
  'water-heater-operation-modes':selector,
};
export interface FeatureDefinition {type:string;config?:Record<string,unknown>;label?:string;}
export class LumaFeature extends LumaElement {
  static schema={...common,type:prop('string','light-brightness','Public Lovelace feature kind. See featureControls for the complete list.'),config:prop('object',{},'Properties forwarded to the standalone primitive: value/checked, options, commands, limits, favorites, or chart series.'),entityId:prop('string','','Entity identifier included in action/change/input details.')};
  declare type:string;declare config:Record<string,unknown>;declare entityId:string;
  protected render():void {
    const spec=featureControls[this.type];
    if(!spec||!customElements.get(spec.tag)){this.root.innerHTML=`<div class="empty">Unsupported feature: ${escape(this.type)}</div>`;return;}
    this.root.innerHTML=`<${spec.tag}></${spec.tag}>`;
    this.configure(spec.tag,{...spec.defaults,...this.config,label:this.label||String(this.config.label||this.type.replaceAll('-',' ')),entityId:this.entityId,disabled:this.interactionDisabled});
    this.on(spec.tag,'luma-change',event=>{event.stopPropagation();const {property,value}=(event as CustomEvent).detail;this.change('config',{...this.config,[property]:value});});
    for(const type of ['luma-input','luma-action'])this.on(spec.tag,type,event=>{event.stopPropagation();this.emit(type,{...(event as CustomEvent).detail,feature:this.type,entityId:this.entityId});});
  }
}
register('luma-feature',LumaFeature,'Standalone adapter for every public Lovelace feature kind, composed from the same reusable controls used in cards and popups.');

/** Canonical entity property associated with value-based features. */
export const featureProperties:Record<string,string>={
 'light-brightness':'brightness','light-color':'rgbColor','light-color-favorites':'rgbColor','light-color-temp':'colorTemperature','light-effect':'effect',
 'target-temperature':'temperature','target-humidity':'humidity','cover-position':'position','cover-tilt-position':'tiltPosition','valve-position':'position',
 'fan-speed':'speed','fan-direction':'direction','fan-preset-modes':'preset','climate-hvac-modes':'mode','climate-preset-modes':'preset','climate-fan-modes':'fanMode','climate-swing-modes':'swingMode','climate-swing-horizontal-modes':'swingHorizontalMode',
 'humidifier-modes':'mode','media-player-volume-slider':'volume','media-player-source':'source','media-player-sound-mode':'soundMode','vacuum-fan-speed':'fanSpeed','water-heater-operation-modes':'mode','select-options':'value','numeric-input':'value','date-set':'value'
};
