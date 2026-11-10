import {test,expect,type Page} from '@playwright/test';
async function fixture(page:Page){
 await page.route('**/fixture.html',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html lang="en" data-theme="light"><head><link rel="stylesheet" href="assets/themes.css"><script type="importmap">{"imports":{"@node-projects/base-custom-webcomponent":"./vendor/base-custom-webcomponent/index.js"}}</script><script type="module" src="assets/luma-elements.js"></script></head><body><main id="fixture" style="width:400px;max-width:calc(100vw - 32px);margin:20px"></main></body></html>'}));
 await page.goto('/fixture.html');await page.evaluate(()=>customElements.whenDefined('luma-more-info'));
 await page.evaluate(()=>{(window as any).events=[];for(const type of ['luma-change','luma-input','luma-action','luma-close','luma-confirm'])document.addEventListener(type,event=>(window as any).events.push({type,detail:(event as CustomEvent).detail}));});
}
async function mount(page:Page,tag:string,properties:Record<string,unknown>={}){
 await page.evaluate(({tag,properties})=>{const element=document.createElement(tag);element.id='subject';Object.assign(element,properties);document.querySelector('#fixture')!.replaceChildren(element);},{tag,properties});
 await page.evaluate(()=>new Promise(requestAnimationFrame));return page.locator('#subject');
}
test.beforeEach(async({page})=>fixture(page));

test('radio choices use native keyboard navigation, skip disabled choices and accept JSON attributes',async({page})=>{
 const control=await mount(page,'luma-radio-group',{label:'House mode',value:'home'});
 await control.evaluate(el=>el.setAttribute('options',JSON.stringify([{value:'home',label:'Home'},{value:'away',label:'Away',disabled:true},{value:'night',label:'Night',description:'Quiet hours'}])));
 await control.getByRole('radio',{name:'Home',exact:true}).focus();await page.keyboard.press('ArrowDown');
 await expect(control.getByRole('radio',{name:'Night',exact:true})).toBeChecked();expect(await control.evaluate((el:any)=>el.value)).toBe('night');
 await control.evaluate((el:any)=>el.disabled=true);await expect(control.getByRole('radio',{name:'Home',exact:true})).toBeDisabled();
});

test('momentary press releases once outside, on cancel, on keyboard blur and on removal',async({page})=>{
 const control=await mount(page,'luma-momentary-button',{label:'Jog',entityId:'motor.blind'});const button=control.getByRole('button',{name:'Jog'});
 const box=(await button.boundingBox())!;await page.mouse.move(box.x+10,box.y+10);await page.mouse.down();await page.mouse.move(750,600);await page.mouse.up();
 const values=()=>page.evaluate(()=>(window as any).events.filter((e:any)=>e.type==='luma-change').map((e:any)=>e.detail.value));
 expect(await values()).toEqual([true,false]);await button.focus();await page.keyboard.down('Space');await page.keyboard.down('Space');await button.blur();await page.keyboard.up('Space');
 expect(await values()).toEqual([true,false,true,false]);
 await button.dispatchEvent('pointerdown',{button:0,pointerId:1});await button.dispatchEvent('pointercancel',{pointerId:1});expect(await values()).toEqual([true,false,true,false,true,false]);
 await control.evaluate(el=>{(window as any).direct=[];el.addEventListener('luma-change',event=>(window as any).direct.push((event as CustomEvent).detail));});
 await button.focus();await page.keyboard.down('Enter');await control.evaluate(el=>el.remove());await page.keyboard.up('Enter');
 expect(await page.evaluate(()=>(window as any).direct)).toEqual([{property:'pressed',value:true,entityId:'motor.blind'},{property:'pressed',value:false,entityId:'motor.blind'}]);
});

test('measured levels clamp geometry and warn; unknown progress does not report zero percent',async({page})=>{
 const level=await mount(page,'luma-level-indicator',{value:150,max:100,unit:'L',low:20});
 await expect(level.getByRole('meter')).toHaveAttribute('aria-valuenow','100');await expect(level.locator('[part=fill]')).toHaveAttribute('height','180');
 await level.evaluate((el:any)=>el.value=10);await expect(level.getByRole('meter')).toHaveAttribute('aria-valuetext','10 L · Warning');
 const ring=await mount(page,'luma-progress-ring',{indeterminate:true});await expect(ring.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');await expect(ring.locator('[part=caption]')).toHaveText('In progress');
 await page.emulateMedia({reducedMotion:'reduce'});await expect.poll(()=>ring.locator('.spin').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
});

test('analog time respects a supplied timezone and contact illustrations distinguish all states',async({page})=>{
 const clock=await mount(page,'luma-analog-clock',{time:'2026-11-10T03:15:30Z',timeZone:'UTC',showSeconds:true});
 await expect(clock.locator('[part=hour-hand]')).toHaveAttribute('transform','rotate(97.75 120 120)');await expect(clock.locator('[part=minute-hand]')).toHaveAttribute('transform','rotate(93 120 120)');await expect(clock.locator('[part=second-hand]')).toHaveAttribute('transform','rotate(180 120 120)');
 await clock.evaluate((el:any)=>el.timeZone='invalid');await expect(clock).toHaveText('Invalid time or time zone');
 const opening=await mount(page,'luma-opening-indicator',{state:'closed'});const closed=await opening.locator('[part=leaf]').getAttribute('d');await opening.evaluate((el:any)=>el.state='open');expect(await opening.locator('[part=leaf]').getAttribute('d')).not.toBe(closed);await opening.evaluate((el:any)=>{el.state='tilted';el.hinge='right';});await expect(opening.locator('g')).toHaveAttribute('transform','translate(160 0) scale(-1 1)');await expect(opening.getByRole('img')).toHaveAttribute('aria-label','window: tilted');
});

test('state images select mapped data and reject script URLs',async({page})=>{
 const image=await mount(page,'luma-state-image',{state:'home',images:[{state:'home',src:'room.svg',alt:'Occupied room'},{state:'away',src:'javascript:alert(1)',alt:'Away'}]});
 await expect(image.getByRole('img')).toHaveAttribute('alt','Occupied room');await expect(image.getByRole('img')).toHaveAttribute('src',/room.svg$/);await image.evaluate((el:any)=>el.state='away');await expect(image.locator('img')).toHaveCount(0);
});

test('marquee measures overflow, pauses for focus and offers static reduced-motion text',async({page})=>{
 const marquee=await mount(page,'luma-marquee',{text:'A long home automation announcement '.repeat(5)});const viewport=marquee.locator('.viewport');await expect(marquee.getByRole('button',{name:'Pause scrolling'})).toBeVisible();
 await viewport.focus();await expect.poll(()=>marquee.locator('.line').evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused');await viewport.press('Space');expect(await marquee.evaluate((el:any)=>el.paused)).toBe(true);
 await page.emulateMedia({reducedMotion:'reduce'});await expect.poll(()=>marquee.locator('.line').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');await expect.poll(()=>marquee.locator('.line').evaluate(el=>getComputedStyle(el).whiteSpace)).toBe('normal');
 await marquee.evaluate((el:any)=>{el.text='<b>Home</b>';});await expect(marquee.locator('b')).toHaveCount(0);await expect(marquee.locator('.line')).toHaveText('<b>Home</b>');
});

test('appliance, tank and opening compose independent parts and route details with supplied data',async({page})=>{
 const appliance=await mount(page,'luma-appliance',{label:'Washer',entityId:'appliance.washer',state:'running',program:'Cotton',progress:45,remainingMinutes:73,finishesAt:'invalid',commands:[{action:'pause',label:'Pause',icon:'pause'}]});
 await expect(appliance.locator('luma-progress-ring')).toHaveCount(1);await expect(appliance.getByRole('progressbar')).toHaveAttribute('aria-valuenow','45');await expect(appliance.getByLabel('Remaining time')).toHaveText('1:13 remaining');await expect(appliance).not.toContainText('Invalid Date');
 await appliance.getByRole('button',{name:'Pause',exact:true}).click();expect(await page.evaluate(()=>(window as any).events.filter((e:any)=>e.type==='luma-action').at(-1).detail)).toMatchObject({action:'pause',entityId:'appliance.washer'});expect(await appliance.evaluate((el:any)=>el.state)).toBe('running');
 const tank=await mount(page,'luma-tank',{label:'Cistern',entityId:'tank.water',value:1200,max:2000,low:200,unit:'L'});await expect(tank.locator('luma-level-indicator').getByRole('meter')).toHaveAttribute('aria-valuenow','1200');await expect(tank.getByRole('meter')).toHaveAttribute('aria-valuetext','1,200 L');await tank.getByRole('button',{name:/Cistern/}).click();await expect(page.locator('luma-more-info[data-automatic] luma-tank luma-level-indicator').getByRole('meter')).toHaveAttribute('aria-valuenow','1200');await page.keyboard.press('Escape');
 const opening=await mount(page,'luma-opening',{label:'Kitchen window',entityId:'opening.kitchen',state:'tilted'});await expect(opening.locator('luma-opening-indicator').getByRole('img')).toHaveAttribute('aria-label','Kitchen window: tilted');
});

test('theme selection requests a value without changing application theme',async({page})=>{
 const theme=await mount(page,'luma-theme-selector',{value:'system'});await theme.getByRole('button',{name:'Dark',exact:true}).click();expect(await theme.evaluate((el:any)=>el.value)).toBe('dark');await expect(page.locator('html')).toHaveAttribute('data-theme','light');
});
