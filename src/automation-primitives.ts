import {LumaElement,register,escape,clamp,accent} from './base.js';
import {common,prop} from './metadata.js';
import {LumaButton} from './primitives.js';
import {LumaClock} from './cards.js';
import {icon} from './icons.js';

export interface RadioOption {value:string;label:string;disabled?:boolean;description?:string;}
export class LumaRadioGroup extends LumaElement {
  static schema={...common,value:prop('string','','Selected option value. User input emits luma-change with property value.'),options:prop('array',[],'Strings or {value,label,disabled?,description?} options. Values are strings; disabled options are skipped by native keyboard navigation.'),orientation:prop('string','vertical','Option layout: vertical or horizontal.')};
  declare value:string;declare options:Array<string|RadioOption>;declare orientation:string;
  protected render():void {
    const options=this.options.map(option=>typeof option==='string'?{value:option,label:option}:option);
    this.root.innerHTML=`<style>fieldset{border:0;margin:0;padding:0;min-width:0}legend{padding:0 0 8px}.options{display:flex;flex-direction:${this.orientation==='horizontal'?'row':'column'};flex-wrap:wrap;gap:4px}label{display:flex;align-items:center;gap:12px;padding:10px 12px;min-height:44px;border-radius:12px;cursor:pointer}input{margin:0;width:20px;height:20px;accent-color:var(--luma-primary,#03a9f4);flex:none}label:has(input:checked){background:color-mix(in srgb,var(--luma-primary,#03a9f4) 12%,transparent)}label:has(input:disabled){opacity:.45;cursor:default}@media(hover:hover){label:not(:has(input:disabled)):hover{background:color-mix(in srgb,var(--luma-primary,#03a9f4) 20%,transparent)}}</style><fieldset part="group" ${this.interactionDisabled?'disabled':''}><legend ${this.label?'':'hidden'}>${escape(this.label)}</legend><div class="options" role="radiogroup" aria-label="${escape(this.label||'Options')}" aria-orientation="${this.orientation==='horizontal'?'horizontal':'vertical'}">${options.map((option,index)=>`<label part="option"><input type="radio" name="choice" data-index="${index}" value="${escape(option.value)}" aria-label="${escape(option.label)}" ${option.value===this.value?'checked':''} ${option.disabled||this.interactionDisabled?'disabled':''}><span>${escape(option.label)}${option.description?`<span class="small muted" style="display:block">${escape(option.description)}</span>`:''}</span></label>`).join('')}</div></fieldset>`;
    this.on('.options','change',event=>this.change('value',(event.target as HTMLInputElement).value));
  }
}
register('luma-radio-group',LumaRadioGroup,'Native accessible single-choice list with keyboard navigation, descriptions, per-option disabled state and Luma selection/hover styling.');

export class LumaMomentaryButton extends LumaButton {
  static schema={...LumaButton.schema,entityId:prop('string','','Optional source identifier included in press and release events.'),pressed:prop('boolean',false,'Current pressed state. Pointer/key press emits true; release, cancel, focus loss or removal emits false. Applications must handle release events as well as press events.')};
  declare pressed:boolean;declare entityId:string;
  private releasePress:(()=>void)|undefined;
  disconnectedCallback():void {this.releasePress?.();}
  protected render():void {
    this.releasePress?.();
    this.root.innerHTML=`<button class="${this.variant==='text'?'flat':'pill'}" part="button" aria-label="${escape(this.label||'Hold button')}" aria-pressed="${this.pressed}" ${this.interactionDisabled?'disabled':''} style="touch-action:none;user-select:none">${this.icon?icon(this.icon):''}<slot>${escape(this.label||'Hold')}</slot></button>`;
    const button=this.root.querySelector<HTMLButtonElement>('button')!;let held=false;
    const set=(value:boolean)=>{this.setValue('pressed',value,false);button.setAttribute('aria-pressed',String(value));button.style.boxShadow=value?'inset 0 0 0 999px #0002':'';this.emit('luma-change',{property:'pressed',value,entityId:this.entityId});};
    const press=()=>{if(held||this.interactionDisabled)return;held=true;set(true);};
    const release=()=>{if(!held)return;held=false;set(false);};this.releasePress=release;
    button.onpointerdown=event=>{if(event.button!==0||this.interactionDisabled)return;event.preventDefault();button.focus({preventScroll:true});button.setPointerCapture(event.pointerId);press();};
    button.onpointerup=event=>{release();if(button.hasPointerCapture(event.pointerId))button.releasePointerCapture(event.pointerId);};
    button.onpointercancel=release;button.onlostpointercapture=release;button.onblur=release;
    button.onkeydown=event=>{if([' ','Enter'].includes(event.key)){event.preventDefault();press();}else if(event.key==='Escape'){event.preventDefault();release();}};
    button.onkeyup=event=>{if([' ','Enter'].includes(event.key)){event.preventDefault();release();}};
    button.onclick=event=>event.preventDefault();
  }
}
register('luma-momentary-button',LumaMomentaryButton,'Press-and-hold control that emits paired pressed/released values for pointer and keyboard input, including cancellation and focus-loss release.');

