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
async function dialPoint(page:Page,value:number,min=7,max=35){
 const box=await page.locator('#subject luma-dial luma-arc svg').boundingBox();if(!box)throw Error('Dial not visible');
 const angle=(135+(value-min)/(max-min)*270)*Math.PI/180;
 return {x:box.x+(150+112*Math.cos(angle))*box.width/300,y:box.y+(140+112*Math.sin(angle))*box.height/280};
}
test.beforeEach(async({page})=>fixture(page));

test('thermostat pointer click/drag previews, commits once, clamps, and remains a reusable dial',async({page})=>{
 const control=await mount(page,'luma-thermostat',{label:'Room',entityId:'climate.room',temperature:21,currentTemperature:20.8});
 const first=await dialPoint(page,23.5);await page.mouse.move(first.x,first.y);await page.mouse.down();
 const last=await dialPoint(page,26);await page.mouse.move(last.x,last.y,{steps:6});
 expect(await control.evaluate((el:any)=>el.temperature)).toBe(21);
 await expect(control.getByRole('slider',{name:'Target temperature',exact:true})).toHaveAttribute('aria-valuenow','26');
 await page.mouse.up();await expect.poll(()=>control.evaluate((el:any)=>el.temperature)).toBe(26);
 const changes=await page.evaluate(()=>(window as any).events.filter((e:any)=>e.type==='luma-change'));
 expect(changes).toEqual([{type:'luma-change',detail:{property:'temperature',value:26,entityId:'climate.room'}}]);
 await expect(control.locator('luma-dial')).toHaveCount(1);
 const slider=control.getByRole('slider',{name:'Target temperature',exact:true});await slider.press('End');expect(await control.evaluate((el:any)=>el.temperature)).toBe(35);
 await slider.press('Home');expect(await control.evaluate((el:any)=>el.temperature)).toBe(7);
});

test('dial pointer cancellation restores preview without issuing a value change',async({page})=>{
 const control=await mount(page,'luma-thermostat',{temperature:21});const p=await dialPoint(page,24);await page.mouse.move(p.x,p.y);await page.mouse.down();
 await control.locator('luma-dial .dial').dispatchEvent('pointercancel',{pointerId:1});await page.mouse.up();
 await expect.poll(()=>control.locator('luma-dial').evaluate((el:any)=>el.value)).toBe(21);
 expect(await page.evaluate(()=>(window as any).events.filter((e:any)=>e.type==='luma-change'))).toEqual([]);
});

test('dual targets cannot cross and disabled controls reject mouse and keyboard changes',async({page})=>{
 const control=await mount(page,'luma-thermostat',{range:true,temperature:20,highTemperature:24});
 await control.getByRole('slider',{name:'Target temperature lower'}).press('End');
 expect(await control.evaluate((el:any)=>el.temperature)).toBe(24);
 await control.getByRole('slider',{name:'Target temperature upper'}).press('Home');expect(await control.evaluate((el:any)=>el.highTemperature)).toBe(24);
 await control.evaluate((el:any)=>el.disabled=true);await expect(control.getByRole('button',{name:'Increase Target',exact:true})).toBeDisabled();
 const p=await dialPoint(page,30);await page.mouse.click(p.x,p.y);expect(await control.evaluate((el:any)=>el.temperature)).toBe(24);
});

test('temperature decimals have fixed typography and measured/primary display options work',async({page})=>{
 const value=await mount(page,'luma-temperature-value',{value:21,locale:'de',precision:1});
 const before=await value.locator('output').boundingBox();const size=await value.locator('.integer').evaluate(el=>getComputedStyle(el).fontSize);
 await value.evaluate((el:any)=>el.value=21.5);await expect(value.locator('.fraction')).toHaveText(',5');
 expect(await value.locator('output').boundingBox()).toEqual(before);expect(await value.locator('.integer').evaluate(el=>getComputedStyle(el).fontSize)).toBe(size);
 const thermostat=await mount(page,'luma-thermostat',{temperature:22.5,currentTemperature:20.8,locale:'de',showCurrentAsPrimary:true});
 await expect(thermostat.locator('#current-value')).toHaveText('20,8 °C');
 await expect(thermostat.locator('luma-temperature-value').first().locator('output')).toHaveAttribute('aria-label','20,8 °C');
 await expect(thermostat.locator('#target-caption')).toHaveText('Target 22,5 °C');
 await thermostat.evaluate((el:any)=>el.showCurrentTemperature=false);await expect(thermostat.locator('#current')).toBeHidden();
});

