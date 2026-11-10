import {LumaElement,register} from './base.js';
import {common,prop} from './metadata.js';
/** Fixed metrics deliberately avoid auto-fitting and layout changes at fractional steps. */
export class LumaTemperatureValue extends LumaElement {
  static schema={...common,value:prop('number',21,'Displayed temperature.'),unit:prop('string','°C','Temperature unit, shown in a fixed upper suffix.'),precision:prop('number',1,'Fractional digits to reserve, from 0 to 3. The decimal field stays present for whole values.'),locale:prop('string','en','Number-format locale; for example de displays a comma.'),digits:prop('number',2,'Minimum integer-digit column width. All digits use tabular metrics.')};
  declare value:number;declare unit:string;declare precision:number;declare locale:string;declare digits:number;
  protected render():void {
    if(!this.root.querySelector('output'))this.root.innerHTML='<style>.reading{display:inline-flex;align-items:stretch;font-size:var(--luma-readout-size,56px);line-height:1.1;font-weight:400;font-variant-numeric:tabular-nums;font-feature-settings:"tnum";white-space:nowrap;min-height:1.1em}.integer{text-align:right;min-width:var(--digits,2ch)}.suffix{display:flex;flex-direction:column;justify-content:space-between;text-align:left;min-width:1.2ch;padding-left:.04em}.unit{font-size:.36em;line-height:1.25}.fraction{font-size:.46em;line-height:1;min-width:2ch}</style><output part="value" class="reading"><span class="integer" part="integer"></span><span class="suffix"><span class="unit" part="unit"></span><span class="fraction" part="fraction"></span></span></output>';
    const precision=Math.max(0,Math.min(3,Math.round(this.precision)));let parts:Intl.NumberFormatPart[];
    try{parts=new Intl.NumberFormat(this.locale,{minimumFractionDigits:precision,maximumFractionDigits:precision,useGrouping:false}).formatToParts(this.value);}catch{parts=new Intl.NumberFormat('en',{minimumFractionDigits:precision,maximumFractionDigits:precision,useGrouping:false}).formatToParts(this.value);}
    this.root.querySelector('.integer')!.textContent=parts.filter(p=>['integer','minusSign','plusSign'].includes(p.type)).map(p=>p.value).join('');
    this.root.querySelector('.fraction')!.textContent=precision?parts.filter(p=>['decimal','fraction'].includes(p.type)).map(p=>p.value).join(''):'';
    this.root.querySelector('.unit')!.textContent=this.unit;
    const output=this.root.querySelector<HTMLElement>('output')!;output.style.setProperty('--digits',Math.max(1,Math.min(8,this.digits))+'ch');output.setAttribute('aria-label',(this.label?this.label+': ':'')+parts.map(p=>p.value).join('')+' '+this.unit);
  }
}
register('luma-temperature-value',LumaTemperatureValue,'Standalone fixed-metric, locale-aware temperature readout with separate integer, decimal, and unit columns; fractional changes never auto-resize the font.');
