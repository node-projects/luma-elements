import { BaseCustomWebComponentConstructorAppend, css, html } from '@node-projects/base-custom-webcomponent';
import { attributeName, catalog, common, type Schema } from './metadata.js';

export const escape = (value: unknown): string => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]!));
export const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
export const active = (state: string): boolean => ['on','home','playing','heating','cooling','open','unlocked','active'].includes(state);
export const accent = (color: string): string => ({amber:'#ffc107',blue:'#03a9f4',green:'#43a047',red:'#e53935',purple:'#926bc7',orange:'#ff9800'}[color] ?? (CSS.supports('color', color) ? color : '#03a9f4'));

let detailsHandler:((source:LumaElement)=>void)|undefined;
export const setDetailsHandler=(handler:(source:LumaElement)=>void):void=>{detailsHandler=handler;};

/** Reactive, Shadow DOM base backed by the real BaseCustomWebComponent library. */
export class LumaElement extends BaseCustomWebComponentConstructorAppend {
  static schema: Schema = common;
  static readonly template = html`<div id="root" part="root"></div>`;
  static readonly style = css`
    :host{display:block;color:var(--luma-text,#212121);font-family:var(--luma-font,Roboto,Arial,sans-serif);font-size:14px;box-sizing:border-box;color-scheme:var(--luma-color-scheme,light)}
    :host([hidden]){display:none!important}*,*::before,*::after{box-sizing:border-box}
    button,input,select{font:inherit;color:inherit}button{cursor:pointer}button:disabled,input:disabled,select:disabled{cursor:default;opacity:.45}
    button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--luma-primary,#03a9f4);outline-offset:3px}
    button{border:0}a{color:var(--luma-primary,#03a9f4)}
    .card{background:var(--luma-card-background,#fff);border:var(--luma-border-width,1px) solid var(--luma-border,#e0e0e0);border-radius:var(--luma-radius,12px);box-shadow:var(--luma-shadow,0 1px 2px #00000008);overflow:hidden}
    .pad{padding:20px}.title{font-size:var(--luma-title-size,20px);font-weight:400;margin:0 0 20px;line-height:1.4}
    .muted{color:var(--luma-secondary-text,#727272)}.small{font-size:12px}.row{display:flex;align-items:center;gap:14px}.spread{justify-content:space-between}.grow{flex:1;min-width:0}
    .name{font-weight:500;line-height:20px}.state{font-size:12px;line-height:18px}.truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .icon-circle{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:var(--luma-control-background,#f0f0f0);color:var(--luma-secondary-text,#727272);flex-shrink:0}
    .active{color:var(--accent,var(--luma-primary,#03a9f4));background:color-mix(in srgb,var(--accent,var(--luma-primary,#03a9f4)) 16%,transparent)}
    .flat{background:none;color:inherit;padding:8px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;min-width:40px;min-height:40px}.flat:hover{background:var(--luma-control-background,#f0f0f0)}
    .pill{border-radius:22px;background:var(--luma-primary,#03a9f4);color:var(--luma-on-primary,#fff);padding:10px 20px;min-height:40px}
    .controls{background:var(--luma-control-background,#f0f0f0);border-radius:12px;padding:4px 8px;display:flex;align-items:center;gap:8px}
    input[type=range]{accent-color:var(--accent,var(--luma-primary,#03a9f4));width:100%;height:38px;cursor:pointer;min-width:0;margin:0;appearance:none;border-radius:10px;background:linear-gradient(to right,var(--accent,var(--luma-primary,#03a9f4)) var(--range-progress,0%),color-mix(in srgb,var(--accent,var(--luma-primary,#03a9f4)) 15%,var(--luma-control-background,#f0f0f0)) var(--range-progress,0%))}
    input[type=range]::-webkit-slider-thumb{appearance:none;width:5px;height:22px;background:#fff;border-radius:3px;box-shadow:0 0 2px #0002}
    input[type=range]::-moz-range-thumb{border:0;width:5px;height:22px;background:#fff;border-radius:3px}
    input[type=number],select,input[type=password]{width:100%;padding:12px;border:1px solid var(--luma-border,#e0e0e0);border-radius:8px;background:var(--luma-control-background,#f0f0f0)}
    .tile{padding:10px;min-height:56px}.entity-button{width:100%;text-align:left;background:none;padding:0;display:flex;align-items:center;gap:10px;color:inherit}
    .tile .controls{margin-top:10px}.entity-row{min-height:56px}.entity-row + .entity-row{border-top:1px solid var(--luma-border,#e0e0e0)}
    .stat{font-size:40px;font-weight:300;line-height:1.2}.unit{font-size:18px;margin-left:4px}.center{text-align:center}.stack{display:flex;flex-direction:column;gap:12px}
    .chart{width:100%;height:auto;display:block;overflow:visible}.chart text{font-family:inherit;fill:var(--luma-secondary-text,#727272);font-size:11px}.chart .gridline{stroke:var(--luma-border,#e0e0e0);stroke-dasharray:3 4}
    .empty{padding:28px 0;text-align:center;color:var(--luma-secondary-text,#727272)}
    @media(prefers-reduced-motion:no-preference){button{transition:background .15s ease}}
  `;
  /** Accessible name and primary label. */ declare label: string;
  /** Disable user interaction. */ declare disabled: boolean;
  private propertyValues: Record<string, unknown> = {};
  private pending = false;
  private savedFocus: Array<{tag:string;label:string|null;index:number}> = [];
  private initialized = false;
  static get observedAttributes(): string[] { return Object.keys(this.schema).map(attributeName); }
  constructor() {
    super();
    for (const [key, definition] of Object.entries((this.constructor as typeof LumaElement).schema)) {
      this.propertyValues[key] = structuredClone(definition.default);
      // Preserve properties assigned before customElements.define() upgrades an element.
      if (Object.hasOwn(this, key)) {
        const initial = (this as unknown as Record<string, unknown>)[key];
        delete (this as unknown as Record<string, unknown>)[key];
        this.propertyValues[key] = initial;
      }
    }
  }
  ready(): void { this.initialized = true; this.requestUpdate(); }
  connectedCallback(): void { this.requestUpdate(); }
  attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    if (old === value) return;
    const schema = (this.constructor as typeof LumaElement).schema;
    const key = Object.keys(schema).find(k => attributeName(k) === name)!;
    const definition = schema[key];
    let parsed: unknown = value;
    try {
      if (value === null) parsed = structuredClone(definition.default);
      else if (definition.type === 'boolean') parsed = true;
      else if (definition.type === 'number') { parsed = Number(value); if (!Number.isFinite(parsed)) throw new Error('Expected a finite number'); }
      else if (definition.type === 'array' || definition.type === 'object') {
        parsed = JSON.parse(value);
        if (definition.type === 'array' ? !Array.isArray(parsed) : parsed === null || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error(`Expected ${definition.type}`);
      }
      this.setValue(key, parsed);
    } catch (error) {
      this.dispatchEvent(new CustomEvent('luma-error', { detail: { attribute: name, value, message: String(error) }, bubbles: true, composed: true }));
    }
  }
  protected getValue<T>(key: string): T { return this.propertyValues[key] as T; }
  protected setValue(key: string, value: unknown): void { if (!Object.is(this.propertyValues[key],value)) { this.propertyValues[key] = value; this.requestUpdate(); } }
  protected requestUpdate(): void {
    // Capture before any child update removes the currently focused DOM node.
    const focus = this.captureFocus();
    if (focus.length) this.savedFocus = focus;
    if (this.pending) return;
    this.pending = true;
    queueMicrotask(() => {
      this.pending = false;
      const path = this.savedFocus;
      this.savedFocus = [];
      if (this.initialized) this.renderWithFocus(path);
    });
  }
  private captureFocus(): Array<{tag:string;label:string|null;index:number}> {
    const path: Array<{tag:string;label:string|null;index:number}> = [];
    let scope: ShadowRoot | null = this.shadowRoot;
    while (scope?.activeElement) {
      const element = scope.activeElement;
      path.push({tag:element.localName,label:element.getAttribute('aria-label'),index:[...scope.querySelectorAll(element.localName)].indexOf(element)});
      scope = element.shadowRoot;
    }
    return path;
  }
  private renderWithFocus(path: Array<{tag:string;label:string|null;index:number}>): void {
    this.render();
    if (path.length) requestAnimationFrame(() => {
      // Do not steal focus if the user has already moved to another control.
      if (document.activeElement !== document.body && document.activeElement !== this && !this.contains(document.activeElement)) return;
      let current: ShadowRoot | null = this.shadowRoot;
      let target: HTMLElement | undefined;
      for (const entry of path) {
        if (!current) return;
        const candidates: HTMLElement[] = [...current.querySelectorAll<HTMLElement>(entry.tag)];
        target = entry.label ? candidates.find(el => el.getAttribute('aria-label') === entry.label) : candidates[entry.index];
        if (!target) return;
        current = target.shadowRoot;
      }
      target?.focus({preventScroll:true});
    });
  }
  protected get root(): HTMLElement { return this.shadowRoot!.querySelector('#root')!; }
  protected render(): void {}
  protected emit(type: string, detail: Record<string, unknown>): void {
    this.dispatchEvent(new CustomEvent(type, {detail, bubbles:true, composed:true}));
  }
  /** Update a pointer preview without replacing the captured control. */
  protected preview(property:string,value:unknown):void { this.propertyValues[property]=value; this.emit('luma-input',{property,value,entityId:this.getValue('entityId')??''}); }
  protected bindChange(selector:string,property:string,target=property):void {
    this.on(selector,'luma-change',event=>{if((event as CustomEvent).detail.property!==property)return;event.stopPropagation();this.change(target,(event as CustomEvent).detail.value);});
    this.on(selector,'luma-input',event=>{event.stopPropagation();this.emit('luma-input',{property:target,value:(event as CustomEvent).detail.value,entityId:this.getValue('entityId')??''});});
  }
  protected change(property: string, value: unknown): void {
    if(this.disabled)return;
    this.setValue(property, value);
    this.requestUpdate();
    this.emit('luma-change', { property, value, entityId: this.getValue('entityId') ?? '' });
  }
  /** A snapshot of declared component properties; useful to build independent detail views. */
  get configuration():Record<string,unknown> {return Object.fromEntries(Object.keys((this.constructor as typeof LumaElement).schema).map(key=>[key,this.getValue(key)]));}
  /** Commit an interaction from an associated detail view through this element's normal event path. */
  commitChange(property:string,value:unknown):void {this.change(property,value);}
  protected action(action: string): void {
    if(this.disabled || action==='none')return;
    const event=new CustomEvent('luma-action',{detail:{action,entityId:this.getValue('entityId')??''},bubbles:true,composed:true,cancelable:true});
    if(this.dispatchEvent(event)&&action==='more-info')detailsHandler?.(this);
  }
  /** Pass objects as properties, never interpolated JSON. */
  protected configure(selector: string, properties: Record<string, unknown>): void {
    const child = this.root.querySelector(selector);
    if (child) Object.assign(child, properties);
  }
  protected on(selector: string, type: string, callback: (event: Event) => void): void {
    this.root.querySelector(selector)?.addEventListener(type, callback);
  }
}
export function register(tag: string, constructor: typeof LumaElement, description: string): void {
  for (const key of Object.keys(constructor.schema)) {
    if (!Object.hasOwn(constructor.prototype,key)) Object.defineProperty(constructor.prototype,key, {
      get(this: LumaElement) { return this['getValue'](key); },
      set(this: LumaElement,value: unknown) { this['setValue'](key,value); }, configurable:true,
    });
  }
  catalog.push({tag,name:constructor.name,description,schema:constructor.schema});
  if (!customElements.get(tag)) customElements.define(tag,constructor);
}