test('mode/preset popovers work with mouse, arrow keys, Enter, Escape, and inside a dialog',async({page})=>{
 const control=await mount(page,'luma-thermostat',{presets:['comfort','away','eco'],preset:'comfort'});
 await control.getByRole('combobox',{name:'Preset',exact:true}).click();
 await control.getByRole('option',{name:'eco',exact:true}).click();expect(await control.evaluate((el:any)=>el.preset)).toBe('eco');
 await control.getByRole('combobox',{name:'HVAC mode'}).press('ArrowDown');await page.keyboard.press('Home');await page.keyboard.press('Enter');expect(await control.evaluate((el:any)=>el.mode)).toBe('off');
 await control.getByRole('combobox',{name:'Preset',exact:true}).click();await page.keyboard.press('Escape');await expect(control.getByRole('listbox')).toBeHidden();
});

test('color wheel supports real dragging, keyboard changes, swatches, valid/invalid hex, and disabled state',async({page})=>{
 const picker=await mount(page,'luma-color-picker',{value:'#ffa24d'});const wheel=picker.getByRole('slider',{name:'Color'});const box=await wheel.boundingBox();if(!box)throw Error('No wheel');
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width*.95,box.y+box.height/2,{steps:5});await page.mouse.up();
 expect(await picker.evaluate((el:any)=>el.value)).toMatch(/^#ff[0-9a-f]{4}$/);await wheel.press('ArrowLeft');
 await picker.getByRole('button',{name:'Use #48b6ff'}).click();expect(await picker.evaluate((el:any)=>el.value)).toBe('#48b6ff');
 const input=picker.getByRole('textbox',{name:'Hex color'});await input.fill('#nothex');await input.press('Tab');expect(await picker.evaluate((el:any)=>el.value)).toBe('#48b6ff');
 await input.fill('#ff0000');expect(await input.inputValue()).toBe('#ff0000');await input.press('Tab');expect(await picker.evaluate((el:any)=>el.value)).toBe('#ff0000');
 await picker.evaluate((el:any)=>el.disabled=true);await expect(picker.getByRole('button',{name:'Use #48b6ff'})).toBeDisabled();
});

test('light panels follow capabilities and color/brightness can be set while off',async({page})=>{
 const light=await mount(page,'luma-light',{state:'off',colorModes:['brightness','color_temp'],brightness:70});
 await expect(light.getByRole('button',{name:'Color',exact:true})).toHaveCount(0);
 const brightness=light.getByRole('slider',{name:'Brightness',exact:true});await brightness.press('End');await expect.poll(()=>light.evaluate((el:any)=>el.brightness)).toBe(100);expect(await light.evaluate((el:any)=>el.state)).toBe('on');
 await light.getByRole('button',{name:'Temperature',exact:true}).click();await expect(light.getByRole('slider',{name:'Color temperature'})).toBeVisible();
 await light.evaluate((el:any)=>{el.colorModes=['brightness','rgb'];el.state='off';});
 await light.getByRole('button',{name:'Color',exact:true}).click();await expect(light.getByRole('slider',{name:'Color',exact:true})).toBeVisible();
 await light.getByRole('button',{name:'Use #ff8800',exact:true}).click();expect(await light.evaluate((el:any)=>el.rgbColor)).toBe('#ff8800');expect(await light.evaluate((el:any)=>el.state)).toBe('on');
});

test('entity content opens the correct modal, changes source values, preserves focus and closes with Escape',async({page})=>{
 const tile=await mount(page,'luma-tile',{label:'Reading lamp',entityId:'light.reading',state:'on',feature:'brightness',value:49});
 await tile.getByRole('button',{name:'Reading lamp',exact:true}).click();const popup=page.locator('luma-more-info[data-automatic]');
 await expect(popup.getByRole('dialog',{name:'Reading lamp'})).toBeVisible();await expect(popup.locator('luma-light')).toHaveCount(1);
 await popup.getByRole('slider',{name:'Brightness',exact:true}).press('End');await expect.poll(()=>tile.evaluate((el:any)=>el.value)).toBe(100);
 await popup.getByRole('button',{name:'History',exact:true}).click();await expect(popup.locator('luma-line-chart')).toBeVisible();await popup.getByRole('button',{name:'Back to details'}).click();await expect(popup.locator('luma-light')).toBeVisible();
 await page.keyboard.press('Escape');await expect(popup.getByRole('dialog')).not.toBeVisible();await expect(tile.getByRole('button',{name:'Reading lamp',exact:true})).toBeFocused();
});

