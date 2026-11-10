import {LumaElement,register,escape,setDetailsHandler} from './base.js';
import {common,prop} from './metadata.js';
import './devices.js';
import './charts.js';

const deepActive=():HTMLElement|null=>{let el=document.activeElement;while(el?.shadowRoot?.activeElement)el=el.shadowRoot.activeElement;return el as HTMLElement|null;};
export class LumaDialog extends LumaElement {
  static schema={...common,open:prop('boolean',false,'Show a modal using the native top layer and focus trap. Escape, close button, and backdrop dismiss it.'),dismissible:prop('boolean',true,'Allow Escape, close-button, and backdrop dismissal.'),back:prop('boolean',false,'Show a Back to details action in place of Close; emits luma-back.'),width:prop('number',580,'Preferred dialog width in pixels, constrained to the viewport.')};
  declare open:boolean;declare dismissible:boolean;declare width:number;declare back:boolean;
  private returnFocus:HTMLElement|null=null;
  show():void {this.setValue('open',true);}
  close(reason='close'):void {if(!this.open)return;this.setValue('open',false);const dialog=this.root.querySelector('dialog');dialog?.close();this.returnFocus?.focus({preventScroll:true});this.emit('luma-close',{reason});}
  disconnectedCallback():void {this.root.querySelector('dialog')?.close();}
  protected render():void {
    if(!this.root.querySelector('dialog')){
      this.root.innerHTML=`<style>dialog{border:0;border-radius:24px;background:var(--luma-card-background,#fff);color:var(--luma-text,#212121);padding:0;max-width:calc(100vw - 24px);max-height:calc(100dvh - 32px);box-shadow:0 12px 60px #0004}dialog::backdrop{background:#0006}header{display:flex;align-items:center;gap:12px;padding:16px 20px;position:sticky;top:0;background:inherit;z-index:2}.body{padding:0 24px 24px}h2{font-size:18px;font-weight:500;margin:0;flex:1}@media(max-width:500px){dialog{width:calc(100vw - 16px)!important;border-radius:22px}.body{padding:0 16px 20px}}</style><dialog part="dialog"><header part="header"><button class="flat" aria-label="Close dialog" id="close" style="font-size:26px">×</button><h2 id="dialog-title"></h2><slot name="header-actions"></slot></header><div class="body" part="body"><slot></slot></div><slot name="footer"></slot></dialog>`;
      const dialog=this.root.querySelector('dialog')!;
      this.on('#close','click',()=>this.back?this.emit('luma-back',{}):this.close('button'));
      dialog.addEventListener('cancel',event=>{event.preventDefault();if(this.dismissible)this.close('escape');});
      dialog.addEventListener('click',event=>{if(event.target!==dialog||!this.dismissible)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)this.close('backdrop');});
    }
    const dialog=this.root.querySelector('dialog')!;dialog.style.width=`${Math.max(240,this.width)}px`;dialog.setAttribute('aria-labelledby','dialog-title');
    const close=this.root.querySelector<HTMLButtonElement>('#close')!;close.textContent=this.back?'‹':'×';close.setAttribute('aria-label',this.back?'Back to details':'Close dialog');
    this.root.querySelector('#dialog-title')!.textContent=this.label||'Details';(this.root.querySelector('#close') as HTMLElement).hidden=!this.dismissible;
    if(this.open&&!dialog.open&&this.isConnected){this.returnFocus=deepActive();dialog.showModal();this.emit('luma-open',{});}else if(!this.open&&dialog.open)dialog.close();
  }
}
register('luma-dialog',LumaDialog,'Standalone modal shell with native focus trapping, Escape/backdrop dismissal, return focus, header/footer slots, and responsive sizing.');
export class LumaConfirmDialog extends LumaElement {
  static schema={...common,open:prop('boolean',false,'Whether to show the confirmation popup.'),message:prop('string','Are you sure?','Plain-text confirmation message.'),confirmLabel:prop('string','Confirm','Confirm button text.'),cancelLabel:prop('string','Cancel','Cancel button text.')};
  declare open:boolean;declare message:string;declare confirmLabel:string;declare cancelLabel:string;
  protected render():void {
    if(!this.root.querySelector('luma-dialog')){this.root.innerHTML='<luma-dialog><p id="message"></p><div class="row" style="justify-content:flex-end"><luma-button id="cancel"></luma-button><luma-button id="confirm"></luma-button></div></luma-dialog>';for(const action of ['cancel','confirm'])this.on('#'+action,'luma-action',event=>{event.stopPropagation();this.setValue('open',false);this.emit('luma-confirm',{confirmed:action==='confirm'});});this.on('luma-dialog','luma-close',()=>this.setValue('open',false));}
    this.root.querySelector('#message')!.textContent=this.message;this.configure('luma-dialog',{label:this.label||'Confirm action',open:this.open});this.configure('#cancel',{label:this.cancelLabel,variant:'text',disabled:this.disabled});this.configure('#confirm',{label:this.confirmLabel,disabled:this.disabled});
  }
}
register('luma-confirm-dialog',LumaConfirmDialog,'Reusable confirmation popup composed from the native dialog and buttons; confirmation is reported as luma-confirm.');

