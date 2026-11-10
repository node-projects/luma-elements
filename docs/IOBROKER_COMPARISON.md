# ioBroker widget comparison

Audited 2026-11-10 against the repositories linked below. This is a comparison of UI capabilities, not an ioBroker adapter or a promise to interpret VIS project files. Luma uses its own Home Assistant-inspired surfaces, typography, theme tokens, hover/focus states and event model. No ioBroker source code, artwork or runtime dependencies were incorporated.

## Sources and scope

- [VIS 2 repository](https://github.com/ioBroker/ioBroker.vis-2), particularly its [standard widget catalog](https://github.com/ioBroker/ioBroker.vis-2/blob/master/packages/iobroker.vis-2/docs/widgets-standard.md) and [jQui catalog](https://github.com/ioBroker/ioBroker.vis-2/blob/master/packages/iobroker.vis-2/docs/widgets-jQui.md).
- [Inventwo repository requested](https://github.com/inventwo/ioBroker.vis-inventwo), its README, [widget templates](https://github.com/inventwo/ioBroker.vis-inventwo/blob/master/widgets/vis-inventwo.html), and [wiki](https://github.com/inventwo/ioBroker.vis-inventwo/wiki).

The linked Inventwo package targets VIS 1. Its README explicitly says versions from 4.1.x are incompatible with VIS 2 and points to the separate [VIS 2 Inventwo package](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo). The Inventwo inventory here is for the package requested, not that successor or the entire ecosystem of third-party VIS adapters.

## VIS 2 standard catalog

The 27 standard device types have card and/or marker presentations. Equivalent presentation variants use properties and layouts in Luma rather than separate aliases for each size.

| VIS 2 standard type | Luma mapping | Assessment |
| --- | --- | --- |
| Switch | `luma-switch`, `luma-control-switch`, `luma-switch-card` | Existing |
| Dimmer | `luma-slider`, `luma-brightness`, `luma-light` | Existing |
| Colour light | `luma-light-controls`, `luma-color-picker`, `luma-light` | Existing |
| Thermostat | `luma-dial`, `luma-thermostat` | Existing |
| Knob | `luma-dial` | Existing generic circular value input |
| Measured value | `luma-sensor`, `luma-entity`, `luma-gauge` | Existing |
| Input | text, number, select, date, time and datetime controls/cards | Existing |
| Fill level | `luma-level-indicator`, `luma-tank` | Added standalone measured scale and composed card |
| Sensor | `luma-tile`, `luma-badge`, `luma-entity-row` | Existing state display |
| Window or door | `luma-opening-indicator`, `luma-opening` | Added closed/open/tilted illustration with hinge direction |
| Weather | `luma-weather` | Existing |
| Alarm system | `luma-alarm`, `luma-keypad` | Existing; application validates codes |
| Blind | `luma-cover`, `luma-cover-controls` | Existing position and tilt controls |
| Lock | `luma-lock` | Existing |
| Camera | `luma-camera` | Existing browser media surface |
| Vacuum robot | `luma-vacuum` | Existing |
| Player | `luma-media-player`, `luma-media-controls` | Existing |
| Washer/dryer | `luma-progress-ring`, `luma-appliance` | Added cycle/program/progress/remaining-time display; also dishwasher |
| Button | `luma-button`, `luma-command-bar`, `luma-scene` | Existing; added `luma-momentary-button` for hold/release |
| List | `luma-entities`, `luma-glance`, `luma-select`, `luma-radio-group` | Existing data/selection lists plus added native radio group |
| Table | `luma-data-table` | Existing supplied columns/rows |
| Chart | `luma-line-chart`, `luma-bar-chart`, `luma-sparkline` | Existing history and statistics |
| Clock | `luma-clock`, `luma-analog-clock` | Existing digital; added analog with timezone |
| Page tile | `luma-shortcut`, `luma-tabs`, layout components | Existing navigation requests; host supplies pages |
| Text | `luma-markdown`, `luma-text-field` | Existing static/editable text; added `luma-marquee` |
| Web page | `luma-webpage` | Existing iframe surface |
| Theme switcher | `luma-theme-selector` | Added light/dark/system value selector; host applies theme scope |

The jQui catalog also contains momentary buttons, radio selection, horizontal/vertical sliders, text/date/time inputs, increments, navigation and dialogs. Existing Luma controls cover those families; the new momentary button and radio group close the useful input gaps. Adapter-specific write expressions and object bindings remain application code.

## Inventwo templates

The requested HTML contains 24 template IDs, including retained legacy versions and small-size variants. Their useful families map as follows; separate legacy/small aliases add no new behavior to a property-driven library.

| Inventwo template IDs | Luma mapping |
| --- | --- |
| `i-vis-universal`, `i-vis-multi` | `luma-tile`, `luma-device`, `luma-grid`, `luma-stack`, `luma-picture-elements`; new state-image and analog clock parts |
| `i-vis-slider-simple`, `i-vis-slider-simple-2` | `luma-slider`, `luma-vertical-slider`, `luma-number` |
| `i-vis-slider-color-hor`, `i-vis-slider-color-vert` | `luma-color-temperature`, `luma-vertical-slider`, `luma-light-controls` |
| `i-vis-color-picker` | `luma-color-picker`, `luma-color-wheel`, `luma-color-swatches` |
| `i-vis-image-new`, `i-vis-image` | `luma-picture`, `luma-picture-entity`; added `luma-state-image` for explicit state-to-image mapping |
| `i-vis-jsontable` | `luma-data-table` with supplied JSON rows/columns |
| `i-vis-radiobutton-list` | Added `luma-radio-group` |
| `i-vis-valuelist` | `luma-select`, `luma-dropdown`, `luma-entities` |
| `i-vis-marquee` | Added `luma-marquee`, with pause controls and reduced-motion handling |
| `i-vis-switch-1`, `i-vis-switch-basic`, `i-vis-switch`, `i-vis-switch-small` | `luma-switch`, `luma-control-switch`, `luma-switch-card` |
| `i-vis-checkbox` | `luma-checkbox` |
| `i-vis-button`, `i-vis-button-small` | `luma-button`, `luma-icon-button`, `luma-momentary-button` |
| `i-vis-navigation`, `i-vis-navigation-small` | `luma-shortcut`, `luma-tabs`; host handles destination/action events |
| `i-vis-background`, `i-vis-background-small` | `luma-card`, `luma-grid`, `luma-stack`, `luma-picture`, CSS custom properties |

## New reusable parts and composition

Eight new primitives are exposed independently: `luma-level-indicator`, `luma-opening-indicator`, `luma-progress-ring`, `luma-analog-clock`, `luma-radio-group`, `luma-momentary-button`, `luma-state-image`, and `luma-marquee`. `luma-tank`, `luma-opening`, and `luma-appliance` compose these parts with existing entity rows and command controls. `luma-theme-selector` composes the existing segmented control.

The device cards participate in automatic more-info dialogs. Additional routes are `tank`, `opening`, `appliance`, `washing_machine`, `dryer`, and `dishwasher`. Supply their data through `detailProperties` or the popup entity's `properties`, as with other device cards. The popup reuses the same components rather than a second implementation.

```js
const washer = document.createElement('luma-appliance');
Object.assign(washer, {
  entityId: 'appliance.laundry', label: 'Washing machine',
  state: 'running', program: 'Cotton · 40 °C',
  progress: 65, remainingMinutes: 42,
  commands: [{ action: 'pause', label: 'Pause', icon: 'pause' }]
});
washer.addEventListener('luma-action', event => {
  // Send the requested action to your backend. Supply its resulting state later.
  console.log(event.detail);
});
document.body.append(washer);
```

Momentary controls emit `luma-change` with `{property:'pressed', value:true|false, entityId}`. Handle both states. Release occurs on pointer up/cancel, lost capture, keyboard up, focus loss, replacement or disconnection; listen on the source element if it may be removed. Repeated keydown does not repeat the press. This is a UI input, not a substitute for backend timeout/fail-safe logic.

Theme selection emits a value; it deliberately leaves theme scoping to the application. Set `data-theme="light"` or `data-theme="dark"` on the chosen ancestor, or remove the attribute for system preference. State images accept explicit URL mappings, not executable templates. Marquees move only overflowing text and stop for hover/focus, explicit pause and reduced-motion preferences.

## Integration boundaries

VIS object IDs, two-way adapter subscriptions, conversions/formulas, scripts, authentication/PIN validation, page routing and server-specific media protocols belong to the host application. Luma accepts normalized data and emits user intent; it does not evaluate VIS JavaScript strings or open adapter connections. Numeric readings, program names, remaining times and finish timestamps must be supplied; the appliance card does not invent cycle progress or claim an action succeeded.

See [API.md](API.md) for all properties and [INTERACTION_AUDIT.md](INTERACTION_AUDIT.md) for interaction verification.