test('canceling more-info supplies an application-owned details behavior',async({page})=>{
 const tile=await mount(page,'luma-tile',{label:'Room',entityId:'sensor.room'});
 await tile.evaluate(el=>el.addEventListener('luma-action',e=>e.preventDefault()));await tile.getByRole('button',{name:'Room',exact:true}).click();await expect(page.locator('luma-more-info[data-automatic]')).toHaveCount(0);
});

test('icon toggle, content action, long press, and double-click are distinct',async({page})=>{
 const tile=await mount(page,'luma-tile',{label:'Lamp',entityId:'light.lamp',state:'off',tapAction:'press',holdAction:'held',doubleTapAction:'double'});
 await tile.locator('.flat').click();await expect.poll(()=>tile.evaluate((el:any)=>el.state)).toBe('on');
 const content=tile.getByRole('button',{name:'Lamp',exact:true});await content.dblclick();
 const box=await content.boundingBox();if(!box)throw Error('No content');await page.mouse.move(box.x+10,box.y+10);await page.mouse.down();await page.waitForTimeout(550);await page.mouse.up();
 const actions=await page.evaluate(()=>(window as any).events.filter((e:any)=>e.type==='luma-action').map((e:any)=>e.detail.action));expect(actions).toContain('double');expect(actions).toContain('held');expect(actions).not.toContain('press');
});

test('nested entity popup edits continue to route after parent rows rerender',async({page})=>{
 const entities=await mount(page,'luma-entities',{entities:[{label:'Lamp',state:'on',toggle:true,entityId:'light.lamp'}]});
 await entities.getByRole('button',{name:'Lamp',exact:true}).click();const popup=page.locator('luma-more-info[data-automatic]');
 await popup.getByRole('button',{name:'Toggle light'}).click();await expect.poll(()=>entities.evaluate((el:any)=>el.entities[0].state)).toBe('off');
 await popup.getByRole('button',{name:'Toggle light'}).click();await expect.poll(()=>entities.evaluate((el:any)=>el.entities[0].state)).toBe('on');
});

test('native dialog traps focus, survives property updates, dismisses backdrop, and restores trigger',async({page})=>{
 await page.evaluate(()=>{const button=document.createElement('button');button.id='opener';button.textContent='Open';document.body.prepend(button);});
 const dialog=await mount(page,'luma-dialog',{label:'Reusable dialog'});await dialog.evaluate(el=>{const input=document.createElement('input');input.setAttribute('aria-label','Inside field');el.append(input);});
 await page.getByRole('button',{name:'Open',exact:true}).focus();await dialog.evaluate((el:any)=>el.open=true);await expect(dialog.getByRole('dialog')).toBeVisible();
 await dialog.getByRole('textbox',{name:'Inside field'}).fill('kept');await dialog.evaluate((el:any)=>el.label='Updated title');await expect(dialog.getByRole('textbox')).toHaveValue('kept');
 await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.activeElement?.id)).not.toBe('opener');
 await page.mouse.click(3,3);await expect(dialog.getByRole('dialog')).not.toBeVisible();await expect(page.locator('#opener')).toBeFocused();
});

test('all domain routes render real controls and every public tile feature renders its primitive',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 const result=await page.evaluate(async()=>{
  const {detailDomains,featureControls}=await import('/assets/luma-elements.js' as string);
  const missing:string[]=[];
  for(const [domain,tag] of Object.entries(detailDomains)){
   if(!customElements.get(tag as string)){missing.push(domain+':'+tag);continue;}
   const popup=document.createElement('luma-more-info') as any;popup.entity={domain,label:domain,state:'on',entityId:domain+'.test',properties:{}};document.querySelector('#fixture')!.replaceChildren(popup);await new Promise(requestAnimationFrame);if(!popup.shadowRoot.querySelector('#panel')?.firstElementChild)missing.push(domain);
  }
  for(const type of Object.keys(featureControls)){
   const feature=document.createElement('luma-feature') as any;feature.type=type;document.querySelector('#fixture')!.replaceChildren(feature);await new Promise(requestAnimationFrame);if(feature.shadowRoot.textContent.includes('Unsupported feature'))missing.push(type);
  }
  return {missing,features:Object.keys(featureControls).length,domains:Object.keys(detailDomains).length};
 });
 expect(result.missing).toEqual([]);expect(result.features).toBe(53);expect(result.domains).toBeGreaterThan(36);expect(errors).toEqual([]);
});