export class LumaStatePanel extends LumaElement {
  static schema={...common,state:prop('string','unknown','Displayed entity state.'),entityAttributes:prop('object',{},'Attribute key/value pairs.'),series:prop('array',[],'Optional history series, using the luma-line-chart data format.'),unit:prop('string','','State unit.'),icon:prop('string','chart','Entity icon.'),lastChangedLabel:prop('string','','Application-formatted last-changed text.')};
  declare state:string;declare entityAttributes:Record<string,unknown>;declare series:unknown[];declare unit:string;declare icon:string;declare lastChangedLabel:string;
  protected render():void {this.root.innerHTML=`<section class="stack" part="panel"><div class="row"><luma-icon></luma-icon><div class="grow"><span>${escape(this.label)}</span><div class="muted">${escape(this.lastChangedLabel)}</div></div><span style="font-size:20px">${escape(this.state)} ${escape(this.unit)}</span></div>${this.series.length?'<luma-line-chart></luma-line-chart>':''}<luma-attributes></luma-attributes><slot></slot></section>`;this.configure('luma-line-chart',{label:this.label,unit:this.unit,series:this.series});this.configure('luma-attributes',{data:this.entityAttributes});this.configure('luma-icon',{name:this.icon});}
}
register('luma-state-panel',LumaStatePanel,'Reusable read-only entity state, history, and attributes panel for sensors, people, sun, binary sensors, and unknown domains.');