export class LumaMarquee extends LumaElement {
  static schema={...common,text:prop('string','','Plain text to display; HTML is always escaped.'),speed:prop('number',30,'Scrolling speed in pixels per second; only overflowing text moves.'),paused:prop('boolean',false,'Pause scrolling. Hover and keyboard focus also pause without changing this property.')};
  declare text:string;declare speed:number;declare paused:boolean;
  private observer:ResizeObserver|undefined;
  disconnectedCallback():void {this.observer?.disconnect();}
  protected render():void {
    this.observer?.disconnect();
    this.root.innerHTML=`<style>.viewport{overflow:hidden;min-width:0;flex:1;border-radius:4px}.line{display:block;white-space:nowrap;width:max-content;animation:travel var(--duration,10s) ease-in-out 1.5s infinite alternate}.viewport:hover .line,.viewport:focus .line{animation-play-state:paused}@keyframes travel{from{transform:translateX(0)}to{transform:translateX(calc(-1 * var(--distance,0px)))}}@media(prefers-reduced-motion:reduce){.line{animation:none!important;transform:none!important;white-space:normal;width:auto;overflow-wrap:anywhere}}</style><div class="row" part="marquee" style="gap:4px"><div class="viewport" tabindex="0" role="group" aria-label="${escape(this.label||'Scrolling text')}"><span class="line" part="text">${escape(this.text)}</span></div><button class="flat" aria-label="${this.paused?'Resume':'Pause'} scrolling" aria-pressed="${this.paused}" ${this.interactionDisabled?'disabled':''}>${icon(this.paused?'play':'pause')}</button></div>`;
    const viewport=this.root.querySelector<HTMLElement>('.viewport')!;const line=this.root.querySelector<HTMLElement>('.line')!;const button=this.root.querySelector<HTMLButtonElement>('button')!;
    const measure=()=>{const distance=Math.max(0,line.scrollWidth-viewport.clientWidth);line.style.setProperty('--distance',distance+'px');line.style.setProperty('--duration',Math.max(2,distance/Math.max(1,this.speed))+'s');line.style.animationName=distance&&!this.interactionDisabled?'travel':'none';line.style.animationPlayState=this.paused?'paused':'';button.hidden=!distance;};
    this.observer=new ResizeObserver(measure);this.observer.observe(viewport);measure();
    button.onclick=()=>this.change('paused',!this.paused);
    viewport.onkeydown=event=>{if(event.key===' '&&!button.hidden){event.preventDefault();this.change('paused',!this.paused);}};
  }
}
register('luma-marquee',LumaMarquee,'Overflow-aware plain-text ticker with pause/resume, hover/focus pause, responsive measurement, and static readable reduced-motion rendering.');

