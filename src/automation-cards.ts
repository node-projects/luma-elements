import {register,escape,active} from './base.js';
import {common,entity,cardHeader,prop} from './metadata.js';
import {LumaEntity} from './components.js';
import {LumaElement} from './base.js';
import {LumaLevelIndicator,LumaOpeningIndicator} from './automation-primitives.js';
import './controls.js';

export class LumaTank extends LumaEntity {
  static schema={...entity,...cardHeader,...LumaLevelIndicator.schema,domain:prop('string','tank','Domain used by the automatic detail popup.'),icon:prop('string','humidity','Header icon for the measured tank or store.')};
  declare showHeader:boolean;declare value:number;declare unit:string;
  protected render():void {
    this.root.innerHTML='<section class="card pad stack" part="card"><luma-entity-row></luma-entity-row><luma-level-indicator></luma-level-indicator><slot name="footer"></slot></section>';
    const row=this.root.querySelector<HTMLElement>('luma-entity-row')!;row.hidden=!this.showHeader;
    this.configure('luma-entity-row',{...this.entityProperties(),secondary:this.state==='unavailable'?'Unavailable':this.value+' '+this.unit});
    this.configure('luma-level-indicator',{...this.configuration,label:this.label});
  }
}
register('luma-tank',LumaTank,'Fill-level card for cisterns, oil tanks, pellet stores or batteries, composed from an entity row and standalone level indicator.');

export class LumaOpening extends LumaEntity {
  static schema={...entity,...cardHeader,...LumaOpeningIndicator.schema,domain:prop('string','opening','Domain for the graphical contact details.'),icon:prop('string','home','Header icon.'),stateLabels:prop('object',{closed:'Closed',open:'Open',tilted:'Tilted',unavailable:'Unavailable',unknown:'Unknown'},'Localized display names keyed by opening state.'),alarm:prop('boolean',false,'Use the error accent while open or tilted; this does not operate a lock or alarm.')};
  declare showHeader:boolean;declare stateLabels:Record<string,string>;declare alarm:boolean;
  protected render():void {
    this.root.innerHTML='<section class="card pad stack" part="card"><luma-entity-row></luma-entity-row><luma-opening-indicator></luma-opening-indicator><span class="center muted" id="opening-state"></span></section>';
    this.root.querySelector<HTMLElement>('luma-entity-row')!.hidden=!this.showHeader;
    const state=this.stateLabels[this.state]||this.state;this.root.querySelector('#opening-state')!.textContent=state;
    this.configure('luma-entity-row',{...this.entityProperties(),secondary:state});
    this.configure('luma-opening-indicator',{...this.configuration,color:this.alarm&&['open','tilted'].includes(this.state)?'var(--luma-error-color,#db4437)':this.color});
  }
}
register('luma-opening',LumaOpening,'Window/door contact card with localized states and an independently reusable closed/open/tilted illustration.');

export class LumaAppliance extends LumaEntity {
  static schema={...entity,...cardHeader,domain:prop('string','appliance','Domain for appliance cycle details.'),icon:prop('string','power','Appliance header icon.'),kind:prop('string','washer','Appliance kind: washer, dryer, dishwasher, or an application-defined kind.'),state:prop('string','idle','Authoritative cycle state, such as idle, running, paused, finished, error or unavailable.'),stateLabel:prop('string','','Optional localized state label; empty uses a humanized state.'),program:prop('string','','Current cycle/program name.'),progress:prop('number',-1,'Reported completion percentage. -1 means unknown; running then uses an indeterminate ring.'),remainingMinutes:prop('number',-1,'Reported remaining minutes. -1 hides the remaining-time reading; 0 means no time remains.'),finishesAt:prop('string','','Optional ISO finish timestamp supplied by the application.'),locale:prop('string','en','Locale for the finish-time display.'),timeZone:prop('string','','Optional IANA timezone for the finish time.'),commands:prop('array',[],'Optional {action,label,icon?,disabled?} command definitions. Actions are requests only and do not assume the appliance accepted them.')};
  declare showHeader:boolean;declare kind:string;declare stateLabel:string;declare program:string;declare progress:number;declare remainingMinutes:number;declare finishesAt:string;declare locale:string;declare timeZone:string;declare commands:unknown[];
  protected render():void {
    const state=this.stateLabel||this.state.replaceAll('_',' ').replace(/^./,c=>c.toUpperCase());const minutes=Math.max(0,Math.ceil(this.remainingMinutes));const remaining=this.remainingMinutes>=0?Math.floor(minutes/60)+':'+String(minutes%60).padStart(2,'0'):'';
    let finish='';if(this.finishesAt){try{const date=new Date(this.finishesAt);if(Number.isFinite(date.getTime()))finish=date.toLocaleTimeString(this.locale,{hour:'2-digit',minute:'2-digit',...(this.timeZone?{timeZone:this.timeZone}:{})});}catch{/* An invalid timestamp has no promised finish time. */}}
    this.root.innerHTML=`<section class="card pad stack" part="card"><luma-entity-row ${this.showHeader?'':'hidden'}></luma-entity-row><div class="center"><div class="name" style="font-size:18px">${escape(this.program||this.label||this.kind.replace(/^./,c=>c.toUpperCase()))}</div><div class="muted" style="margin-top:4px">${escape(state)}</div></div><luma-progress-ring></luma-progress-ring>${remaining?`<span class="small muted center" aria-label="Remaining time">${escape(remaining)} remaining</span>`:''}${finish?`<span class="small muted center">Finishes at ${escape(finish)}</span>`:''}${this.commands.length?'<luma-command-bar></luma-command-bar>':''}<slot name="footer"></slot></section>`;
    this.configure('luma-entity-row',{...this.entityProperties(),secondary:state});
    this.configure('luma-progress-ring',{label:this.label||this.kind,caption:remaining||state,value:this.progress<0?0:this.progress,indeterminate:this.progress<0&&this.state==='running',color:this.state==='error'?'var(--luma-error-color,#db4437)':active(this.state)||this.state==='running'?'primary':'disabled'});
    this.configure('luma-command-bar',{label:'Appliance commands',entityId:this.entityId,commands:this.commands,disabled:this.interactionDisabled});
  }
}
register('luma-appliance',LumaAppliance,'Washer/dryer/dishwasher cycle card composed from the standalone progress ring, supplied program/remaining-time data and optional command controls.');

export class LumaThemeSelector extends LumaElement {
  static schema={...common,value:prop('string','system','Selected appearance: light, dark or system. Changes emit a value event; the host application decides which theme scope to update.')};
  declare value:string;
  protected render():void {
    this.root.innerHTML='<div class="stack" part="selector"><span id="label"></span><luma-segmented></luma-segmented></div>';
    this.root.querySelector('#label')!.textContent=this.label||'Appearance';this.configure('luma-segmented',{label:this.label||'Appearance',value:this.value,options:[{value:'light',label:'Light'},{value:'dark',label:'Dark'},{value:'system',label:'System'}],disabled:this.interactionDisabled});this.bindChange('luma-segmented','value');
  }
}
register('luma-theme-selector',LumaThemeSelector,'Light/dark/system appearance selector composed with the shared segmented control; emits changes without silently modifying global document styling.');
