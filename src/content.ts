import { LumaElement, register, escape, active, accent } from './base.js';
import { common, entity, prop } from './metadata.js';
import { LumaEntity } from './components.js';
import { icon } from './icons.js';

export class LumaButtonCard extends LumaEntity {
  static schema={...entity};
  protected render():void {
    this.root.innerHTML=`<button class="card stack center" part="card" style="width:100%;min-height:140px;align-items:center;justify-content:center;padding:20px;gap:10px" ${this.disabled?'disabled':''} aria-label="${escape(this.label)}"><span style="color:${active(this.state)?accent(this.color):'var(--luma-secondary-text,#727272)'};transform:scale(1.4)"><slot name="icon">${icon(this.icon)}</slot></span><span class="name">${escape(this.label)}</span><span class="small muted">${escape(this.secondary || this.state)}</span></button>`;
    this.on('button','click',()=>this.action('press'));
  }
}
register('luma-button-card',LumaButtonCard,'A large entity action button with state-colored icon.');

/** Only HTTP(S), same-origin relative URLs, and local blob image URLs are accepted. */
function imageUrl(source:string):string {
  if(!source)return '';
  try {const url=new URL(source,document.baseURI);return ['http:','https:','blob:'].includes(url.protocol)?escape(url.href):'';}catch{return '';}
}
export class LumaPicture extends LumaElement {
  static schema={...common,src:prop('string','','Image URL. Relative URLs, HTTP(S), and blob URLs are supported. No image is fetched until a source is provided.'),alt:prop('string','','Alternative text describing the image.'),caption:prop('string','','Secondary caption under the image.')};
  declare src:string;declare alt:string;declare caption:string;
  protected render():void {const src=imageUrl(this.src);this.root.innerHTML=`<figure class="card" part="card" style="margin:0">${src?`<img part="image" src="${src}" alt="${escape(this.alt)}" loading="lazy" style="display:block;width:100%;aspect-ratio:16/9;object-fit:cover">`:'<div class="empty">No image source</div>'}<figcaption class="pad"><div class="name">${escape(this.label)}</div><span class="small muted">${escape(this.caption)}</span><slot></slot></figcaption></figure>`;}
}
register('luma-picture',LumaPicture,'An image card for camera snapshots and room images, with caption and alt text.');

export class LumaText extends LumaElement {
  static schema={...common,content:prop('string','','Plain text content. Line breaks are preserved; markup is escaped for safety. Use the default slot for trusted rich HTML.')};
  declare content:string;
  protected render():void {this.root.innerHTML=`<section class="card pad" part="card">${this.label?`<h2 class="title">${escape(this.label)}</h2>`:''}<div style="white-space:pre-wrap;line-height:1.7" part="content">${escape(this.content)}</div><slot></slot></section>`;}
}
register('luma-text',LumaText,'A safe text card with a slot for application-provided rich content.');
