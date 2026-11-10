# Luma Elements

Home automation web components inspired by the [Home Assistant Lovelace demo](https://demo.home-assistant.io/#/lovelace/home). Built with the real [`@node-projects/base-custom-webcomponent`](https://github.com/node-projects/base-custom-webcomponent) base class. No other runtime libraries, backend coupling, external fonts, icon services, or charting dependencies.

The library includes standalone controls, composed device/dashboard cards, interactive charts, and automatic entity detail popups. All elements receive data through properties or attributes. It is an independent implementation: backend service connections, the Lovelace configuration editor, and server-specific stream negotiation belong to the host application. The full generated component/property inventory is in [docs/API.md](docs/API.md), and [docs/COVERAGE.md](docs/COVERAGE.md) maps dashboard cards, all 53 public tile feature types, and entity detail domains to their components.

## Run the gallery

Requires Node.js 22 or newer.

```sh
npm install
npm run dev
```

Open **http://127.0.0.1:4186**. The gallery includes Home and Energy demos, all components grouped into primitives/layout/devices/cards/popups, searchable categories, copyable examples, property/attribute descriptions, live domain-specific popup examples, and light/dark/system themes. All values in the gallery are sample data.

```sh
npm run check                  # TypeScript validation
npx playwright install chromium
npm test                       # Build + browser integration tests
npm run build                  # ESM modules, types, bundle, manifest, Pages site
npm pack --dry-run             # Inspect the publishable package
```

## Use in an application

The package is prepared for publication as `@node-projects/luma-elements`; a registry release is required before `npm install @node-projects/luma-elements` works. Until then, build this checkout and install its tarball (`npm pack`), or copy `dist/luma-elements.js` and `dist/themes.css` to your application.

With a bundler:

```js
import '@node-projects/luma-elements';
import '@node-projects/luma-elements/themes.css';
```

Without a bundler (the bundle includes BaseCustomWebComponent):

```html
<link rel="stylesheet" href="./themes.css">
<script type="module" src="./luma-elements.js"></script>

<luma-tile label="Reading lamp" icon="light" state="on" toggle
  entity-id="light.reading"></luma-tile>
```

## Representative components

| Primitives | Composed cards | Layout and content |
| --- | --- | --- |
| `luma-icon` | `luma-tile` | `luma-card` |
| `luma-button` | `luma-entities` | `luma-heading` |
| `luma-switch` | `luma-glance` | `luma-grid` |
| `luma-slider` | `luma-light` | `luma-stack` |
| `luma-number` | `luma-thermostat` | `luma-text` |
| `luma-select` | `luma-cover` | `luma-picture` |
| `luma-badge` | `luma-media-player` | |
| `luma-entity-row` | `luma-weather` | |
| | `luma-alarm` | |
| | `luma-button-card` | |
| | `luma-sensor` | |
| | `luma-gauge` | |
| | `luma-history` | |

The gallery's **Properties & attributes** disclosure under every example is the complete property reference; the same reference is available in [docs/API.md](docs/API.md). `custom-elements.json` contains the same descriptions in Custom Elements Manifest format for editor integrations. `dist/*.d.ts` provides TypeScript declarations, including `HTMLElementTagNameMap` entries. Definitions and defaults live beside each implementation in `src/`.

## Properties and attributes

Simple values accept both properties and attributes. Camel-case properties use kebab-case attributes: `currentTemperature` corresponds to `current-temperature`. Updates are batched into microtasks. Properties set before the element is upgraded are preserved.

Arrays and objects accept properties or JSON attributes. Replace an array/object to trigger an update; mutating it in place does not trigger rendering. Removing an attribute restores its default. Invalid JSON, incorrect top-level JSON types, and non-finite numeric attributes preserve the previous value and emit `luma-error`.

```html
<luma-entities id="room" label="Living room"
  entities='[{"label":"Lamp","state":"on","toggle":true}]'>
</luma-entities>

<luma-history id="power" label="Power" unit="W"></luma-history>
```

```js
const room = document.querySelector('#room');
room.entities = [{
  label: 'Floor lamp', state: 'on', icon: 'light',
  toggle: true, entityId: 'light.floor_lamp'
}];

const power = document.querySelector('#power');
power.series = [{
  name: 'Consumption', color: '#03a9f4',
  data: [
    { x: '2026-11-10T08:00:00Z', y: 420 },
    { x: '2026-11-10T09:00:00Z', y: 650 },
    { x: '2026-11-10T11:00:00Z', y: 510 }
  ]
}];
```

History series also accept plain number arrays, plotted by index. Standalone `luma-line-chart` supports stepped/linear traces, area fills, mouse-hover values, keyboard point inspection, legends, and time-range selection. `{x, y}` points use a numeric x coordinate or ISO timestamp. Time gaps are plotted proportionally. Invalid/non-finite points are skipped; empty data shows an empty state. Keep the same x-coordinate representation across series in a chart.

Boolean attributes follow standard HTML presence semantics. `disabled="false"` is still disabled. Use `element.disabled = false` or remove the attribute. Property assignment does not reflect back to attributes; properties represent current state after interaction.

## Events and backend integration

| Event | Detail | Meaning |
| --- | --- | --- |
| `luma-change` | `{ property, value, entityId }` | A committed local value change. |
| `luma-input` | `{ property: 'value', value }` | Live slider input, before commitment. |
| `luma-action` | `{ action, entityId }` | Request to perform a command or open details. |
| `luma-error` | `{ attribute, value, message }` | Invalid attribute input. |

Events bubble and cross shadow boundaries. `luma-action` is cancelable: `more-info` opens an automatic domain-specific popup unless your handler calls `event.preventDefault()`. You can also use `luma-dialog`, `luma-more-info`, and `luma-confirm-dialog` directly. Escape and backdrop clicks dismiss native modals; focus returns to the trigger. Composed cards translate child changes to their own properties: a thermostat's number control emits one `temperature` change carrying the thermostat's entity ID; an entities card emits the updated `entities` array. Entity commands bubble with the selected row's ID.

```js
document.addEventListener('luma-change', ({ target, detail }) => {
  // e.g. { property: 'brightness', value: 65, entityId: 'light.reading' }
  // Persist with your own backend adapter, then assign authoritative values.
  console.log(target, detail);
});

document.addEventListener('luma-action', ({ detail }) => {
  // more-info, press, open, stop, close, previous, next,
  // arm-home, arm-away, arm-night, disarm
  console.log(detail.action, detail.entityId);
});
```

Switches, sliders, numeric controls, selects, tiles, lights, and media play/pause update their local values. Cover open/stop/close and alarm commands emit requests without assuming successful device operation. Connect your backend and assign the actual state yourself. Components never call Home Assistant APIs or store credentials.

## Styling and themes

Load `themes.css`, then set `data-theme="light"` or `data-theme="dark"` on any ancestor. Omitting both follows `prefers-color-scheme`. Variables inherit through nested Shadow DOM, so a theme applies to composed controls too. Override individual variables after importing the stylesheet.

| Variable | Light default | Purpose |
| --- | --- | --- |
| `--luma-primary` | `#03a9f4` | Primary controls and emphasis |
| `--luma-on-primary` | `#fff` | Text on primary buttons |
| `--luma-background` | `#fafafa` | Application background |
| `--luma-card-background` | `#fff` | Card surface |
| `--luma-text` | `#212121` | Primary text |
| `--luma-secondary-text` | `#727272` | Secondary text |
| `--luma-border` | `#e0e0e0` | Card and control outlines |
| `--luma-border-width` | `1px` | Card border width |
| `--luma-control-background` | `#f0f0f0` | Control surface |
| `--luma-switch-track` | `#bdbdbd` | Inactive switch track |
| `--luma-radius` | `12px` | Card corner radius |
| `--luma-shadow` | subtle shadow | Card shadow |
| `--luma-font` | `Roboto, Arial, sans-serif` | Font stack (no font is downloaded) |
| `--luma-title-size` | `20px` | Card title font size |

```css
.my-dashboard {
  --luma-primary: #00897b;
  --luma-radius: 16px;
  --luma-font: system-ui, sans-serif;
}
luma-tile::part(card) { border-width: 2px; }
luma-switch::part(thumb) { box-shadow: none; }
```

All components expose `root`. Surfaces expose `card`, with additional parts where applicable: `title`, `name`, `state`, `icon`, `content`, `button`, `switch`, `thumb`, `slider`, `control`, `heading`, `row`, `grid`, `stack`, `dial`, `chart`, `empty`, `gauge`, `value`, and `image`. CSS variables are the shared styling API across composed controls; a `::part()` selector targets that element's own shadow tree.

Custom icons can be supplied through `slot="icon"` on entity rows, tiles, and button cards. `luma-icon` accepts SVG in its default slot. `luma-card`, `luma-stack`, and `luma-grid` accept slotted content. `luma-text` escapes its content property; use its default slot for application-controlled rich HTML. `luma-picture` accepts relative, HTTP(S), and blob image URLs, and an `alt` description.

Controls use native buttons, range inputs, and selects, accessible names, visible focus indicators, and disabled states. Composed updates preserve keyboard focus. SVG charts have accessible labels and point tooltips. History charts support arrow/Home/End point inspection, mouse-hover tooltips, drag-to-zoom, and Escape to reset the range.

## GitHub Pages

`.github/workflows/pages.yml` builds and browser-tests the library, uploads `site/`, and deploys the gallery on a push to `main` or `master` (or a manual dispatch). Pull requests build and test without deployment.

1. Push these changes to the repository.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Run **Build, test, and deploy component gallery** if it has not run automatically.

The resulting repository Pages URL will normally be `https://node-projects.github.io/luma-elements/`. Assets and navigation are relative, so the gallery works under the repository subpath. This URL is not live until the workflow is enabled and successfully deployed.


## Standalone controls, composed cards, and popups

Low-level controls are exported as real custom elements: `luma-arc`, `luma-dial`, `luma-temperature-value`, `luma-color-wheel`, `luma-color-picker`, `luma-color-swatches`, `luma-color-temperature`, `luma-brightness`, `luma-dropdown`, `luma-line-chart`, `luma-sparkline`, `luma-bar-chart`, `luma-gauge-arc`, `luma-energy-node`, `luma-flow-line`, `luma-data-table`, and others. Cards compose those controls; their SVG/input implementations are not embedded copies.

```html
<luma-dial value="21" min="7" max="35" step="0.5" unit="°C"></luma-dial>
<luma-color-picker value="#ffa24d"></luma-color-picker>
<luma-thermostat temperature="22.5" current-temperature="20.8"
  precision="1" locale="de" show-current-temperature show-current-marker>
</luma-thermostat>
```

`luma-temperature-value` reserves the integer, decimal, and unit columns, uses tabular numerals, and never auto-fits its font. `precision="1"` retains the decimal column for both whole and fractional temperatures. `locale="de"` uses a comma. Thermostats expose `showCurrentTemperature`, `showCurrentMarker`, `showCurrentAsPrimary`, `stateLabel`, presets, fan modes, swing modes, and paired low/high target temperatures. The dial supports mouse/touch drag, keyboard steps/Home/End, pointer cancellation, and bounds.

Entity content opens details; supported tile icons toggle independently. `tapAction`, `iconTapAction`, `holdAction`, and `doubleTapAction` customize those gestures. `disabled` prevents interaction. `unavailable` disables device controls while keeping entity details accessible; `unknown` entities can still accept commands. Dialogs use native top-layer focus trapping, Escape/backdrop dismissal, and trigger-focus restoration. Property changes keep the open dialog stable. Domain-specific edits are sent back through the source component's normal event path, including rows recreated by a parent.

Light capabilities are declared through `colorModes` (`brightness`, `rgb`/`hs`/`xy`, `color_temp`, etc.). The popup composes a tall brightness slider, hue/saturation wheel, kelvin gradient, compact mode toolbar, optional swatches, and supported effects. Editing a color/brightness while off requests the new value and previews the light as on. Browser-supported screen eyedropper selection is optional.

```js
const tile = document.querySelector('luma-tile');
tile.entityId = 'light.spotlights';
tile.features = [
  { type: 'light-brightness', config: { value: 65 } },
  { type: 'light-color-temp', config: { value: 3000, vertical: false } }
];
tile.detailProperties = { rgbColor: '#ffa24d', effects: ['none', 'relax'] };
```

Feature values and legacy embedded tile values are shared with the details view. Every public feature kind is mapped in `featureControls`; the wrapper's `config` is passed to an independently usable underlying control.

## Designer manifest

`custom-elements.json` is a Custom Elements Manifest with actual compiled module paths. For example, `luma-dial` points to `dist/controls.js` and its exported `LumaDial`; it does not pretend every class is declared in the entry point or point to TypeScript source. Modules include class exports and tag registrations, inheritance, typed/described fields, associated attributes, defaults, events, methods, slots, CSS parts and theme variables. The npm export map exposes the designer-facing `dist/*.js` modules.

The gallery ships the same unbundled modules and an import map for BaseCustomWebComponent, alongside its self-contained demo bundle. Designer integration can resolve each module path relative to the package manifest. Use either the unbundled entry/modules or the standalone bundle in a given document, so the browser sees one set of constructors.

Browser checks import every definition's actual module, compare its exported constructor with the registration, and check all module paths/attribute-field associations. The manifest is regenerated by `npm run build`.

## Builds and npm releases

See [docs/RELEASING.md](docs/RELEASING.md). Push/PR builds test and pack the library. Publishing a GitHub release runs `release.yml`, derives the npm version from its semantic release tag, builds/tests that version, attaches the exact `.tgz` and checksum to the release, and publishes that tarball to npm. Stable versions use `latest`; prereleases use `next`. Configure npm trusted publishing for `node-projects/luma-elements`, workflow `release.yml`, or supply `NPM_TOKEN` for an initial bootstrap publish.

## Project structure

- `src/`: base, property metadata, primitive controls, composed cards, SVG charts, icons, and themes.
- `docs/`: gallery source and local room illustration.
- `scripts/`: TypeScript/bundle/site assembly and static preview server.
- `tests/`: browser integration coverage for values, events, composition, charts, keyboard interaction, themes, and responsive layouts.
- `dist/`: generated library modules, declarations, source maps, and self-contained browser bundle.
- `site/`: generated GitHub Pages artifact.

MIT. See `THIRD_PARTY_NOTICES.md` for the bundled base library's BSD-3-Clause license and design attribution.

The [interaction audit](docs/INTERACTION_AUDIT.md) records hover, focus, drag and popup behavior against the Home Assistant references. `luma-chart-navigator` is independently usable; line/history charts include it by default (`show-navigator` / `showNavigator`). Its `value` is a `{start,end}` object, in the same units as `min` and `max`.