test('history plots expose stepped fills, hover values, keyboard inspection, legend toggles and drag zoom',async({page})=>{
 const graph=await mount(page,'luma-line-chart',{label:'Rain',unit:'mm',series:[{name:'Rain',fill:true,data:[{x:'2026-11-10T00:00:00Z',y:9.2},{x:'2026-11-10T01:00:00Z',y:5.2},{x:'2026-11-10T03:00:00Z',y:7.2}]}]});
 await expect(graph.locator('polygon')).toHaveCount(1);const box=await graph.locator('svg').boundingBox();if(!box)throw Error('No plot');
 await page.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await expect(graph.getByRole('status')).toContainText('Rain:');
 await graph.locator('svg').press('End');await expect(graph.getByRole('status')).toContainText('7.2 mm');
 await page.mouse.move(box.x+box.width*.2,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.7,box.y+box.height*.5);await page.mouse.up();await expect(graph.getByRole('button',{name:'Reset zoom'})).toBeVisible();
 await graph.getByRole('button',{name:'Reset zoom'}).click();await graph.getByRole('button',{name:'Rain',exact:true}).click();await expect(graph).toContainText('No history data');
});

test('stacked energy charts preserve negative contributions and energy flow composes standalone nodes/lines',async({page})=>{
 const bars=await mount(page,'luma-bar-chart',{stacked:true,series:[{name:'PV',data:[1,2]},{name:'Battery input',data:[-.5,-.2]}]});
 await expect(bars.locator('rect[role=img]')).toHaveCount(4);await expect(bars.getByRole('img',{name:'Battery input: -0.5',exact:false})).toHaveCount(1);
 const energy=await mount(page,'luma-energy-flow');await expect(energy.locator('luma-energy-node')).toHaveCount(6);await expect(energy.locator('luma-flow-line')).toHaveCount(8);
});

test('to-do editing, date navigation, and confirmation dialogs perform their actual actions',async({page})=>{
 const todo=await mount(page,'luma-todo',{items:[]});await todo.getByRole('textbox',{name:'New item'}).fill('Milk');await todo.getByRole('button',{name:'Add item'}).click();await expect(todo.getByRole('checkbox',{name:'Milk'})).toBeVisible();await todo.getByRole('checkbox',{name:'Milk'}).check();expect(await todo.evaluate((el:any)=>el.items[0].completed)).toBe(true);
 const range=await mount(page,'luma-date-range-picker',{value:{start:'2026-11-10',end:'2026-11-10'}});await range.getByRole('button',{name:'Next period'}).click();expect(await range.evaluate((el:any)=>el.value.start)).toBe('2026-11-11');
 const confirm=await mount(page,'luma-confirm-dialog',{open:true,label:'Confirm action'});await confirm.getByRole('button',{name:'Confirm',exact:true}).click();await expect(confirm.getByRole('dialog')).not.toBeVisible();expect(await page.evaluate(()=>(window as any).events.some((e:any)=>e.type==='luma-confirm'&&e.detail.confirmed))).toBe(true);
});

test('popup edits follow entity identity when rows are reordered',async({page})=>{
 const entities=await mount(page,'luma-entities',{entities:[{label:'Lamp A',state:'on',toggle:true,entityId:'light.a'},{label:'Lamp B',state:'on',toggle:true,entityId:'light.b'}]});
 await entities.getByRole('button',{name:'Lamp A',exact:true}).click();
 await entities.evaluate((el:any)=>el.entities=[...el.entities].reverse());
 await page.locator('luma-more-info[data-automatic]').getByRole('button',{name:'Toggle light'}).click();
 expect(await entities.evaluate((el:any)=>el.entities.find((e:any)=>e.entityId==='light.a').state)).toBe('off');expect(await entities.evaluate((el:any)=>el.entities.find((e:any)=>e.entityId==='light.b').state)).toBe('on');
});

