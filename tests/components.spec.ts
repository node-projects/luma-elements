import {test,expect} from '@playwright/test';

test('all registered components render without browser errors',async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/#components');
  const count=Number(await page.locator('#component-count').textContent());expect(count).toBeGreaterThan(100);await expect(page.locator('.specimen')).toHaveCount(count);
  const result=await page.evaluate(async()=>{
    const {catalog,LumaElement}=await import('/assets/luma-elements.js' as string);
    await new Promise(requestAnimationFrame);
    return catalog.map((entry:{tag:string})=>{const element=document.querySelector('.specimen-preview '+entry.tag) as HTMLElement;return {tag:entry.tag,base:element instanceof LumaElement,rendered:!!element.shadowRoot?.querySelector('#root')?.childElementCount};});
  });
  expect(result.every((r:{base:boolean;rendered:boolean})=>r.base&&r.rendered)).toBe(true);
  expect(errors).toEqual([]);
});

test('properties set before upgrade survive and reactive attributes handle removal and invalid JSON',async({page})=>{
  await page.goto('/');
  const result=await page.evaluate(async()=>{
    const events:unknown[]=[];
    // Define a fresh subclass so pre-upgrade assignment is exercised after library load.
    const {LumaEntities}=await import('/assets/luma-elements.js' as string);
    const element=document.createElement('test-upgrade') as any;
    element.entities=[{label:'Before upgrade',state:'on'}];document.body.append(element);
    customElements.define('test-upgrade',class extends LumaEntities{});
    await new Promise(requestAnimationFrame);
    const survived=element.entities[0].label;
    element.addEventListener('luma-error',(e:CustomEvent)=>events.push(e.detail));
    element.setAttribute('entities','[{"label":"After attribute","state":"off"}]');
    const updated=element.entities[0].label;
    element.setAttribute('entities','not json');
    const preserved=element.entities[0].label;
    element.removeAttribute('entities');
    element.setAttribute('disabled','false');const disabled=element.disabled;
    element.removeAttribute('disabled');
    return {survived,updated,preserved,reset:element.entities,events,disabled,enabled:!element.disabled};
  });
  expect(result).toMatchObject({survived:'Before upgrade',updated:'After attribute',preserved:'After attribute',reset:[],disabled:true,enabled:true});
  expect(result.events).toHaveLength(1);
});

test('switch supports keyboard and disabled state; events cross shadow boundaries',async({page})=>{
  await page.goto('/#components');
  const specimen=page.locator('#luma-switch');const control=specimen.getByRole('switch');
  await expect(control).toHaveAttribute('aria-checked','true');await control.press('Space');
  await expect(control).toHaveAttribute('aria-checked','false');
  await expect(page.locator('#last-event')).toContainText('luma-change');
  await page.locator('#luma-switch luma-switch').evaluate((el:any)=>el.disabled=true);
  await expect(control).toBeDisabled();
});

test('composed card changes contain parent property and entity id exactly once',async({page})=>{
  await page.goto('/');
  await page.evaluate(()=>{(window as any).testEvents=[];document.addEventListener('luma-change',e=>(window as any).testEvents.push((e as CustomEvent).detail));});
  const thermostat=page.locator('#dashboard-view luma-thermostat');
  await thermostat.getByRole('button',{name:'Increase Target'}).click();
  await expect.poll(()=>thermostat.evaluate((el:any)=>el.temperature)).toBe(21.5);
  const events=await page.evaluate(()=>(window as any).testEvents);
  expect(events).toEqual([{property:'temperature',value:21.5,entityId:'climate.downstairs'}]);
  await page.locator('#home-entities').getByRole('switch',{name:'Toggle all Around the house'}).click();
  expect(await page.locator('#home-entities').evaluate((el:any)=>el.entities.filter((e:any)=>e.toggle).every((e:any)=>e.state==='off'))).toBe(true);
});