export class LumaAnalogClock extends LumaClock {
  static schema={...LumaClock.schema,showNumbers:prop('boolean',true,'Show hour numbers around the clock face.')};
  declare showNumbers:boolean;
  protected render():void {
    const date=this.time?new Date(this.time):new Date();let hour=0,minute=0,second=0,description='';
    try{const parts=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23',...(this.timeZone?{timeZone:this.timeZone}:{})}).formatToParts(date);const n=(type:string)=>Number(parts.find(part=>part.type===type)?.value||0);hour=n('hour');minute=n('minute');second=n('second');description=date.toLocaleTimeString(this.locale,{hour:'2-digit',minute:'2-digit',...(this.showSeconds?{second:'2-digit'}:{}),...(this.timeZone?{timeZone:this.timeZone}:{})});}catch{this.root.innerHTML='<div class="empty">Invalid time or time zone</div>';return;}
    this.root.innerHTML=`<div class="stack center" part="clock"><svg viewBox="0 0 240 240" role="img" aria-label="${escape((this.label?this.label+': ':'')+description)}" style="display:block;width:100%;max-width:260px;margin:auto"><circle part="face" cx="120" cy="120" r="112" fill="var(--luma-card-background,#fff)" stroke="var(--luma-border,#e0e0e0)"/>${Array.from({length:60},(_,i)=>`<line x1="120" x2="120" y1="16" y2="${i%5?20:26}" transform="rotate(${i*6} 120 120)" stroke="var(--luma-secondary-text,#727272)" stroke-width="${i%5?1:2}"/>`).join('')}${this.showNumbers?Array.from({length:12},(_,i)=>{const number=i+1,angle=number*Math.PI/6;return `<text x="${120+84*Math.sin(angle)}" y="${125-84*Math.cos(angle)}" text-anchor="middle" fill="var(--luma-text,#212121)" font-size="14">${number}</text>`;}).join(''):''}<line part="hour-hand" x1="120" y1="120" x2="120" y2="67" stroke="var(--luma-text,#212121)" stroke-width="6" stroke-linecap="round" transform="rotate(${(hour%12)*30+minute/2+second/120} 120 120)"/><line part="minute-hand" x1="120" y1="120" x2="120" y2="42" stroke="var(--luma-text,#212121)" stroke-width="4" stroke-linecap="round" transform="rotate(${minute*6+second/10} 120 120)"/>${this.showSeconds?`<line part="second-hand" x1="120" y1="133" x2="120" y2="33" stroke="var(--luma-primary,#03a9f4)" stroke-width="2" transform="rotate(${second*6} 120 120)"/>`:''}<circle cx="120" cy="120" r="5" fill="var(--luma-primary,#03a9f4)"/></svg>${this.label?`<span class="muted small">${escape(this.label)}</span>`:''}</div>`;
  }
}
register('luma-analog-clock',LumaAnalogClock,'Theme-aware SVG analog clock with supplied/live time, IANA timezone, optional seconds/numbers, accessible time, and inherited timer cleanup.');

export class LumaLevelIndicator extends LumaElement {
  static schema={...common,value:prop('number',65,'Measured fill level, clamped to min/max for the graphic.'),min:prop('number',0,'Empty value.'),max:prop('number',100,'Full value.'),unit:prop('string','%','Unit of the measured value.'),low:prop('number',20,'Low-level warning threshold.'),high:prop('number',-1,'High-level warning threshold in measured units. -1 disables high warnings; a threshold at max also disables them.'),precision:prop('number',0,'Decimal places, from 0 to 6.'),locale:prop('string','en','Numeric formatting locale.'),color:prop('string','primary','Normal fill color, using a Luma color name or CSS color.'),orientation:prop('string','vertical','vertical tank or horizontal bar.'),showScale:prop('boolean',true,'Show scale labels and ticks.')};
  declare value:number;declare min:number;declare max:number;declare unit:string;declare low:number;declare high:number;declare precision:number;declare locale:string;declare color:string;declare orientation:string;declare showScale:boolean;
  protected render():void {
    const fraction=clamp((this.value-this.min)/(this.max-this.min||1),0,1);const warning=this.value<this.low||this.high!==-1&&this.high<this.max&&this.value>this.high;const color=warning?'var(--luma-error-color,#db4437)':accent(this.color);const horizontal=this.orientation==='horizontal';const format=(value:number)=>value.toLocaleString(this.locale,{minimumFractionDigits:clamp(this.precision,0,6),maximumFractionDigits:clamp(this.precision,0,6)});const value=format(this.value)+' '+this.unit;
    this.root.innerHTML=`<div part="indicator" role="meter" aria-label="${escape(this.label||'Fill level')}" aria-valuemin="${this.min}" aria-valuemax="${this.max}" aria-valuenow="${clamp(this.value,this.min,this.max)}" aria-valuetext="${escape(value+(warning?' · Warning':''))}" style="max-width:${horizontal?'100%':'220px'};margin:auto"><svg viewBox="${horizontal?'0 0 320 90':'0 0 180 230'}" style="display:block;width:100%" aria-hidden="true"><defs><clipPath id="tank-clip"><rect x="${horizontal?12:24}" y="${horizontal?12:10}" width="${horizontal?296:100}" height="${horizontal?32:180}" rx="${horizontal?16:20}"/></clipPath></defs><rect part="track" x="${horizontal?12:24}" y="${horizontal?12:10}" width="${horizontal?296:100}" height="${horizontal?32:180}" rx="${horizontal?16:20}" fill="var(--luma-control-background,#f0f0f0)" stroke="var(--luma-border,#ddd)"/><g clip-path="url(#tank-clip)"><rect part="fill" x="${horizontal?12:24}" y="${horizontal?12:190-fraction*180}" width="${horizontal?296*fraction:100}" height="${horizontal?32:fraction*180}" fill="${color}" fill-opacity=".65"/></g>${this.showScale?[0,.25,.5,.75,1].map(f=>horizontal?`<text x="${12+296*f}" y="63" text-anchor="${f===0?'start':f===1?'end':'middle'}" font-size="11" fill="var(--luma-secondary-text,#727272)">${escape(format(this.min+f*(this.max-this.min)))}</text>`:`<line x1="130" x2="136" y1="${190-180*f}" y2="${190-180*f}" stroke="var(--luma-secondary-text,#727272)"/><text x="141" y="${194-180*f}" font-size="11" fill="var(--luma-secondary-text,#727272)">${escape(format(this.min+f*(this.max-this.min)))}</text>`).join(''):''}<text part="value" x="${horizontal?160:74}" y="${horizontal?85:221}" text-anchor="middle" font-size="18" fill="var(--luma-text,#212121)">${escape(value)}</text></svg></div>`;
  }
}
register('luma-level-indicator',LumaLevelIndicator,'Standalone measured tank/bar fill with scale, clamped geometry, units, accessible meter values and low/high warnings.');

export class LumaProgressRing extends LumaElement {
  static schema={...common,value:prop('number',0,'Completion percentage from 0 to 100.'),indeterminate:prop('boolean',false,'Show an indeterminate arc instead of a measured percentage; reduced motion keeps it still.'),caption:prop('string','','Text in the center, e.g. remaining time. Empty uses the percentage.'),color:prop('string','primary','Ring color, a Luma color name or CSS color.')};
  declare value:number;declare indeterminate:boolean;declare caption:string;declare color:string;
  protected render():void {const value=clamp(this.value,0,100);this.root.innerHTML=`<style>.spin{transform-origin:80px 80px;animation:spin 1.5s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){.spin{animation:none}}</style><div part="ring" role="progressbar" aria-label="${escape(this.label||'Progress')}" aria-valuemin="0" aria-valuemax="100" ${this.indeterminate?'':`aria-valuenow="${value}"`} aria-valuetext="${escape(this.caption||(this.indeterminate?'In progress':Math.round(value)+' %'))}" style="position:relative;width:min(100%,200px);aspect-ratio:1;margin:auto"><svg viewBox="0 0 160 160" style="display:block;width:100%" aria-hidden="true"><circle cx="80" cy="80" r="68" fill="none" stroke="var(--luma-control-background,#eee)" stroke-width="10"/><g class="${this.indeterminate?'spin':''}"><circle part="fill" cx="80" cy="80" r="68" pathLength="100" fill="none" stroke="${accent(this.color)}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${this.indeterminate?25:value} 100" transform="rotate(-90 80 80)"/></g></svg><span part="caption" style="position:absolute;inset:30% 14%;display:grid;place-items:center;text-align:center;font-size:24px;font-variant-numeric:tabular-nums;overflow-wrap:anywhere">${escape(this.caption||(this.indeterminate?'In progress':Math.round(value)+' %'))}</span></div>`;}
}
register('luma-progress-ring',LumaProgressRing,'Standalone determinate/indeterminate progress ring with center caption, accessibility and reduced-motion support.');

export class LumaOpeningIndicator extends LumaElement {
  static schema={...common,state:prop('string','closed','Opening state: closed, open, tilted, or unavailable.'),kind:prop('string','window','Physical opening: window or door.'),hinge:prop('string','left','Hinge side: left or right; mirrors the illustration.'),color:prop('string','primary','Active/open accent, using a Luma color or CSS color.')};
  declare state:string;declare kind:string;declare hinge:string;declare color:string;
  protected render():void {const opened=this.state==='open';const tilted=this.state==='tilted'&&this.kind!=='door';const unavailable=['unknown','unavailable'].includes(this.state);const edge=opened||tilted?accent(this.color):'var(--luma-secondary-text,#727272)';this.root.innerHTML=`<svg viewBox="0 0 160 190" part="illustration" role="img" aria-label="${escape(this.label||this.kind)}: ${escape(this.state)}" style="display:block;width:min(100%,200px);margin:auto;${unavailable?'opacity:.45':''}"><g transform="${this.hinge==='right'?'translate(160 0) scale(-1 1)':''}"><rect x="25" y="12" width="105" height="160" rx="8" fill="var(--luma-control-background,#eee)" stroke="var(--luma-border,#ddd)" stroke-width="3"/><path part="leaf" d="${opened?'M30 18 L96 38 L96 180 L30 165 Z':tilted?'M30 35 L125 18 L125 166 L30 166 Z':'M31 18 H124 V166 H31 Z'}" fill="var(--luma-card-background,#fff)" stroke="${edge}" stroke-width="4" stroke-linejoin="round"/>${this.kind==='door'?`<circle cx="${opened?83:110}" cy="95" r="4" fill="${edge}"/>`:`<path d="${opened?'M36 55 L90 67 M63 29 V172':tilted?'M35 100 L120 93 M76 28 V162':'M35 92 H120 M78 22 V162'}" stroke="${edge}" stroke-width="3"/>`}</g>${unavailable?'<text x="80" y="110" text-anchor="middle" font-size="32" fill="var(--luma-text,#212121)">?</text>':''}</svg>`;}
}
register('luma-opening-indicator',LumaOpeningIndicator,'Standalone window/door illustration for closed, open, tilted and unavailable states, with configurable hinge side.');

export interface StateImage {state:string;src:string;alt?:string;}
export class LumaStateImage extends LumaElement {
  static schema={...common,state:prop('string','','State used to select an image.'),images:prop('array',[],'Array of {state,src,alt?} image mappings. URLs may be relative, http(s), or blob; scripts and arbitrary HTML are not allowed.'),src:prop('string','','Fallback image URL when no state mapping matches.'),alt:prop('string','','Fallback alternative text.'),fit:prop('string','contain','Image fit: contain or cover.')};
  declare state:string;declare images:StateImage[];declare src:string;declare alt:string;declare fit:string;
  protected render():void {const image=this.images.find(item=>item.state===this.state);let src='';try{const value=image?.src||this.src;const url=new URL(value,document.baseURI);if(value&&['http:','https:','blob:'].includes(url.protocol))src=url.href;}catch{/* Invalid URLs keep the placeholder. */}this.root.innerHTML=src?`<img part="image" src="${escape(src)}" alt="${escape(image?.alt||this.alt||this.label||this.state)}" style="display:block;width:100%;max-height:var(--luma-image-height,280px);object-fit:${this.fit==='cover'?'cover':'contain'};border-radius:var(--luma-radius,12px)">`:`<div class="empty" part="placeholder">${escape(this.label||'No image')}</div>`;this.on('img','error',()=>{const img=this.root.querySelector('img')!;img.replaceWith(document.createTextNode(image?.alt||this.alt||'Image unavailable'));});}
}
register('luma-state-image',LumaStateImage,'State-dependent image display with fallback, safe URLs, alt text and theme-consistent rounding.');
