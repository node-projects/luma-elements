import { LumaElement, register, escape, clamp } from './base.js';
import { common, prop } from './metadata.js';
import { icon } from './icons.js';

export class LumaIcon extends LumaElement {
  static schema = { name: prop('string','light','Name of a built-in SVG icon. Unknown names fall back to light.'), label: prop('string','','Accessible icon description. Empty makes the SVG decorative.') };
  declare name: string;
  protected render(): void { this.root.innerHTML = `<span part="icon" ${this.label ? `role="img" aria-label="${escape(this.label)}"` : 'aria-hidden="true"'} style="display:inline-flex"><slot>${icon(this.name)}</slot></span>`; }
}
register('luma-icon', LumaIcon, 'A dependency-free SVG icon with support for custom slotted artwork.');

export class LumaButton extends LumaElement {
  static schema = {...common, icon:prop('string','','Optional leading built-in icon.'), variant:prop('string','filled','Visual variant: filled or text.')};
  declare icon: string; declare variant: string;
  protected render(): void {
    this.root.innerHTML = `<button part="button" class="${this.variant === 'text' ? 'flat' : 'pill'}" ${this.interactionDisabled ? 'disabled' : ''} aria-label="${escape(this.label || 'Button')}"><span class="row" style="gap:8px">${this.icon ? icon(this.icon) : ''}<slot>${escape(this.label)}</slot></span></button>`;
    this.on('button','click',()=>this.action('press'));
  }
}
register('luma-button',LumaButton,'A keyboard-accessible action button with filled and text variants.');

export class LumaSwitch extends LumaElement {
  static schema = {...common,checked:prop('boolean',false,'Whether the switch is on. User changes emit luma-change with property checked.')};
  declare checked: boolean;
  protected render(): void {
    this.root.innerHTML = `<button part="switch" role="switch" aria-checked="${this.checked}" aria-label="${escape(this.label || 'Toggle')}" ${this.interactionDisabled ? 'disabled' : ''} style="display:flex;align-items:center;padding:3px;width:42px;height:24px;border-radius:20px;background:${this.checked ? 'var(--luma-primary,#03a9f4)' : 'var(--luma-switch-track,#bdbdbd)'}"><span part="thumb" style="width:18px;height:18px;border-radius:50%;background:white;box-shadow:0 1px 3px #0003;transform:translateX(${this.checked ? 18 : 0}px)"></span></button>`;
    this.on('button','click',()=>this.change('checked',!this.checked));
  }
}
register('luma-switch',LumaSwitch,'A native button implementing the ARIA switch pattern.');

export const rangeSchema = {
  ...common, value:prop('number',0,'Current numeric value, clamped to the minimum and maximum for display and user interaction.'),
  min:prop('number',0,'Inclusive lower bound.'),max:prop('number',100,'Inclusive upper bound. Must be greater than min.'),
  step:prop('number',1,'Positive increment for pointer and keyboard adjustments.'),unit:prop('string','','Unit shown after the value, such as %, °C, or W.'),
};
export class LumaSlider extends LumaElement {
  static schema = {...rangeSchema,showValue:prop('boolean',false,'Display the numeric value beside the slider.'),hideLabel:prop('boolean',false,'Visually hide the label while retaining the accessible name.')};
  declare value: number; declare min: number; declare max: number; declare step: number; declare unit: string; declare showValue: boolean; declare hideLabel: boolean;
  protected render(): void {
    this.root.innerHTML = `<label class="row" part="slider">${this.label && !this.hideLabel ? `<span class="small">${escape(this.label)}</span>` : ''}<input aria-label="${escape(this.label || 'Value')}" type="range" style="--range-progress:${clamp((this.value-this.min)/(this.max-this.min || 1)*100,0,100)}%" min="${this.min}" max="${Math.max(this.min,this.max)}" step="${Math.max(.001,this.step)}" value="${clamp(this.value,this.min,this.max)}" ${this.interactionDisabled ? 'disabled' : ''}>${this.showValue ? `<output style="min-width:48px">${escape(this.value)}${escape(this.unit)}</output>` : ''}</label>`;
    this.on('input','input',e=>{const value = Number((e.target as HTMLInputElement).value); (e.target as HTMLInputElement).style.setProperty('--range-progress',`${clamp((value-this.min)/(this.max-this.min || 1)*100,0,100)}%`); const output=this.root.querySelector('output'); if(output)output.textContent=`${value}${this.unit}`;this.emit('luma-input',{property:'value',value});});
    this.on('input','change',e=>this.change('value',Number((e.target as HTMLInputElement).value)));
  }
}
register('luma-slider',LumaSlider,'A range input with keyboard controls, live luma-input events, and committed luma-change events.');