test('sliders, selects, and command controls emit usable events',async({page})=>{
  await page.goto('/#components');
  await page.evaluate(()=>{(window as any).testEvents=[];for(const type of ['luma-change','luma-input','luma-action'])document.addEventListener(type,e=>(window as any).testEvents.push({type,detail:(e as CustomEvent).detail}));});
  await page.locator('#luma-slider').getByRole('slider').press('ArrowRight');
  await expect.poll(()=>page.locator('#luma-slider luma-slider').evaluate((el:any)=>el.value)).toBe(66);
  await page.locator('#luma-select').getByRole('combobox').selectOption('cool');
  await page.locator('#luma-cover').getByRole('button',{name:'open',exact:true}).click();
  await page.locator('#luma-alarm').getByRole('button',{name:'Arm away'}).click();
  const events=await page.evaluate(()=>(window as any).testEvents);
  expect(events).toEqual(expect.arrayContaining([
    expect.objectContaining({type:'luma-input',detail:{property:'value',value:66}}),
    expect.objectContaining({type:'luma-change',detail:expect.objectContaining({property:'value',value:'cool'})}),
    expect.objectContaining({type:'luma-action',detail:expect.objectContaining({action:'open'})}),
    expect.objectContaining({type:'luma-action',detail:expect.objectContaining({action:'arm-away'})}),
  ]));
});

test('untrusted text and unsafe image URLs remain inert',async({page})=>{
  await page.goto('/#components');
  const result=await page.evaluate(async()=>{
    const text=document.querySelector('#luma-text luma-text') as any;
    text.content='<img src=x onerror="window.__unsafe=true">';
    const picture=document.querySelector('#luma-picture luma-picture') as any;
    picture.src='javascript:alert(1)';
    await new Promise(requestAnimationFrame);
    return {inert:!text.shadowRoot.querySelector('img'),text:text.shadowRoot.textContent,src:picture.shadowRoot.querySelector('img')?.getAttribute('src')};
  });
  expect(result.inert).toBe(true);expect(result.text).toContain('<img');expect(result.src).toBeUndefined();
});

test('charts update via properties and JSON attributes and handle empty or constant data',async({page})=>{
  await page.goto('/#components');
  const graph=page.locator('#luma-history luma-history');
  await graph.evaluate((el:any)=>el.series=[{name:'Constant',data:[5,5,5]}]);
  await expect(graph.locator('polyline')).toHaveCount(1);
  expect(await graph.locator('polyline').getAttribute('points')).not.toMatch(/NaN|Infinity/);
  await graph.evaluate(el=>el.setAttribute('series','[]'));
  await expect(graph).toContainText('No history data');
  await graph.evaluate(el=>el.setAttribute('series','[{"name":"Room","data":[{"x":"2026-11-10T08:00:00Z","y":20},{"x":"2026-11-10T09:00:00Z","y":22},{"x":"2026-11-10T11:00:00Z","y":21}]}]'));
  await expect(graph.locator('circle')).toHaveCount(3);
  const xs=await graph.locator('circle').evaluateAll(nodes=>nodes.map(node=>Number(node.getAttribute('cx'))));
  expect((xs[2]-xs[1])/(xs[1]-xs[0])).toBeCloseTo(2);
});

test('gallery search, category filters, routes, and persisted themes work',async({page})=>{
  await page.goto('/#components');
  await page.getByRole('searchbox').fill('thermostat');
  await expect(page.locator('#luma-thermostat')).toBeVisible();
  await page.getByRole('searchbox').fill('');
  await page.getByRole('button',{name:'Layout',exact:true}).click();await expect(page.locator('.specimen:visible')).toHaveCount(7);
  await page.getByRole('combobox',{name:'Color theme'}).selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  const color=await page.locator('#luma-tile luma-tile').evaluate(el=>getComputedStyle(el).getPropertyValue('--luma-card-background').trim());expect(color).toBe('#1c1c1c');
  await page.getByRole('link',{name:'Getting started',exact:true}).click();await expect(page.locator('#usage-view')).toBeVisible();
});

test('mobile dashboard and collection fit the viewport in both themes',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  for(const theme of ['light','dark'])for(const view of ['dashboard','energy','components','usage']){
    await page.goto('/#'+view);await page.getByRole('combobox',{name:'Color theme'}).selectOption(theme);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});

test('keyboard focus survives repeated composed-card updates',async({page})=>{
  await page.goto('/');
  const thermostat=page.locator('#dashboard-view luma-thermostat');
  const increase=thermostat.getByRole('button',{name:'Increase Target'});
  await increase.focus();await page.keyboard.press('Enter');
  await expect(increase).toBeFocused();
  await page.keyboard.press('Enter');await expect(increase).toBeFocused();
  expect(await thermostat.evaluate((el:any)=>el.temperature)).toBe(22);
});