test('device-specific controls emit their public property names and entity IDs',async({page})=>{
 const cases=[
  {tag:'luma-fan',property:'speed',label:'Speed'},
  {tag:'luma-humidifier',property:'humidity',label:'Target humidity'},
  {tag:'luma-valve',property:'position',label:'Position'},
  {tag:'luma-siren',property:'volume',label:'Volume'},
  {tag:'luma-input-number',property:'value',label:'Value'},
 ];
 for(const item of cases){
  const control=await mount(page,item.tag,{entityId:'test.device',state:'on'});
  await control.getByRole('slider',{name:item.label,exact:true}).press('End');expect(await control.evaluate((el:any,key)=>el[key],item.property)).toBe(100);
  const event=await page.evaluate(()=>(window as any).events.filter((e:any)=>e.type==='luma-change').at(-1));expect(event.detail).toMatchObject({property:item.property,value:100,entityId:'test.device'});
 }
 for(const [tag,label,action] of [['luma-vacuum','return home','return-home'],['luma-lock','unlock','unlock'],['luma-script','run','run'],['luma-automation','trigger','trigger'],['luma-lawn-mower','dock','dock'],['luma-update','install','install']] as const){
  const control=await mount(page,tag,{entityId:'test.device'});await control.getByRole('button',{name:label,exact:true}).click();const event=await page.evaluate(()=>(window as any).events.filter((e:any)=>e.type==='luma-action').at(-1));expect(event.detail).toMatchObject({action,entityId:'test.device'});
 }
});

test('alarm keypad masks codes and unavailable devices disable control input',async({page})=>{
 const alarm=await mount(page,'luma-alarm',{requireCode:true,state:'disarmed'});await expect(alarm.getByRole('button',{name:'Arm away'})).toBeDisabled();
 await alarm.getByRole('button',{name:'1',exact:true}).click();await alarm.getByRole('button',{name:'2',exact:true}).click();await expect(alarm.getByRole('button',{name:'Arm away'})).toBeEnabled();
 expect(await alarm.evaluate((el:any)=>el.code)).toBe('12');await expect(alarm.locator('luma-keypad output')).toHaveText('●●');await alarm.getByRole('button',{name:'Arm away'}).click();
 expect(JSON.stringify(await page.evaluate(()=>(window as any).events))).not.toContain('"code"');
 const fan=await mount(page,'luma-fan',{state:'unavailable'});await expect(fan.getByRole('slider',{name:'Speed'})).toBeDisabled();
});

test('form submission commits the last edited input without losing the submit click',async({page})=>{
 const form=await mount(page,'luma-form',{label:'Setup',fields:[{name:'name',label:'Device name',required:true}],data:{}});
 await form.getByRole('textbox',{name:'Device name'}).fill('Kitchen');
 await page.evaluate(()=>document.addEventListener('luma-submit',event=>(window as any).submitted=(event as CustomEvent).detail));
 await form.getByRole('button',{name:'Submit',exact:true}).click();await expect.poll(()=>page.evaluate(()=>(window as any).submitted)).toEqual({data:{name:'Kitchen'}});
});

test('touch taps operate the same standalone dial without mouse input',async({browser})=>{
 const context=await browser.newContext({hasTouch:true,baseURL:'http://127.0.0.1:4186'});const page=await context.newPage();await fixture(page);
 const control=await mount(page,'luma-thermostat',{temperature:21});const point=await dialPoint(page,25);await page.touchscreen.tap(point.x,point.y);await expect.poll(()=>control.evaluate((el:any)=>el.temperature)).toBe(25);await context.close();
});

test('tile feature values and details share the same source properties',async({page})=>{
 const tile=await mount(page,'luma-tile',{label:'Spotlight',entityId:'light.spotlight',state:'on',features:[{type:'light-brightness',config:{value:35}}]});
 await tile.getByRole('button',{name:'Spotlight',exact:true}).click();const popup=page.locator('luma-more-info[data-automatic]');
 await expect(popup.getByRole('slider',{name:'Brightness',exact:true})).toHaveValue('35');
 await popup.getByRole('slider',{name:'Brightness',exact:true}).press('End');
 expect(await tile.evaluate((el:any)=>el.features[0].config.value)).toBe(100);
});