export class LumaNumber extends LumaElement {
  static schema={...rangeSchema,editable:prop('boolean',true,'Allow direct numeric entry in the bar variant, with native min/max/step validation.'),variant:prop('string','bar','Control appearance: bar shows a value between buttons; round uses standalone circular buttons for thermostat dials.')};
  declare variant:string;declare editable:boolean;
  declare value:number;declare min:number;declare max:number;declare step:number;declare unit:string;
  protected render():void {
    this.root.innerHTML=`<div class="controls" part="control" style="${this.variant==='round'?'background:none;justify-content:center;gap:18px;':''}"><button class="flat" style="${this.variant==='round'?'border:1px solid var(--luma-secondary-text,#727272);width:48px;height:48px;':''}" aria-label="Decrease ${escape(this.label || 'value')}" ${this.interactionDisabled || this.value <= this.min ? 'disabled' : ''}>${icon('minus')}</button><span class="grow center" ${this.variant==='round'?'hidden':''}>${this.label?`<span class="small muted" style="display:block">${escape(this.label)}</span>`:''}${this.editable?`<input type="number" aria-label="${escape(this.label||'Value')}" min="${this.min}" max="${this.max}" step="${Math.max(.000001,this.step)}" value="${this.value}" ${this.interactionDisabled?'disabled':''} style="width:76px;padding:4px;border:0;background:transparent;text-align:center;font-variant-numeric:tabular-nums">${escape(this.unit)}`:`<output>${escape(this.value)}${escape(this.unit)}</output>`}</span><button class="flat" style="${this.variant==='round'?'border:1px solid var(--luma-secondary-text,#727272);width:48px;height:48px;':''}" aria-label="Increase ${escape(this.label || 'value')}" ${this.interactionDisabled || this.value >= this.max ? 'disabled' : ''}>${icon('plus')}</button></div>`;
    this.on('input','change',event=>{const input=event.target as HTMLInputElement;if(input.value.trim()&&input.checkValidity()&&Number.isFinite(Number(input.value)))this.change('value',Number(input.value));else input.value=String(this.value);});
    this.on('button:first-child','click',()=>this.change('value',clamp(Number((this.value-Math.max(.001,this.step)).toFixed(6)),this.min,this.max)));
    this.on('button:last-child','click',()=>this.change('value',clamp(Number((this.value+Math.max(.001,this.step)).toFixed(6)),this.min,this.max)));
  }
}
register('luma-number',LumaNumber,'A compact increment/decrement control, used by thermostat cards.');

export interface SelectOption { value:string; label:string; }
export class LumaSelect extends LumaElement {
  static schema={...common,value:prop('string','','Selected option value.'),options:prop('array',[],'Array of strings or {value, label} options. Supply a JavaScript array or JSON attribute.')};
  declare value:string;declare options:Array<string | SelectOption>;
  protected render():void {
    this.root.innerHTML=`<label class="stack" part="control">${escape(this.label)}<select aria-label="${escape(this.label || 'Choose an option')}" ${this.interactionDisabled ? 'disabled' : ''}>${this.options.map(o=>{const value=typeof o==='string'?o:o.value;return `<option value="${escape(value)}" ${value===this.value?'selected':''}>${escape(typeof o==='string'?o:o.label)}</option>`;}).join('')}</select></label>`;
    this.on('select','change',e=>this.change('value',(e.target as HTMLSelectElement).value));
  }
}
register('luma-select',LumaSelect,'A labeled native select for modes, presets, and input-select entities.');
