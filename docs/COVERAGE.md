# Home Assistant UI coverage

Reference audit: 2026-11-10. This inventory distinguishes UI coverage from backend integration. The library has 124 registered components; its complete property reference is [API.md](API.md).

Sources: [Lovelace cards](https://www.home-assistant.io/dashboards/cards/), [public feature registry](https://github.com/home-assistant/frontend/blob/dev/src/panels/lovelace/card-features/registry.ts), and [entity detail control inventory](https://github.com/home-assistant/frontend/tree/dev/src/dialogs/more-info/controls). The reference is Home Assistant's moving dev branch; future upstream additions are not automatically included.

## Dashboard card mappings

| Home Assistant UI pattern | Standalone library component |
| --- | --- |
| activity | `luma-activity` |
| alarm-panel | `luma-alarm` |
| alert | `luma-alert` |
| area | `luma-area` |
| button | `luma-button-card` |
| calendar | `luma-calendar` |
| clock | `luma-clock` |
| conditional | `luma-conditional` |
| date | `luma-date` |
| distribution | `luma-distribution` |
| energy | `luma-energy-dashboard` |
| entities | `luma-entities` |
| entity | `luma-entity` |
| entity-filter | `luma-entity-filter` |
| gauge | `luma-gauge` |
| glance | `luma-glance` |
| grid | `luma-grid` |
| heading | `luma-heading` |
| history-graph | `luma-history` |
| horizontal-stack | `luma-horizontal-stack` |
| humidifier | `luma-humidifier` |
| light | `luma-light` |
| map | `luma-map` |
| markdown | `luma-markdown` |
| media-control | `luma-media-player` |
| picture | `luma-picture` |
| picture-elements | `luma-picture-elements` |
| picture-entity | `luma-picture-entity` |
| picture-glance | `luma-picture-glance` |
| plant-status | `luma-plant` |
| sensor | `luma-sensor` |
| shortcut | `luma-shortcut` |
| statistic | `luma-statistic` |
| statistics-graph | `luma-statistics-graph` |
| thermostat | `luma-thermostat` |
| tile | `luma-tile` |
| todo-list | `luma-todo` |
| vertical-stack | `luma-vertical-stack` |
| weather-forecast | `luma-weather` |
| webpage | `luma-webpage` |

## Public tile features (53)

Each type is available independently through `<luma-feature type="…" config="…">`, and in a tile's `features` array. The controls in the second column are independently usable too. Config receives primitive properties; it is not a Lovelace YAML or backend-service parser.

| Feature type | Underlying standalone control |
| --- | --- |
| `alarm-modes` | `luma-command-bar` |
| `area-controls` | `luma-command-bar` |
| `bar-gauge` | `luma-progress` |
| `button` | `luma-button` |
| `climate-fan-modes` | `luma-dropdown` |
| `climate-hvac-modes` | `luma-dropdown` |
| `climate-preset-modes` | `luma-dropdown` |
| `climate-swing-horizontal-modes` | `luma-dropdown` |
| `climate-swing-modes` | `luma-dropdown` |
| `counter-actions` | `luma-command-bar` |
| `cover-open-close` | `luma-cover-controls` |
| `cover-position` | `luma-slider` |
| `cover-position-favorite` | `luma-segmented` |
| `cover-tilt` | `luma-command-bar` |
| `cover-tilt-favorite` | `luma-segmented` |
| `cover-tilt-position` | `luma-slider` |
| `date-set` | `luma-date-picker` |
| `fan-direction` | `luma-segmented` |
| `fan-oscillate` | `luma-control-switch` |
| `fan-preset-modes` | `luma-dropdown` |
| `fan-speed` | `luma-slider` |
| `humidifier-modes` | `luma-dropdown` |
| `humidifier-toggle` | `luma-control-switch` |
| `lawn-mower-commands` | `luma-command-bar` |
| `light-brightness` | `luma-slider` |
| `light-color` | `luma-color-picker` |
| `light-color-favorites` | `luma-color-swatches` |
| `light-color-temp` | `luma-color-temperature` |
| `light-effect` | `luma-dropdown` |
| `lock-commands` | `luma-command-bar` |
| `lock-open-door` | `luma-command-bar` |
| `media-player-playback` | `luma-media-controls` |
| `media-player-sound-mode` | `luma-dropdown` |
| `media-player-source` | `luma-dropdown` |
| `media-player-volume-buttons` | `luma-command-bar` |
| `media-player-volume-slider` | `luma-slider` |
| `numeric-input` | `luma-number` |
| `precipitation-forecast` | `luma-bar-chart` |
| `select-options` | `luma-dropdown` |
| `target-humidity` | `luma-slider` |
| `target-temperature` | `luma-number` |
| `temperature-forecast` | `luma-line-chart` |
| `timer-actions` | `luma-command-bar` |
| `timer-presets` | `luma-segmented` |
| `toggle` | `luma-control-switch` |
| `trend-graph` | `luma-line-chart` |
| `update-actions` | `luma-command-bar` |
| `vacuum-commands` | `luma-command-bar` |
| `vacuum-fan-speed` | `luma-dropdown` |
| `valve-open-close` | `luma-cover-controls` |
| `valve-position` | `luma-slider` |
| `valve-position-favorite` | `luma-segmented` |
| `water-heater-operation-modes` | `luma-dropdown` |

## Entity detail routes

All domain-specific entries in the audited Home Assistant more-info/controls directory have an explicit route below. Additional helper/read-only domains are included. A missing/unknown domain receives a read-only state/history/attributes panel.

| Domain | Control/view |
| --- | --- |
| `ai_task` | `luma-state-panel` |
| `air_quality` | `luma-state-panel` |
| `alarm_control_panel` | `luma-alarm` |
| `alert` | `luma-state-panel` |
| `assist_satellite` | `luma-conversation` |
| `automation` | `luma-automation` |
| `binary_sensor` | `luma-state-panel` |
| `button` | `luma-scene` |
| `calendar` | `luma-calendar` |
| `camera` | `luma-camera` |
| `climate` | `luma-thermostat` |
| `configurator` | `luma-form` |
| `conversation` | `luma-conversation` |
| `counter` | `luma-counter` |
| `cover` | `luma-cover` |
| `date` | `luma-input-date` |
| `datetime` | `luma-input-datetime` |
| `default` | `luma-state-panel` |
| `device_tracker` | `luma-state-panel` |
| `event` | `luma-state-panel` |
| `fan` | `luma-fan` |
| `geo_location` | `luma-map` |
| `group` | `luma-entities` |
| `humidifier` | `luma-humidifier` |
| `image` | `luma-picture` |
| `image_processing` | `luma-state-panel` |
| `input_boolean` | `luma-switch-card` |
| `input_button` | `luma-scene` |
| `input_datetime` | `luma-input-datetime` |
| `input_number` | `luma-input-number` |
| `input_select` | `luma-input-select` |
| `input_text` | `luma-input-text` |
| `lawn_mower` | `luma-lawn-mower` |
| `light` | `luma-light` |
| `lock` | `luma-lock` |
| `media_player` | `luma-media-player` |
| `notify` | `luma-input-text` |
| `number` | `luma-input-number` |
| `persistent_notification` | `luma-state-panel` |
| `person` | `luma-state-panel` |
| `plant` | `luma-plant` |
| `proximity` | `luma-state-panel` |
| `remote` | `luma-remote` |
| `scene` | `luma-scene` |
| `schedule` | `luma-state-panel` |
| `script` | `luma-script` |
| `select` | `luma-input-select` |
| `sensor` | `luma-state-panel` |
| `siren` | `luma-siren` |
| `stream` | `luma-camera` |
| `stt` | `luma-state-panel` |
| `sun` | `luma-state-panel` |
| `switch` | `luma-switch-card` |
| `tag` | `luma-state-panel` |
| `text` | `luma-input-text` |
| `time` | `luma-input-time` |
| `timer` | `luma-timer` |
| `todo` | `luma-todo` |
| `tts` | `luma-state-panel` |
| `update` | `luma-update` |
| `vacuum` | `luma-vacuum` |
| `valve` | `luma-valve` |
| `wake_word` | `luma-state-panel` |
| `water_heater` | `luma-water-heater` |
| `weather` | `luma-weather` |
| `weather_forecast` | `luma-weather` |
| `zone` | `luma-state-panel` |

## Interaction checks

See [INTERACTION_AUDIT.md](INTERACTION_AUDIT.md) for the visual-state review, reference sources, and verification boundaries.

The browser suite exercises pointer drag/cancel, touch input, keyboard limits, dual set points, fixed decimal typography, current/target display options, popover menus, color-wheel dragging, color swatches/hex validation, light capabilities and off-state changes, automatic details, cancellation, nested edit routing, modal focus/dismissal, step/filled history graphs, tooltips, legends, zoom, signed energy bars, to-do editing, forms, dates, keypad masking, and device commands. Every registered element is rendered, every feature kind is mounted, and every detail-domain route is checked for a registered implementation.

Manifest tests import the actual compiled modules and compare their exported constructors with each custom-element registration. The npm export map is checked for every designer-facing module.

## Integration boundaries

- Device actions request work through events. An application supplies authoritative backend state; the UI does not connect to hass services.
- Camera playback uses browser-supported URLs. Server-specific WebRTC/HLS negotiation is supplied by the application.
- Maps render supplied slippy tile URLs and marker coordinates; no map provider is silently contacted.
- Markdown implements a safe subset; it does not execute arbitrary HTML, Jinja, or Home Assistant templates.
- Energy statistics, tariffs, currency conversions and forecasts are supplied data. The date toolbar requests a new interval; it does not fabricate historical readings.
- Home Assistant's configuration editors, onboarding, recovery/repair system panels and administrative dialogs are application-specific, outside this dashboard/control library.

## Registered elements

- `luma-icon` — A dependency-free SVG icon with support for custom slotted artwork.
- `luma-button` — A keyboard-accessible action button with filled and text variants.
- `luma-switch` — A native button implementing the ARIA switch pattern.
- `luma-slider` — A range input with keyboard controls, live luma-input events, and committed luma-change events.
- `luma-number` — A compact increment/decrement control, used by thermostat cards.
- `luma-select` — A labeled native select for modes, presets, and input-select entities.
- `luma-temperature-value` — Standalone fixed-metric, locale-aware temperature readout with separate integer, decimal, and unit columns; fractional changes never auto-resize the font.
- `luma-arc` — Standalone 270° value/range arc. Use it as an indicator anywhere, or compose it with luma-dial for interaction.
- `luma-dial` — Reusable mouse/touch draggable dial with snapping, dual temperature set points, pointer capture/cancellation, and keyboard slider semantics.
- `luma-vertical-slider` — Standalone vertical brightness/volume slider with the tall control shape used in entity details.
- `luma-control-switch` — Large swipeable device power control with hover tint, keyboard focus, horizontal tile and vertical popup variants.
- `luma-icon-button` — Reusable accessible icon action/toggle button for popup headers and toolbars.
- `luma-checkbox` — A native labeled checkbox used by lists and filter controls.
- `luma-text-field` — Reusable validated native text/password/number/date/time field.
- `luma-date-picker` — Standalone calendar date input with native popup, min/max, and required validation.
- `luma-time-picker` — Standalone native time picker with keyboard editing and min/max validation.
- `luma-datetime-picker` — Standalone local date-time picker.
- `luma-segmented` — Reusable segmented selector for HVAC modes, light panels, presets, and popup tabs.
- `luma-tabs` — Reusable ARIA tabs with roving focus and arrow/Home/End navigation.
- `luma-color-wheel` — Standalone Home Assistant-style hue/saturation wheel with mouse/touch dragging and keyboard hue/saturation control.
- `luma-color-temperature` — Reusable kelvin control for light cards and detail popups.
- `luma-color-picker` — Color picker composed from the standalone wheel, validated hex field, and favorite swatches.
- `luma-command-bar` — Reusable action toolbar; supports per-command disabled state and entity IDs.
- `luma-cover-controls` — Standalone open/stop/close controls, reusable outside cover cards.
- `luma-media-controls` — Standalone media transport controls.
- `luma-keypad` — Standalone masked numeric keypad for alarm/lock codes; use its value property explicitly when issuing an authorized command.
- `luma-progress` — Standalone accessible progress indicator for updates, playback, and device tasks.
- `luma-attributes` — Reusable entity-attribute table, accepting an object property or serialized JSON attribute.
- `luma-dropdown` — Standalone two-line mode/preset selector with a top-layer popover, icon options, roving focus, keyboard navigation, and Escape dismissal.
- `luma-feature` — Standalone adapter for every public Lovelace feature kind, composed from the same reusable controls used in cards and popups.
- `luma-brightness` — Standalone tall light-brightness control, usable in any layout or dialog.
- `luma-volume` — Standalone tall media-volume control.
- `luma-light-controls` — Light detail panel composed from reusable brightness, RGB color picker, kelvin control, power button, and capability-aware panel selector.
- `luma-color-swatches` — Standalone favorite-color palette, reusable independently from the wheel and light popup.
- `luma-light-mode-selector` — Compact light popup toolbar with power toggle and capability-dependent brightness/color/temperature swatches.
- `luma-badge` — A compact state badge, matching the pills above a Lovelace dashboard.
- `luma-card` — A rounded card shell with title, default content slot, and footer slot.
- `luma-heading` — A section heading with an optional icon and a slot for sensor badges.
- `luma-tile` — A Home Assistant-style tile composed with optional brightness, target-temperature, and cover controls.
- `luma-entity-row` — A reusable entity row with icon, state, and optional switch.
- `luma-entities` — An entities card composed from entity rows, with an optional group toggle.
- `luma-glance-item` — Standalone compact entity summary with a real entity-details action, reusable outside glance cards.
- `luma-glance` — A compact row of entity names, icons, and states.
- `luma-grid` — A slotted grid for composing tiles and cards with fixed or responsive columns.
- `luma-stack` — A vertical or horizontal stack for composing dashboards.
- `luma-thermostat` — A composed climate card with temperature dial, measured temperature, target control, and HVAC modes.
- `luma-light` — A light card composed from an entity row, power switch, brightness slider, and color-temperature slider.
- `luma-cover` — A blinds/shutter card with open, stop, close actions and position control.
- `luma-media-player` — A media player card with track metadata, playback actions, and volume control.
- `luma-weather` — A weather card with current conditions and up to seven daily forecast columns.
- `luma-alarm` — An alarm panel with explicit arm/disarm command events; state is supplied by your application.
- `luma-chart-navigator` — Reusable chart time-window bar with draggable selection, two resize handles, keyboard adjustments, pointer cancellation, focus outline and reset action.
- `luma-sparkline` — Standalone smooth/linear compact sensor trace with optional area fill and mouse/keyboard value inspection.
- `luma-line-chart` — Standalone stepped/linear history plot with area fills, timestamp axes, hover crosshair/tooltips, keyboard point inspection, interactive legends and drag-to-zoom.
- `luma-history` — History card composed from the independently usable interactive line chart.
- `luma-sensor` — Sensor value card composed with an optional standalone interactive history plot.
- `luma-gauge-arc` — Standalone semicircular severity gauge with an accessible value label.
- `luma-gauge` — Gauge card composed from the independently usable semicircular gauge arc.
- `luma-bar-chart` — Standalone grouped/stacked energy bar chart with signed contributions, axes, interactive legends, keyboard value labels, and pointer tooltips.
- `luma-button-card` — A large entity action button with state-colored icon.
- `luma-picture` — An image card for camera snapshots and room images, with caption and alt text.
- `luma-text` — A safe text card with a slot for application-provided rich content.
- `luma-device` — Composable device card driven by control definitions; each control is also a standalone web component.
- `luma-switch-card` — Switch/input-boolean card composed from an entity row and power switch.
- `luma-fan` — Fan power, speed, oscillation, direction and preset controls.
- `luma-humidifier` — Humidifier/dehumidifier card with independently reusable power, target humidity, and mode controls.
- `luma-vacuum` — Vacuum start/pause/stop/dock/locate/spot-clean actions and fan-speed selection.
- `luma-lock` — Lock/unlock/unlatch command card. The supplied state remains authoritative.
- `luma-valve` — Valve open/stop/close actions and position control.
- `luma-water-heater` — Water heater target temperature, operation mode, and away mode.
- `luma-siren` — Siren power, tone, volume, and duration controls.
- `luma-remote` — Remote-control navigation, selection, home/back, and volume commands.
- `luma-lawn-mower` — Lawn mower start, pause, and return-to-dock commands.
- `luma-counter` — Counter increment/decrement and reset controls.
- `luma-timer` — Timer duration and start/pause/cancel/finish commands, with an optional timestamp-based live countdown.
- `luma-update` — Update versions, release notes, installation progress and install/skip commands.
- `luma-automation` — Automation enable/disable and manual trigger controls.
- `luma-script` — Script run/stop commands.
- `luma-input-text` — Input-text entity card using the standalone text-field control.
- `luma-input-number` — Numeric helper entity card with synchronized slider and numeric stepper.
- `luma-input-select` — Select/helper entity card using the standalone select control.
- `luma-input-date` — Date entity detail control.
- `luma-input-time` — Time entity detail control.
- `luma-input-datetime` — Date/time helper entity detail control.
- `luma-scene` — Scene activation control, also used by scene-like entity details.
- `luma-entity` — Single entity state card with details action.
- `luma-horizontal-stack` — Horizontal stack composed through the shared stack layout.
- `luma-vertical-stack` — Vertical stack composed through the shared stack layout.
- `luma-conditional` — Conditional slotted card wrapper driven by a boolean property.
- `luma-entity-filter` — Entities card filtered by supplied entity states, preserving hidden rows when visible rows change.
- `luma-area` — Area summary composed from entity rows, header toggle, and temperature/humidity badges.
- `luma-home-summary` — Home-wide state summary using the same area/entity primitives.
- `luma-statistics-graph` — Statistics card composed from independently usable line or grouped-bar chart components.
- `luma-statistic` — Statistic value and period card, independent of the backend that computed it.
- `luma-distribution` — Distribution/energy-breakdown card with proportional segments and value labels.
- `luma-clock` — Local or supplied-time clock card with locale/time-zone formatting and timer cleanup.
- `luma-date` — Date card using the shared locale-aware clock foundation.
- `luma-todo` — To-do/shopping list composed from checkboxes, text field, and add/remove buttons.
- `luma-calendar` — Month calendar with mouse/keyboard day selection, month navigation, and supplied event lists.
- `luma-activity` — Activity/logbook timeline driven entirely by supplied entries.
- `luma-alert` — Dismissible info/warning/error/success message card.
- `luma-camera` — Camera snapshot or native-video card. Supply a browser-playable URL; backend WebRTC/HLS negotiation is handled by your application.
- `luma-webpage` — Sandboxed embedded webpage card. No page is fetched without a source.
- `luma-markdown` — Safe, dependency-free Markdown-subset card; raw HTML is always escaped.
- `luma-picture-entity` — Picture card with a state-bearing entity footer and details action.
- `luma-picture-glance` — Room picture composed with independent entity glance controls.
- `luma-picture-elements` — Floorplan/background with independently interactive entity badges at percentage coordinates.
- `luma-plant` — Plant status composed from entity row and independently reusable attribute table.
- `luma-form` — Reusable configurator/form composed from validated fields, selects, and a submit button.
- `luma-conversation` — Conversation UI with escaped messages, draft input, and a send event for your own assistant adapter.
- `luma-shortcut` — Shortcut card that emits a navigate action for the application router.
- `luma-energy-node` — Standalone circular energy node with independent readings and optional source-mix ring segments.
- `luma-flow-line` — Standalone SVG connection with an animated flow dot and reduced-motion support.
- `luma-energy-flow` — Home Assistant-style connected energy distribution diagram composed from independently reusable nodes and animated flow lines.
- `luma-energy` — Energy distribution card composed from the standalone connected flow diagram.
- `luma-data-table` — Standalone escaped-data table with column definitions, swatch cells, and an optional totals footer.
- `luma-energy-summary` — Energy-source totals and costs table, composed from the standalone data-table component.
- `luma-date-range-picker` — Standalone energy/history date toolbar with native calendar, Today, previous/next, and day/week/month/year navigation.
- `luma-energy-dashboard` — Energy dashboard assembled from reusable flow, totals table, history plot, signed stacked-bar charts, grid, and date-range controls.
- `luma-map` — Library-free Mercator map with optional supplied slippy tiles, pointer panning, zoom buttons, and interactive entity markers.
- `luma-dialog` — Standalone modal shell with native focus trapping, Escape/backdrop dismissal, return focus, header/footer slots, and responsive sizing.
- `luma-confirm-dialog` — Reusable confirmation popup composed from the native dialog and buttons; confirmation is reported as luma-confirm.
- `luma-state-panel` — Reusable read-only entity state, history, and attributes panel for sensors, people, sun, binary sensors, and unknown domains.
- `luma-more-info` — Domain-aware entity details popup composed from the standalone dialog, tabs, device controls, history chart, and attributes table.