test('keyboard focus survives repeated thermostat updates inside an open details dialog',async({page})=>{
 const tile=await mount(page,'luma-tile',{label:'Climate',domain:'climate',entityId:'climate.room',state:'heating',detailProperties:{temperature:21,currentTemperature:20.8}});
 await tile.getByRole('button',{name:'Climate',exact:true}).click();const popup=page.locator('luma-more-info[data-automatic]');
 const increase=popup.getByRole('button',{name:'Increase Target',exact:true});await increase.focus();await page.keyboard.press('Enter');await expect(increase).toBeFocused();await page.keyboard.press('Enter');await expect(increase).toBeFocused();
 expect(await popup.locator('luma-thermostat').evaluate((el:any)=>el.temperature)).toBe(22);
});

test('numeric controls accept direct valid input and keypad supports physical digit/backspace keys',async({page})=>{
 const number=await mount(page,'luma-number',{label:'Target',value:21,min:7,max:35,step:.5});
 const input=number.getByRole('spinbutton',{name:'Target'});await input.fill('22.5');await input.press('Tab');expect(await number.evaluate((el:any)=>el.value)).toBe(22.5);
 await input.fill('90');await input.press('Tab');expect(await number.evaluate((el:any)=>el.value)).toBe(22.5);await expect(input).toHaveValue('22.5');
 const keypad=await mount(page,'luma-keypad',{label:'PIN'});await keypad.getByRole('group',{name:'PIN'}).focus();await page.keyboard.type('1234');await expect.poll(()=>keypad.evaluate((el:any)=>el.value)).toBe('1234');await page.keyboard.press('Backspace');await expect.poll(()=>keypad.evaluate((el:any)=>el.value)).toBe('123');
});

test('unknown buttons accept press commands and unavailable entities retain inspectable details',async({page})=>{
 const tile=await mount(page,'luma-tile',{label:'Doorbell',domain:'button',entityId:'button.doorbell',state:'unknown'});
 await tile.getByRole('button',{name:'Doorbell',exact:true}).click();const popup=page.locator('luma-more-info[data-automatic]');
 await popup.getByRole('button',{name:'press',exact:true}).click();
 expect(await page.evaluate(()=>(window as any).events.filter((e:any)=>e.type==='luma-action').at(-1).detail)).toMatchObject({action:'press',entityId:'button.doorbell'});
 await page.keyboard.press('Escape');
 const unavailable=await mount(page,'luma-tile',{label:'Offline fan',domain:'fan',entityId:'fan.offline',state:'unavailable'});
 await unavailable.getByRole('button',{name:'Offline fan',exact:true}).click();
 await expect(popup.getByRole('slider',{name:'Speed'})).toBeDisabled();
 await page.keyboard.press('Escape');
 await unavailable.getByRole('button',{name:'More information about Offline fan'}).click();await expect(popup.locator('dialog')).toBeVisible();
});

test('dial focus stays on its handle and current-to-target segment has full accent opacity',async({page})=>{
 const control=await mount(page,'luma-thermostat',{temperature:22.5,currentTemperature:20.8,showCurrentMarker:true});
 const slider=control.getByRole('slider',{name:'Target temperature',exact:true});await slider.focus();
 await expect(slider).toHaveCSS('outline-style','none');
 const arc=control.locator('luma-dial luma-arc');const difference=arc.locator('#difference');
 await expect(difference).toBeVisible();await expect(difference).toHaveCSS('opacity','1');await expect(arc.locator('#fill')).toHaveCSS('opacity','0.5');
 expect(Number((await difference.getAttribute('stroke-dasharray'))!.split(' ')[0])).toBeCloseTo(1.7/28*100);
 await expect(arc.locator('[part=thumb]')).toHaveCSS('stroke-width','5px');
 const point=await dialPoint(page,24);await page.mouse.click(point.x,point.y);await expect(slider).toHaveCSS('outline-style','none');
 await expect(arc.locator('[part=thumb]')).toBeVisible();
});

test('vertical slider marker remains visible and follows native pointer and keyboard values',async({page})=>{
 const control=await mount(page,'luma-color-temperature',{value:3000,min:2000,max:6500});const slider=control.getByRole('slider',{name:'Color temperature'});
 const marker=control.locator('luma-vertical-slider [part=thumb]');await expect(marker).toBeVisible();const start=await marker.boundingBox();
 await slider.press('End');await expect(slider).toHaveValue('6500');const end=await marker.boundingBox();expect(end!.y).toBeGreaterThan(start!.y);
 await expect(marker).toHaveCSS('height','4px');await expect(marker).toHaveCSS('opacity','1');
});