/** Every entity domain in Home Assistant's more-info/controls inventory has an explicit route. */
export const detailDomains:Record<string,string>={
  alarm_control_panel:'luma-alarm',automation:'luma-automation',calendar:'luma-calendar',camera:'luma-camera',climate:'luma-thermostat',configurator:'luma-form',conversation:'luma-conversation',counter:'luma-counter',cover:'luma-cover',date:'luma-input-date',datetime:'luma-input-datetime',default:'luma-state-panel',fan:'luma-fan',group:'luma-entities',humidifier:'luma-humidifier',image:'luma-picture',input_boolean:'luma-switch-card',input_datetime:'luma-input-datetime',input_text:'luma-input-text',input_number:'luma-input-number',number:'luma-input-number',input_select:'luma-input-select',select:'luma-input-select',button:'luma-scene',input_button:'luma-scene',scene:'luma-scene',lawn_mower:'luma-lawn-mower',light:'luma-light',lock:'luma-lock',media_player:'luma-media-player',person:'luma-state-panel',remote:'luma-remote',script:'luma-script',siren:'luma-siren',sun:'luma-state-panel',switch:'luma-switch-card',time:'luma-input-time',timer:'luma-timer',update:'luma-update',vacuum:'luma-vacuum',valve:'luma-valve',water_heater:'luma-water-heater',weather:'luma-weather',sensor:'luma-state-panel',binary_sensor:'luma-state-panel',event:'luma-state-panel',device_tracker:'luma-state-panel',zone:'luma-state-panel',text:'luma-input-text',todo:'luma-todo',notify:'luma-input-text',tag:'luma-state-panel',stt:'luma-state-panel',tts:'luma-state-panel',wake_word:'luma-state-panel',ai_task:'luma-state-panel',alert:'luma-state-panel',air_quality:'luma-state-panel',assist_satellite:'luma-conversation',image_processing:'luma-state-panel',persistent_notification:'luma-state-panel',schedule:'luma-state-panel',weather_forecast:'luma-weather',plant:'luma-plant',proximity:'luma-state-panel',stream:'luma-camera',geo_location:'luma-map'
};
export interface DetailEntity {domain?:string;entityId?:string;label?:string;state?:string;properties?:Record<string,unknown>;entityAttributes?:Record<string,unknown>;series?:unknown[];}
const sourceLocator=(source:LumaElement):(()=>LumaElement|undefined)=>{
  const path:Array<{tag:string;index:number}>=[];let element:Element=source;
  while(true){const root=element.getRootNode() as Document|ShadowRoot;path.unshift({tag:element.localName,index:[...root.querySelectorAll(element.localName)].indexOf(element)});if(root instanceof ShadowRoot)element=root.host;else break;}
  return ()=>{let root:Document|ShadowRoot=document;let found:Element|undefined;for(const segment of path){found=root.querySelectorAll(segment.tag)[segment.index];if(!found)return undefined;if(found.shadowRoot)root=found.shadowRoot;}return found as LumaElement;};
};
export class LumaMoreInfo extends LumaElement {
  static schema={...common,open:prop('boolean',false,'Open the entity details popup.'),entity:prop('object',{},'Entity snapshot: {domain,entityId,label,state,properties,entityAttributes,series}. All device values are properties supplied by the application.'),view:prop('string','info','Selected popup view: info, history, or attributes.')};
  declare open:boolean;declare entity:DetailEntity;declare view:string;
  private locateSource:(()=>LumaElement|undefined)|undefined;
  private panelKey='';
  private triggerLabel:string|null=null;
  showFor(source:LumaElement):void {
    const host=(source.getRootNode() as ShadowRoot).host;
    if(source.localName==='luma-entity-row'&&host instanceof LumaElement&&host.configuration.domain)source=host;
    const config=source.configuration;const explicit=config.detailProperties as Record<string,unknown>|undefined;
    const domain=String(config.domain||String(config.entityId||'').split('.')[0]||({temperature:'sensor',humidity:'sensor',cover:'cover',speaker:'media_player',light:'light'} as Record<string,string>)[String(config.icon)]||'default');
    this.triggerLabel=deepActive()?.getAttribute('aria-label')??null;
    this.locateSource=sourceLocator(source);
    this.entity={domain,entityId:String(config.entityId||''),label:String(config.label||domain),state:String(config.state!==''&&config.state!==undefined?config.state:config.value??'unknown'),properties:{...config,...explicit},entityAttributes:config.entityAttributes as Record<string,unknown>,series:explicit?.series as unknown[]};
    this.view='info';this.open=true;
  }
  close():void {(this.root.querySelector('luma-dialog') as LumaDialog)?.close();this.setValue('open',false);}
  protected render():void {
    if(!this.root.querySelector('luma-dialog')){
      this.root.innerHTML='<luma-dialog><luma-icon-button slot="header-actions" id="history"></luma-icon-button><luma-icon-button slot="header-actions" id="attributes"></luma-icon-button><div id="panel" style="padding-top:12px;--luma-border-width:0;--luma-shadow:none"></div></luma-dialog>';
      this.on('luma-dialog','luma-close',event=>{event.stopPropagation();this.setValue('open',false);this.emit('luma-close',(event as CustomEvent).detail);requestAnimationFrame(()=>{const source=this.locateSource?.();if(!source)return;const find=(root:ShadowRoot):HTMLElement|undefined=>{for(const child of root.querySelectorAll<HTMLElement>('*')){if(this.triggerLabel&&child.getAttribute('aria-label')===this.triggerLabel)return child;if(child.shadowRoot){const found=find(child.shadowRoot);if(found)return found;}}return undefined;};(source.shadowRoot&&find(source.shadowRoot))?.focus({preventScroll:true});});});
      this.on('#history','luma-action',event=>{event.stopPropagation();this.change('view','history');});
      this.on('#attributes','luma-action',event=>{event.stopPropagation();this.change('view','attributes');});
      this.on('luma-dialog','luma-back',event=>{event.stopPropagation();this.change('view','info');});
      this.on('#panel','luma-change',event=>{
        event.stopPropagation();const {property,value}=(event as CustomEvent).detail;
        const properties={...this.entity.properties,[property]:value};const state=property==='state'?String(value):this.entity.state;
        this.setValue('entity',{...this.entity,state,properties});
        const source=this.locateSource?.();if(source){if(Object.hasOwn((source.constructor as typeof LumaElement).schema,property))source.commitChange(property,value);else if(source.localName==='luma-tile'&&((source.configuration.feature==='brightness'&&property==='brightness')||(source.configuration.feature==='temperature'&&property==='temperature')))source.commitChange('value',value);else source.commitChange('detailProperties',{...(source.configuration.detailProperties as object||{}),[property]:value});}else this.emit('luma-change',{property,value,entityId:this.entity.entityId||''});
      });
      this.on('#panel','luma-action',event=>{event.stopPropagation();const detail=(event as CustomEvent).detail;if(detail.action==='more-info'){event.preventDefault();return;}if(detail.action!=='more-info')this.emit('luma-action',{...detail,entityId:this.entity.entityId||''});});
      this.on('#panel','luma-input',event=>{event.stopPropagation();this.emit('luma-input',{...(event as CustomEvent).detail,entityId:this.entity.entityId||''});});
    }
    const entity=this.entity;const domain=entity.domain||String(entity.entityId||'').split('.')[0]||'default';
    const tag=this.view==='history'?'luma-line-chart':this.view==='attributes'?'luma-attributes':detailDomains[domain]||'luma-state-panel';
    const key=domain+':'+this.view+':'+(entity.entityId||'');
    const panel=this.root.querySelector('#panel')!;
    if(key!==this.panelKey||!panel.firstElementChild){panel.replaceChildren(document.createElement(customElements.get(tag)?tag:'luma-state-panel'));this.panelKey=key;}
    const child=panel.firstElementChild!;
    Object.assign(child,this.view==='history'?{...entity.properties,label:entity.label,series:entity.series||entity.properties?.series||[]}:this.view==='attributes'?{data:entity.entityAttributes||{}}:{...entity.properties,label:entity.label,state:entity.state,domain,entityId:entity.entityId,entityAttributes:entity.entityAttributes||{},series:entity.series||entity.properties?.series||[],disabled:this.disabled});
    this.configure('#history',{label:'History',icon:'chart'});this.configure('#attributes',{label:'Attributes',icon:'settings'});
    this.configure('luma-dialog',{label:entity.label||'Entity details',open:this.open,back:this.view!=='info'});
  }
}
register('luma-more-info',LumaMoreInfo,'Domain-aware entity details popup composed from the standalone dialog, tabs, device controls, history chart, and attributes table.');
let automaticDialog:LumaMoreInfo|undefined;
setDetailsHandler(source=>{if(!automaticDialog?.isConnected){automaticDialog=document.createElement('luma-more-info') as LumaMoreInfo;automaticDialog.dataset.automatic='';document.body.append(automaticDialog);}automaticDialog.showFor(source);});
