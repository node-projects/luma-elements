# Component API

Generated from the property definitions in `src/`. Properties use camelCase; attributes use kebab-case. Arrays and objects accept JSON attributes.

## `luma-icon`

A dependency-free SVG icon with support for custom slotted artwork.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `name` | string | `"light"` | Name of a built-in SVG icon. Unknown names fall back to light. |
| `label` | `label` | string | `""` | Accessible icon description. Empty makes the SVG decorative. |

## `luma-button`

A keyboard-accessible action button with filled and text variants.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `""` | Optional leading built-in icon. |
| `variant` | `variant` | string | `"filled"` | Visual variant: filled or text. |

## `luma-switch`

A native button implementing the ARIA switch pattern.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `checked` | `checked` | boolean | `false` | Whether the switch is on. User changes emit luma-change with property checked. |

## `luma-slider`

A range input with keyboard controls, live luma-input events, and committed luma-change events.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Current numeric value, clamped to the minimum and maximum for display and user interaction. |
| `min` | `min` | number | `0` | Inclusive lower bound. |
| `max` | `max` | number | `100` | Inclusive upper bound. Must be greater than min. |
| `step` | `step` | number | `1` | Positive increment for pointer and keyboard adjustments. |
| `unit` | `unit` | string | `""` | Unit shown after the value, such as %, °C, or W. |
| `showValue` | `show-value` | boolean | `false` | Display the numeric value beside the slider. |
| `hideLabel` | `hide-label` | boolean | `false` | Visually hide the label while retaining the accessible name. |

## `luma-number`

A compact increment/decrement control, used by thermostat cards.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Current numeric value, clamped to the minimum and maximum for display and user interaction. |
| `min` | `min` | number | `0` | Inclusive lower bound. |
| `max` | `max` | number | `100` | Inclusive upper bound. Must be greater than min. |
| `step` | `step` | number | `1` | Positive increment for pointer and keyboard adjustments. |
| `unit` | `unit` | string | `""` | Unit shown after the value, such as %, °C, or W. |
| `editable` | `editable` | boolean | `true` | Allow direct numeric entry in the bar variant, with native min/max/step validation. |
| `variant` | `variant` | string | `"bar"` | Control appearance: bar shows a value between buttons; round uses standalone circular buttons for thermostat dials. |

## `luma-select`

A labeled native select for modes, presets, and input-select entities.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Selected option value. |
| `options` | `options` | array | `[]` | Array of strings or {value, label} options. Supply a JavaScript array or JSON attribute. |

## `luma-temperature-value`

Standalone fixed-metric, locale-aware temperature readout with separate integer, decimal, and unit columns; fractional changes never auto-resize the font.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `21` | Displayed temperature. |
| `unit` | `unit` | string | `"°C"` | Temperature unit, shown in a fixed upper suffix. |
| `precision` | `precision` | number | `1` | Fractional digits to reserve, from 0 to 3. The decimal field stays present for whole values. |
| `locale` | `locale` | string | `"en"` | Number-format locale; for example de displays a comma. |
| `digits` | `digits` | number | `2` | Minimum integer-digit column width. All digits use tabular metrics. |

## `luma-arc`

Standalone 270° value/range arc. Use it as an indicator anywhere, or compose it with luma-dial for interaction.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Current numeric value, clamped to the minimum and maximum for display and user interaction. |
| `min` | `min` | number | `0` | Inclusive lower bound. |
| `max` | `max` | number | `100` | Inclusive upper bound. Must be greater than min. |
| `step` | `step` | number | `1` | Positive increment for pointer and keyboard adjustments. |
| `unit` | `unit` | string | `""` | Unit shown after the value, such as %, °C, or W. |
| `color` | `color` | string | `"orange"` | Arc and handle accent, a theme color name or CSS color. |
| `highValue` | `high-value` | number | `24` | Upper set point when range is enabled. |
| `range` | `range` | boolean | `false` | Draw the active segment between value and high-value. |
| `showThumb` | `show-thumb` | boolean | `false` | Show draggable-handle markers; interaction is supplied by luma-dial. |
| `secondary` | `secondary` | string | `""` | Caption above the central reading. |
| `currentValue` | `current-value` | number | `20.8` | Actual measured temperature shown separately and as an optional dial marker. |
| `showCurrent` | `show-current` | boolean | `false` | Show the actual-temperature readout above the arc. |
| `currentLabel` | `current-label` | string | `"Current temperature"` | Label above the actual-temperature reading. |
| `showCurrentMarker` | `show-current-marker` | boolean | `false` | Show a small marker for the measured temperature. |
| `showCurrentAsPrimary` | `show-current-as-primary` | boolean | `false` | Use the measured temperature as the main reading; the set point remains draggable. |
| `precision` | `precision` | number | `1` | Fixed decimal digits for the main temperature readout. |
| `locale` | `locale` | string | `"en"` | Number-format locale for decimal comma/point selection. |

## `luma-dial`

Reusable mouse/touch draggable dial with snapping, dual temperature set points, pointer capture/cancellation, and keyboard slider semantics.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Current numeric value, clamped to the minimum and maximum for display and user interaction. |
| `min` | `min` | number | `0` | Inclusive lower bound. |
| `max` | `max` | number | `100` | Inclusive upper bound. Must be greater than min. |
| `step` | `step` | number | `1` | Positive increment for pointer and keyboard adjustments. |
| `unit` | `unit` | string | `""` | Unit shown after the value, such as %, °C, or W. |
| `color` | `color` | string | `"orange"` | Arc and handle accent, a theme color name or CSS color. |
| `highValue` | `high-value` | number | `24` | Upper set point when range is enabled. |
| `range` | `range` | boolean | `false` | Draw the active segment between value and high-value. |
| `showThumb` | `show-thumb` | boolean | `true` | Show the currently controlled set point handles. |
| `secondary` | `secondary` | string | `""` | Caption above the central reading. |
| `currentValue` | `current-value` | number | `20.8` | Actual measured temperature shown separately and as an optional dial marker. |
| `showCurrent` | `show-current` | boolean | `false` | Show the actual-temperature readout above the arc. |
| `currentLabel` | `current-label` | string | `"Current temperature"` | Label above the actual-temperature reading. |
| `showCurrentMarker` | `show-current-marker` | boolean | `false` | Show a small marker for the measured temperature. |
| `showCurrentAsPrimary` | `show-current-as-primary` | boolean | `false` | Use the measured temperature as the main reading; the set point remains draggable. |
| `precision` | `precision` | number | `1` | Fixed decimal digits for the main temperature readout. |
| `locale` | `locale` | string | `"en"` | Number-format locale for decimal comma/point selection. |

## `luma-vertical-slider`

Standalone vertical brightness/volume slider with the tall control shape used in entity details.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Current numeric value, clamped to the minimum and maximum for display and user interaction. |
| `min` | `min` | number | `0` | Inclusive lower bound. |
| `max` | `max` | number | `100` | Inclusive upper bound. Must be greater than min. |
| `step` | `step` | number | `1` | Positive increment for pointer and keyboard adjustments. |
| `unit` | `unit` | string | `""` | Unit shown after the value, such as %, °C, or W. |
| `showValue` | `show-value` | boolean | `false` | Display the numeric value beside the slider. |
| `hideLabel` | `hide-label` | boolean | `false` | Visually hide the label while retaining the accessible name. |
| `orientation` | `orientation` | string | `"vertical"` | Range orientation: vertical or horizontal. |
| `inverted` | `inverted` | boolean | `false` | Place the minimum at the top of a vertical slider, useful for warm-to-cool kelvin controls. |

## `luma-icon-button`

Reusable accessible icon action/toggle button for popup headers and toolbars.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"power"` | Built-in icon name. |
| `pressed` | `pressed` | boolean | `false` | Whether this is a selected toggle button. |
| `toggle` | `toggle` | boolean | `false` | Toggle pressed on activation; otherwise emit a press action. |

## `luma-checkbox`

A native labeled checkbox used by lists and filter controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `checked` | `checked` | boolean | `false` | Checked state; change events carry checked. |

## `luma-text-field`

Reusable validated native text/password/number/date/time field.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Current field value, committed on change. |
| `type` | `type` | string | `"text"` | Native input type: text, password, number, date, time, datetime-local, or color. |
| `placeholder` | `placeholder` | string | `""` | Placeholder text. |
| `min` | `min` | string | `""` | Native lower bound for date/time/numeric fields. |
| `max` | `max` | string | `""` | Native upper bound. |
| `step` | `step` | string | `"any"` | Native input step, such as 60 for minute-resolution time. |
| `required` | `required` | boolean | `false` | Whether the input is required. |
| `multiline` | `multiline` | boolean | `false` | Use a textarea instead of a single-line field. |

## `luma-date-picker`

Standalone calendar date input with native popup, min/max, and required validation.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Current field value, committed on change. |
| `type` | `type` | string | `"date"` | Native date type. Values are YYYY-MM-DD strings. |
| `placeholder` | `placeholder` | string | `""` | Placeholder text. |
| `min` | `min` | string | `""` | Native lower bound for date/time/numeric fields. |
| `max` | `max` | string | `""` | Native upper bound. |
| `step` | `step` | string | `"any"` | Native input step, such as 60 for minute-resolution time. |
| `required` | `required` | boolean | `false` | Whether the input is required. |
| `multiline` | `multiline` | boolean | `false` | Use a textarea instead of a single-line field. |

## `luma-time-picker`

Standalone native time picker with keyboard editing and min/max validation.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Current field value, committed on change. |
| `type` | `type` | string | `"time"` | Native time type. Values use HH:MM[:SS]. |
| `placeholder` | `placeholder` | string | `""` | Placeholder text. |
| `min` | `min` | string | `""` | Native lower bound for date/time/numeric fields. |
| `max` | `max` | string | `""` | Native upper bound. |
| `step` | `step` | string | `"any"` | Native input step, such as 60 for minute-resolution time. |
| `required` | `required` | boolean | `false` | Whether the input is required. |
| `multiline` | `multiline` | boolean | `false` | Use a textarea instead of a single-line field. |

## `luma-datetime-picker`

Standalone local date-time picker.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Current field value, committed on change. |
| `type` | `type` | string | `"datetime-local"` | Local date and time without an implicit timezone. |
| `placeholder` | `placeholder` | string | `""` | Placeholder text. |
| `min` | `min` | string | `""` | Native lower bound for date/time/numeric fields. |
| `max` | `max` | string | `""` | Native upper bound. |
| `step` | `step` | string | `"any"` | Native input step, such as 60 for minute-resolution time. |
| `required` | `required` | boolean | `false` | Whether the input is required. |
| `multiline` | `multiline` | boolean | `false` | Use a textarea instead of a single-line field. |

## `luma-segmented`

Reusable segmented selector for HVAC modes, light panels, presets, and popup tabs.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Selected option value. |
| `options` | `options` | array | `[]` | Strings or {value,label,icon?} items. Each option is an independently keyboard-accessible button. |

## `luma-tabs`

Reusable ARIA tabs with roving focus and arrow/Home/End navigation.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Selected option value. |
| `options` | `options` | array | `[]` | Strings or {value,label,icon?} items. Each option is an independently keyboard-accessible button. |

## `luma-color-wheel`

Standalone Home Assistant-style hue/saturation wheel with mouse/touch dragging and keyboard hue/saturation control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `"#ffa24d"` | Selected RGB color as a six-digit #rrggbb string. Pointer input controls hue and saturation. |
| `brightness` | `brightness` | number | `100` | HSV value percentage used when deriving the RGB selection. |

## `luma-color-temperature`

Reusable kelvin control for light cards and detail popups.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `3000` | Color temperature in kelvin. |
| `min` | `min` | number | `2000` | Warmest supported color temperature in kelvin. |
| `max` | `max` | number | `6500` | Coolest supported color temperature in kelvin. |
| `step` | `step` | number | `50` | Kelvin increment. |
| `unit` | `unit` | string | `""` | Unit shown after the value, such as %, °C, or W. |
| `vertical` | `vertical` | boolean | `true` | Use the tall popup control; false uses a horizontal slider. |
| `hideLabel` | `hide-label` | boolean | `false` | Hide the visual label while retaining its accessible name. |
| `showValue` | `show-value` | boolean | `true` | Display kelvin value. |

## `luma-color-picker`

Color picker composed from the standalone wheel, validated hex field, and favorite swatches.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `"#ffa24d"` | RGB color as a six-digit hexadecimal string. |
| `showInput` | `show-input` | boolean | `true` | Show the hex color field. |
| `hideFavorites` | `hide-favorites` | boolean | `false` | Hide built-in swatches when composing with a separate swatch control. |
| `eyeDropper` | `eye-dropper` | boolean | `true` | Show screen color selection when the browser supports the native EyeDropper API. |
| `favorites` | `favorites` | array | `["#ff9e47","#ff4141","#48b6ff","#a56aff","#ffffff"]` | Favorite RGB swatches as six-digit hex strings. |

## `luma-command-bar`

Reusable action toolbar; supports per-command disabled state and entity IDs.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `commands` | `commands` | array | `[]` | Array of {action,label,icon?,disabled?}; activating a button emits its action unchanged. |
| `entityId` | `entity-id` | string | `""` | Entity identifier included in command events. |

## `luma-cover-controls`

Standalone open/stop/close controls, reusable outside cover cards.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `commands` | `commands` | array | `[{"action":"open","label":"Open","icon":"up"},{"action":"stop","label":"Stop","icon":"stop"},{"action":"close","label":"Close","icon":"down"}]` | Cover motion commands. |
| `entityId` | `entity-id` | string | `""` | Entity identifier included in command events. |

## `luma-media-controls`

Standalone media transport controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `commands` | `commands` | array | `[{"action":"previous","label":"Previous","icon":"previous"},{"action":"play-pause","label":"Play/pause","icon":"play"},{"action":"next","label":"Next","icon":"next"}]` | Playback commands. |
| `entityId` | `entity-id` | string | `""` | Entity identifier included in command events. |

## `luma-keypad`

Standalone masked numeric keypad for alarm/lock codes; use its value property explicitly when issuing an authorized command.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Entered code. Kept locally; never placed in HTML attributes or action details. |
| `maxLength` | `max-length` | number | `12` | Maximum number of code digits. |

## `luma-progress`

Standalone accessible progress indicator for updates, playback, and device tasks.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Current numeric value, clamped to the minimum and maximum for display and user interaction. |
| `min` | `min` | number | `0` | Inclusive lower bound. |
| `max` | `max` | number | `100` | Inclusive upper bound. Must be greater than min. |
| `step` | `step` | number | `1` | Positive increment for pointer and keyboard adjustments. |
| `unit` | `unit` | string | `""` | Unit shown after the value, such as %, °C, or W. |

## `luma-attributes`

Reusable entity-attribute table, accepting an object property or serialized JSON attribute.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `data` | `data` | object | `{}` | Object mapping attribute names to JSON-compatible values. Values are rendered as escaped text. |

## `luma-dropdown`

Standalone two-line mode/preset selector with a top-layer popover, icon options, roving focus, keyboard navigation, and Escape dismissal.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Selected option value. |
| `options` | `options` | array | `[]` | Strings or {value,label,icon?} options shown in the popover menu. |
| `icon` | `icon` | string | `""` | Optional trigger icon. |

## `luma-feature`

Standalone adapter for every public Lovelace feature kind, composed from the same reusable controls used in cards and popups.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `type` | `type` | string | `"light-brightness"` | Public Lovelace feature kind. See featureControls for the complete list. |
| `config` | `config` | object | `{}` | Properties forwarded to the standalone primitive: value/checked, options, commands, limits, favorites, or chart series. |
| `entityId` | `entity-id` | string | `""` | Entity identifier included in action/change/input details. |

## `luma-brightness`

Standalone tall light-brightness control, usable in any layout or dialog.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `"Brightness"` | Accessible brightness slider name. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Current numeric value, clamped to the minimum and maximum for display and user interaction. |
| `min` | `min` | number | `0` | Inclusive lower bound. |
| `max` | `max` | number | `100` | Inclusive upper bound. Must be greater than min. |
| `step` | `step` | number | `1` | Positive increment for pointer and keyboard adjustments. |
| `unit` | `unit` | string | `"%"` | Brightness unit. |
| `showValue` | `show-value` | boolean | `false` | Show a secondary numeric percentage. |
| `hideLabel` | `hide-label` | boolean | `true` | Hide the visual label; the range retains its accessible name. |
| `orientation` | `orientation` | string | `"vertical"` | Range orientation: vertical or horizontal. |
| `inverted` | `inverted` | boolean | `false` | Place the minimum at the top of a vertical slider, useful for warm-to-cool kelvin controls. |

## `luma-volume`

Standalone tall media-volume control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `"Volume"` | Accessible volume slider name. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Current numeric value, clamped to the minimum and maximum for display and user interaction. |
| `min` | `min` | number | `0` | Inclusive lower bound. |
| `max` | `max` | number | `100` | Inclusive upper bound. Must be greater than min. |
| `step` | `step` | number | `1` | Positive increment for pointer and keyboard adjustments. |
| `unit` | `unit` | string | `"%"` | Volume unit. |
| `showValue` | `show-value` | boolean | `true` | Show the numeric percentage. |
| `hideLabel` | `hide-label` | boolean | `false` | Visually hide the label while retaining the accessible name. |
| `orientation` | `orientation` | string | `"vertical"` | Range orientation: vertical or horizontal. |
| `inverted` | `inverted` | boolean | `false` | Place the minimum at the top of a vertical slider, useful for warm-to-cool kelvin controls. |

## `luma-light-controls`

Light detail panel composed from reusable brightness, RGB color picker, kelvin control, power button, and capability-aware panel selector.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `state` | `state` | string | `"on"` | Light on/off state. |
| `brightness` | `brightness` | number | `70` | Brightness percentage. |
| `rgbColor` | `rgb-color` | string | `"#ffa24d"` | RGB color as a six-digit hex string. |
| `colorTemperature` | `color-temperature` | number | `3000` | Color temperature in kelvin. |
| `minKelvin` | `min-kelvin` | number | `2000` | Warmest supported temperature. |
| `maxKelvin` | `max-kelvin` | number | `6500` | Coolest supported temperature. |
| `panel` | `panel` | string | `"brightness"` | Selected light control: brightness, color, or temperature. |
| `colorModes` | `color-modes` | array | `["brightness","rgb","color_temp"]` | Supported color capabilities. Only supported panels are shown. |
| `effect` | `effect` | string | `"none"` | Selected light effect. |
| `effects` | `effects` | array | `[]` | Supported effects; empty hides the selector. |
| `lastChangedLabel` | `last-changed-label` | string | `""` | Application-formatted last-changed text shown beneath the state. |
| `favorites` | `favorites` | array | `["#ff8800","#ffc18a","#ffe4ce","#fffefa","#7ba6ff","#d58aff","#f99dff","#ff6855"]` | Favorite RGB colors. |

## `luma-color-swatches`

Standalone favorite-color palette, reusable independently from the wheel and light popup.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `""` | Selected six-digit RGB color. |
| `colors` | `colors` | array | `["#ff8800","#ffc18a","#ffe4ce","#fffefa","#7ba6ff","#d58aff","#f99dff","#ff6855"]` | Favorite colors as six-digit hex strings. |

## `luma-light-mode-selector`

Compact light popup toolbar with power toggle and capability-dependent brightness/color/temperature swatches.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | string | `"brightness"` | Selected brightness/color/temperature panel. |
| `modes` | `modes` | array | `["brightness","color","temperature"]` | Supported control panels. |
| `state` | `state` | string | `"on"` | Light power state. |

## `luma-badge`

A compact state badge, matching the pills above a Lovelace dashboard.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |

## `luma-card`

A rounded card shell with title, default content slot, and footer slot.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |

## `luma-heading`

A section heading with an optional icon and a slot for sensor badges.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `""` | Optional heading icon. |
| `level` | `level` | number | `2` | Semantic heading level from 1 to 6. |

## `luma-tile`

A Home Assistant-style tile composed with optional brightness, target-temperature, and cover controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `toggle` | `toggle` | boolean | `false` | Make the icon toggle on/off instead of opening entity details. |
| `feature` | `feature` | string | `""` | Optional embedded control: brightness, temperature, or cover. |
| `value` | `value` | number | `0` | Value of the embedded brightness (%) or temperature (°C) control. |
| `features` | `features` | array | `[]` | Additional standalone feature controls as {type,label?,config?}; all public feature kinds are supported by luma-feature. |

## `luma-entity-row`

A reusable entity row with icon, state, and optional switch.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `toggle` | `toggle` | boolean | `false` | Show an on/off switch instead of a plain state value. |

## `luma-entities`

An entities card composed from entity rows, with an optional group toggle.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `entities` | `entities` | array | `[]` | Array of {label, state, icon?, secondary?, entityId?, color?, toggle?, disabled?} entity rows. |
| `showHeaderToggle` | `show-header-toggle` | boolean | `false` | Show a header switch that toggles all rows marked toggle. |

## `luma-glance-item`

Standalone compact entity summary with a real entity-details action, reusable outside glance cards.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |

## `luma-glance`

A compact row of entity names, icons, and states.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `entities` | `entities` | array | `[]` | Entity summaries: {label,state,icon?,entityId?,domain?,detailProperties?}. |

## `luma-grid`

A slotted grid for composing tiles and cards with fixed or responsive columns.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `columns` | `columns` | number | `2` | Number of equal grid columns, from 1 to 12. Set min-width to enable an auto-fitting responsive grid. |
| `gap` | `gap` | number | `8` | Space between cells in pixels. |
| `minWidth` | `min-width` | number | `0` | Minimum cell width in pixels; a positive value automatically fits columns to available space. |

## `luma-stack`

A vertical or horizontal stack for composing dashboards.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `direction` | `direction` | string | `"vertical"` | Stack direction: vertical or horizontal. |
| `gap` | `gap` | number | `8` | Space between children in pixels. |

## `luma-thermostat`

A composed climate card with temperature dial, measured temperature, target control, and HVAC modes.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"temperature"` | Thermostat icon. |
| `state` | `state` | string | `"heating"` | Current HVAC state, such as heating, cooling, idle, or off. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"climate"` | Climate domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `temperature` | `temperature` | number | `21` | Target temperature changed by the increment/decrement control. |
| `currentTemperature` | `current-temperature` | number | `20.5` | Measured room temperature. |
| `min` | `min` | number | `7` | Minimum target temperature. |
| `max` | `max` | number | `35` | Maximum target temperature. |
| `step` | `step` | number | `0.5` | Target temperature increment. |
| `unit` | `unit` | string | `"°C"` | Temperature unit. |
| `mode` | `mode` | string | `"heat"` | Selected HVAC mode. |
| `modes` | `modes` | array | `["off","heat","cool","auto"]` | Available HVAC mode names. |
| `range` | `range` | boolean | `false` | Enable lower/upper set points for heat/cool mode. |
| `highTemperature` | `high-temperature` | number | `24` | Upper temperature set point. |
| `showCurrentTemperature` | `show-current-temperature` | boolean | `true` | Display actual measured temperature above the dial. |
| `showCurrentMarker` | `show-current-marker` | boolean | `true` | Display the measured-temperature marker on the dial. |
| `showCurrentAsPrimary` | `show-current-as-primary` | boolean | `false` | Use the measured temperature as the primary dial reading and show the target below it. |
| `precision` | `precision` | number | `1` | Fixed decimal places; keeps the readout stable at whole and fractional temperatures. |
| `locale` | `locale` | string | `"en"` | Formatting locale, e.g. de uses a comma. |
| `stateLabel` | `state-label` | string | `""` | Human-readable HVAC activity label; empty uses state. |
| `currentTemperatureLabel` | `current-temperature-label` | string | `"Current temperature"` | Label above the measured-temperature reading. |
| `modeLabel` | `mode-label` | string | `"HVAC mode"` | Accessible and visible mode-selector label. |
| `presetLabel` | `preset-label` | string | `"Preset"` | Accessible and visible preset-selector label. |
| `controlStyle` | `control-style` | string | `"round"` | Temperature buttons: round, matching the thermostat dial, or bar. |
| `presets` | `presets` | array | `[]` | Available climate presets; empty hides the selector. |
| `preset` | `preset` | string | `""` | Selected climate preset. |
| `fanModes` | `fan-modes` | array | `[]` | Available fan modes. |
| `fanMode` | `fan-mode` | string | `""` | Selected fan mode. |
| `swingModes` | `swing-modes` | array | `[]` | Available swing modes. |
| `swingMode` | `swing-mode` | string | `""` | Selected swing mode. |

## `luma-light`

A light card composed from an entity row, power switch, brightness slider, and color-temperature slider.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"on"` | Light on/off state. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"light"` | Light entity domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `brightness` | `brightness` | number | `70` | Brightness percentage. |
| `rgbColor` | `rgb-color` | string | `"#ffa24d"` | RGB color as a six-digit hex string. |
| `colorTemperature` | `color-temperature` | number | `3000` | Color temperature in kelvin. |
| `minKelvin` | `min-kelvin` | number | `2000` | Warmest supported temperature. |
| `maxKelvin` | `max-kelvin` | number | `6500` | Coolest supported temperature. |
| `panel` | `panel` | string | `"brightness"` | Selected light control: brightness, color, or temperature. |
| `colorModes` | `color-modes` | array | `["brightness","rgb","color_temp"]` | Supported color capabilities. Only supported panels are shown. |
| `effect` | `effect` | string | `"none"` | Selected light effect. |
| `effects` | `effects` | array | `[]` | Supported effects; empty hides the selector. |
| `lastChangedLabel` | `last-changed-label` | string | `""` | Application-formatted last-changed text shown beneath the state. |
| `favorites` | `favorites` | array | `["#ff8800","#ffc18a","#ffe4ce","#fffefa","#7ba6ff","#d58aff","#f99dff","#ff6855"]` | Favorite RGB colors. |

## `luma-cover`

A blinds/shutter card with open, stop, close actions and position control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"cover"` | Cover icon. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"cover"` | Cover domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `position` | `position` | number | `100` | Cover position, from 0 (closed) to 100 (open). Commands emit actions; position changes only when assigned or moved with the slider. |
| `tiltPosition` | `tilt-position` | number | `50` | Slat tilt percentage. |
| `supportsTilt` | `supports-tilt` | boolean | `false` | Show independently reusable slat-tilt controls. |

## `luma-media-player`

A media player card with track metadata, playback actions, and volume control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"speaker"` | Media player icon. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"media_player"` | Media player domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `mediaTitle` | `media-title` | string | `""` | Current track or program title. |
| `artist` | `artist` | string | `""` | Artist, station, or source name. |
| `volume` | `volume` | number | `30` | Volume in percent from 0 to 100. |
| `muted` | `muted` | boolean | `false` | Whether audio is muted. |
| `position` | `position` | number | `0` | Playback position in seconds. |
| `duration` | `duration` | number | `240` | Media duration in seconds. |
| `source` | `source` | string | `""` | Selected source. |
| `sources` | `sources` | array | `[]` | Available sources. |
| `soundMode` | `sound-mode` | string | `""` | Selected sound mode. |
| `soundModes` | `sound-modes` | array | `[]` | Available sound modes. |
| `shuffle` | `shuffle` | boolean | `false` | Shuffle enabled. |
| `repeat` | `repeat` | string | `"off"` | Repeat mode: off, one, or all. |

## `luma-weather`

A weather card with current conditions and up to seven daily forecast columns.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `domain` | `domain` | string | `"weather"` | Weather entity domain. |
| `entityId` | `entity-id` | string | `""` | Weather entity identifier. |
| `condition` | `condition` | string | `"Partly cloudy"` | Human-readable current weather condition. |
| `temperature` | `temperature` | number | `22` | Current outdoor temperature. |
| `unit` | `unit` | string | `"°C"` | Temperature unit. |
| `humidity` | `humidity` | number | `57` | Relative humidity as a percentage. |
| `windSpeed` | `wind-speed` | number | `12` | Wind speed in the unit specified by wind-unit. |
| `windUnit` | `wind-unit` | string | `"km/h"` | Wind speed unit. |
| `forecast` | `forecast` | array | `[]` | Forecast array: {day, condition?, temperature, low?}. |

## `luma-alarm`

An alarm panel with explicit arm/disarm command events; state is supplied by your application.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"shield"` | Alarm status icon. |
| `state` | `state` | string | `"disarmed"` | Current alarm state. Commands emit actions and do not change the supplied state. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"alarm_control_panel"` | Alarm panel domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `modes` | `modes` | array | `["home","away","night"]` | Available arming modes. |
| `requireCode` | `require-code` | boolean | `false` | Require a non-empty code before enabling arm/disarm commands. Read the code property explicitly in your command handler. |

## `luma-sparkline`

Standalone smooth/linear compact sensor trace with optional area fill and mouse/keyboard value inspection.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `data` | `data` | array | `[]` | Numeric history samples ordered by time. |
| `color` | `color` | string | `"#ffad41"` | Trace and fill color. |
| `smooth` | `smooth` | boolean | `true` | Use a smooth cubic trace instead of straight segments. |
| `fill` | `fill` | boolean | `true` | Fill the area under the trace. |
| `unit` | `unit` | string | `""` | Unit shown by pointer/keyboard value inspection. |

## `luma-line-chart`

Standalone stepped/linear history plot with area fills, timestamp axes, hover crosshair/tooltips, keyboard point inspection, interactive legends and drag-to-zoom.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `unit` | `unit` | string | `""` | Value unit. |
| `series` | `series` | array | `[]` | Array of {name,color?,data,fill?,curve?,unit?}. Data items are numbers or {x,y}; x is numeric or an ISO timestamp. |
| `curve` | `curve` | string | `"step"` | Interpolation: step (Home Assistant history style) or linear. |
| `bounds` | `bounds` | object | `{}` | Optional explicit y-axis bounds as {min,max}. |
| `timeRange` | `time-range` | object | `{}` | Optional visible x range as {start,end}, using epoch milliseconds for timestamp series. |
| `locale` | `locale` | string | `"en"` | Locale used for dates and numeric labels. |
| `hiddenSeries` | `hidden-series` | array | `[]` | Names of series hidden by clicking their legend buttons. |
| `zoomEnabled` | `zoom-enabled` | boolean | `true` | Allow pointer-drag selection to zoom the time range; Escape or Reset zoom restores it. |

## `luma-history`

History card composed from the independently usable interactive line chart.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `unit` | `unit` | string | `""` | Value unit. |
| `series` | `series` | array | `[]` | Array of {name,color?,data,fill?,curve?,unit?}. Data items are numbers or {x,y}; x is numeric or an ISO timestamp. |
| `curve` | `curve` | string | `"step"` | Interpolation: step (Home Assistant history style) or linear. |
| `bounds` | `bounds` | object | `{}` | Optional explicit y-axis bounds as {min,max}. |
| `timeRange` | `time-range` | object | `{}` | Optional visible x range as {start,end}, using epoch milliseconds for timestamp series. |
| `locale` | `locale` | string | `"en"` | Locale used for dates and numeric labels. |
| `hiddenSeries` | `hidden-series` | array | `[]` | Names of series hidden by clicking their legend buttons. |
| `zoomEnabled` | `zoom-enabled` | boolean | `true` | Allow pointer-drag selection to zoom the time range; Escape or Reset zoom restores it. |

## `luma-sensor`

Sensor value card composed with an optional standalone interactive history plot.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"temperature"` | Header icon. |
| `state` | `state` | string | `""` | Optional displayed state; empty uses value. |
| `secondary` | `secondary` | string | `""` | Secondary description below the value. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"sensor"` | Sensor entity domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `unit` | `unit` | string | `""` | Value unit. |
| `series` | `series` | array | `[]` | Array of {name,color?,data,fill?,curve?,unit?}. Data items are numbers or {x,y}; x is numeric or an ISO timestamp. |
| `curve` | `curve` | string | `"step"` | Interpolation: step (Home Assistant history style) or linear. |
| `bounds` | `bounds` | object | `{}` | Optional explicit y-axis bounds as {min,max}. |
| `timeRange` | `time-range` | object | `{}` | Optional visible x range as {start,end}, using epoch milliseconds for timestamp series. |
| `locale` | `locale` | string | `"en"` | Locale used for dates and numeric labels. |
| `hiddenSeries` | `hidden-series` | array | `[]` | Names of series hidden by clicking their legend buttons. |
| `zoomEnabled` | `zoom-enabled` | boolean | `true` | Allow pointer-drag selection to zoom the time range; Escape or Reset zoom restores it. |
| `value` | `value` | number | `0` | Current numeric sensor reading. |
| `graphStyle` | `graph-style` | string | `"sparkline"` | Graph presentation: sparkline, history, or none. |
| `graphColor` | `graph-color` | string | `"#ffad41"` | Compact trace/fill color. |
| `precision` | `precision` | number | `1` | Fixed decimal places in the value readout. |

## `luma-gauge-arc`

Standalone semicircular severity gauge with an accessible value label.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Reading; the arc is clamped to the supplied bounds. |
| `min` | `min` | number | `0` | Minimum scale. |
| `max` | `max` | number | `100` | Maximum scale. |
| `unit` | `unit` | string | `"%"` | Reading unit. |
| `severity` | `severity` | array | `[{"from":0,"color":"green"},{"from":60,"color":"amber"},{"from":85,"color":"red"}]` | Thresholds as {from,color}. |

## `luma-gauge`

Gauge card composed from the independently usable semicircular gauge arc.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Reading; the arc is clamped to the supplied bounds. |
| `min` | `min` | number | `0` | Minimum scale. |
| `max` | `max` | number | `100` | Maximum scale. |
| `unit` | `unit` | string | `"%"` | Reading unit. |
| `severity` | `severity` | array | `[{"from":0,"color":"green"},{"from":60,"color":"amber"},{"from":85,"color":"red"}]` | Thresholds as {from,color}. |
| `entityId` | `entity-id` | string | `""` | Sensor entity identifier. |
| `domain` | `domain` | string | `"sensor"` | Sensor domain. |

## `luma-bar-chart`

Standalone grouped/stacked energy bar chart with signed contributions, axes, interactive legends, keyboard value labels, and pointer tooltips.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `series` | `series` | array | `[]` | Series of {name,color?,data} with numeric or {x,y} samples. Negative samples render below zero. |
| `unit` | `unit` | string | `""` | Value unit. |
| `stacked` | `stacked` | boolean | `false` | Stack positive and negative contributions separately, as in Home Assistant energy charts. |
| `labels` | `labels` | array | `[]` | Optional x-axis labels corresponding to sample positions. |
| `hiddenSeries` | `hidden-series` | array | `[]` | Names hidden by clicking their legend buttons. |
| `locale` | `locale` | string | `"en"` | Numeric label locale. |

## `luma-button-card`

A large entity action button with state-colored icon.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"auto"` | Default toggles supported domains; otherwise opens details. Use press for a scene/action button. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |

## `luma-picture`

An image card for camera snapshots and room images, with caption and alt text.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `src` | `src` | string | `""` | Image URL. Relative URLs, HTTP(S), and blob URLs are supported. No image is fetched until a source is provided. |
| `alt` | `alt` | string | `""` | Alternative text describing the image. |
| `caption` | `caption` | string | `""` | Secondary caption under the image. |

## `luma-text`

A safe text card with a slot for application-provided rich content.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `content` | `content` | string | `""` | Plain text content. Line breaks are preserved; markup is escaped for safety. Use the default slot for trusted rich HTML. |

## `luma-device`

Composable device card driven by control definitions; each control is also a standalone web component.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |

## `luma-switch-card`

Switch/input-boolean card composed from an entity row and power switch.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"switch"` | Switch domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |

## `luma-fan`

Fan power, speed, oscillation, direction and preset controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"fan"` | Fan icon. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"fan"` | Fan domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `speed` | `speed` | number | `50` | Fan speed percentage. |
| `oscillating` | `oscillating` | boolean | `false` | Whether the fan oscillates. |
| `direction` | `direction` | string | `"forward"` | Airflow direction. |
| `directions` | `directions` | array | `["forward","reverse"]` | Supported airflow directions. |
| `preset` | `preset` | string | `"normal"` | Selected preset. |
| `presets` | `presets` | array | `["normal","sleep","eco"]` | Supported fan presets. |

## `luma-humidifier`

Humidifier/dehumidifier card with independently reusable power, target humidity, and mode controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"humidity"` | Humidity icon. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"humidifier"` | Humidifier domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `humidity` | `humidity` | number | `50` | Target relative humidity percentage. |
| `currentHumidity` | `current-humidity` | number | `42` | Measured humidity. |
| `mode` | `mode` | string | `"normal"` | Selected operating mode. |
| `modes` | `modes` | array | `["normal","eco","boost"]` | Available operating modes. |

## `luma-vacuum`

Vacuum start/pause/stop/dock/locate/spot-clean actions and fan-speed selection.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"vacuum"` | Vacuum domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `battery` | `battery` | number | `85` | Battery charge percentage. |
| `fanSpeed` | `fan-speed` | string | `"normal"` | Selected cleaning power. |
| `fanSpeeds` | `fan-speeds` | array | `["quiet","normal","turbo"]` | Supported cleaning power levels. |

## `luma-lock`

Lock/unlock/unlatch command card. The supplied state remains authoritative.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"lock"` | Lock icon. |
| `state` | `state` | string | `"locked"` | Authoritative lock state; issuing a command does not assume success. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"lock"` | Lock domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `supportsOpen` | `supports-open` | boolean | `true` | Show the unlatch/open-door command. |

## `luma-valve`

Valve open/stop/close actions and position control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"valve"` | Valve domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `position` | `position` | number | `50` | Valve position from closed (0) to open (100). |

## `luma-water-heater`

Water heater target temperature, operation mode, and away mode.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"temperature"` | Temperature icon. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"water_heater"` | Water heater domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `temperature` | `temperature` | number | `55` | Target water temperature. |
| `currentTemperature` | `current-temperature` | number | `48` | Measured water temperature. |
| `mode` | `mode` | string | `"eco"` | Selected operation mode. |
| `modes` | `modes` | array | `["off","eco","electric","performance"]` | Supported operation modes. |
| `away` | `away` | boolean | `false` | Away mode enabled. |

## `luma-siren`

Siren power, tone, volume, and duration controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"siren"` | Siren domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `tone` | `tone` | string | `"alarm"` | Selected tone. |
| `tones` | `tones` | array | `["alarm","chime","warning"]` | Available siren tones. |
| `volume` | `volume` | number | `50` | Siren volume percentage. |
| `duration` | `duration` | number | `10` | Playback duration in seconds. |

## `luma-remote`

Remote-control navigation, selection, home/back, and volume commands.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"remote"` | Remote domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |

## `luma-lawn-mower`

Lawn mower start, pause, and return-to-dock commands.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"lawn_mower"` | Lawn mower domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |

## `luma-counter`

Counter increment/decrement and reset controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"counter"` | Counter domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `value` | `value` | number | `0` | Current counter value. |
| `min` | `min` | number | `0` | Minimum value. |
| `max` | `max` | number | `100` | Maximum value. |
| `step` | `step` | number | `1` | Increment/decrement step. |

## `luma-timer`

Timer duration and start/pause/cancel/finish commands, with an optional timestamp-based live countdown.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"timer"` | Timer domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `duration` | `duration` | number | `300` | Configured timer duration in seconds. |
| `remaining` | `remaining` | number | `180` | Remaining duration in seconds, supplied by the application. |
| `finishesAt` | `finishes-at` | string | `""` | Optional ISO finish timestamp. A running timer displays the countdown to this instant. |

## `luma-update`

Update versions, release notes, installation progress and install/skip commands.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"update"` | Software update domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `installedVersion` | `installed-version` | string | `"1.0.0"` | Installed version. |
| `latestVersion` | `latest-version` | string | `"1.1.0"` | Available version. |
| `progress` | `progress` | number | `0` | Installation progress percentage. |
| `releaseNotes` | `release-notes` | string | `""` | Plain text release notes. Never interpreted as HTML. |

## `luma-automation`

Automation enable/disable and manual trigger controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"automation"` | Automation domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |

## `luma-script`

Script run/stop commands.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"script"` | Script domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |

## `luma-input-text`

Input-text entity card using the standalone text-field control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"input_text"` | Input text domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `value` | `value` | string | `""` | Current text value. |

## `luma-input-number`

Numeric helper entity card with synchronized slider and numeric stepper.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"input_number"` | Input number domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `value` | `value` | number | `0` | Current counter value. |
| `min` | `min` | number | `0` | Minimum value. |
| `max` | `max` | number | `100` | Maximum value. |
| `step` | `step` | number | `1` | Increment/decrement step. |

## `luma-input-select`

Select/helper entity card using the standalone select control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"input_select"` | Select/helper domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `value` | `value` | string | `"home"` | Selected option. |
| `options` | `options` | array | `["home","away","night"]` | Available options. |

## `luma-input-date`

Date entity detail control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"date"` | Date domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `value` | `value` | string | `"2026-11-10"` | Local date string, YYYY-MM-DD. |

## `luma-input-time`

Time entity detail control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"time"` | Time domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `value` | `value` | string | `"18:30"` | Local time string, HH:MM[:SS]. |

## `luma-input-datetime`

Date/time helper entity detail control.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"input_datetime"` | Date/time helper domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |
| `value` | `value` | string | `"2026-11-10T18:30"` | Local date/time without an implicit timezone. |

## `luma-scene`

Scene activation control, also used by scene-like entity details.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `"scene"` | Scene/button domain. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `showHeader` | `show-header` | boolean | `true` | Show the card/entity heading. Detail popups disable this to avoid repeating their own dialog title. |
| `data` | `data` | object | `{}` | Values for custom properties referenced by control definitions. |
| `controls` | `controls` | array | `[]` | Control definitions: {type, property?, label, options?, min?, max?, step?, unit?, commands?}. type is a registered luma tag. |

## `luma-entity`

Single entity state card with details action.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `unit` | `unit` | string | `""` | Unit for the displayed entity state. |

## `luma-horizontal-stack`

Horizontal stack composed through the shared stack layout.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `direction` | `direction` | string | `"horizontal"` | Horizontal layout direction. |
| `gap` | `gap` | number | `8` | Space between children in pixels. |

## `luma-vertical-stack`

Vertical stack composed through the shared stack layout.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `direction` | `direction` | string | `"vertical"` | Vertical layout direction. |
| `gap` | `gap` | number | `8` | Space between children in pixels. |

## `luma-conditional`

Conditional slotted card wrapper driven by a boolean property.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `visible` | `visible` | boolean | `true` | Whether the slotted content is visible. An application can derive this from any condition. |

## `luma-entity-filter`

Entities card filtered by supplied entity states, preserving hidden rows when visible rows change.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `entities` | `entities` | array | `[]` | Array of {label, state, icon?, secondary?, entityId?, color?, toggle?, disabled?} entity rows. |
| `showHeaderToggle` | `show-header-toggle` | boolean | `false` | Show a header switch that toggles all rows marked toggle. |
| `states` | `states` | array | `["on","home","active"]` | Show entities whose state is in this list. Empty means show all. |

## `luma-area`

Area summary composed from entity rows, header toggle, and temperature/humidity badges.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `entities` | `entities` | array | `[]` | Array of {label, state, icon?, secondary?, entityId?, color?, toggle?, disabled?} entity rows. |
| `showHeaderToggle` | `show-header-toggle` | boolean | `false` | Show a header switch that toggles all rows marked toggle. |
| `temperature` | `temperature` | number | `22` | Area temperature. |
| `humidity` | `humidity` | number | `50` | Area humidity percentage. |

## `luma-home-summary`

Home-wide state summary using the same area/entity primitives.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `entities` | `entities` | array | `[]` | Array of {label, state, icon?, secondary?, entityId?, color?, toggle?, disabled?} entity rows. |
| `showHeaderToggle` | `show-header-toggle` | boolean | `false` | Show a header switch that toggles all rows marked toggle. |
| `temperature` | `temperature` | number | `22` | Area temperature. |
| `humidity` | `humidity` | number | `50` | Area humidity percentage. |

## `luma-statistics-graph`

Statistics card composed from independently usable line or grouped-bar chart components.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `series` | `series` | array | `[]` | Chart series using the line/bar-chart data format. |
| `unit` | `unit` | string | `""` | Value unit. |
| `chartType` | `chart-type` | string | `"line"` | line or bar. |
| `stacked` | `stacked` | boolean | `false` | Use stacked signed bars for energy charts. |
| `labels` | `labels` | array | `[]` | Optional x-axis bar labels. |
| `total` | `total` | number | `0` | Optional total value shown in the card header. |
| `showTotal` | `show-total` | boolean | `false` | Display the total badge. |

## `luma-statistic`

Statistic value and period card, independent of the backend that computed it.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | number | `0` | Precomputed statistic from your application. |
| `unit` | `unit` | string | `""` | Statistic unit. |
| `period` | `period` | string | `"Today"` | Description of the aggregation period. |

## `luma-distribution`

Distribution/energy-breakdown card with proportional segments and value labels.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `items` | `items` | array | `[]` | Distribution segments as {label,value,color?}. |
| `unit` | `unit` | string | `"kWh"` | Segment value unit. |

## `luma-clock`

Local or supplied-time clock card with locale/time-zone formatting and timer cleanup.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `time` | `time` | string | `""` | ISO date/time to display. Empty follows the local clock. |
| `locale` | `locale` | string | `"en"` | Intl formatting locale. |
| `timeZone` | `time-zone` | string | `""` | IANA time zone; empty uses the browser zone. |
| `showSeconds` | `show-seconds` | boolean | `false` | Display seconds. |

## `luma-date`

Date card using the shared locale-aware clock foundation.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `time` | `time` | string | `""` | ISO date/time to display. Empty follows the local clock. |
| `locale` | `locale` | string | `"en"` | Intl formatting locale. |
| `timeZone` | `time-zone` | string | `""` | IANA time zone; empty uses the browser zone. |
| `showSeconds` | `show-seconds` | boolean | `false` | Display seconds. |

## `luma-todo`

To-do/shopping list composed from checkboxes, text field, and add/remove buttons.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `items` | `items` | array | `[]` | Items as {id,summary,completed}. Every change returns a new full array. |
| `newItem` | `new-item` | string | `""` | Draft item text. |

## `luma-calendar`

Month calendar with mouse/keyboard day selection, month navigation, and supplied event lists.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `events` | `events` | array | `[]` | Calendar events as {id,summary,start,end?,description?}; timestamps use ISO strings. |
| `date` | `date` | string | `"2026-11-10"` | Currently selected calendar day, YYYY-MM-DD. |

## `luma-activity`

Activity/logbook timeline driven entirely by supplied entries.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `entries` | `entries` | array | `[]` | Timeline entries as {label,state,time,entityId?}. |

## `luma-alert`

Dismissible info/warning/error/success message card.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `message` | `message` | string | `""` | Alert text. |
| `severity` | `severity` | string | `"info"` | info, warning, error, or success. |
| `dismissible` | `dismissible` | boolean | `true` | Show a dismiss button. |
| `dismissed` | `dismissed` | boolean | `false` | Whether the alert has been dismissed. |

## `luma-camera`

Camera snapshot or native-video card. Supply a browser-playable URL; backend WebRTC/HLS negotiation is handled by your application.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `src` | `src` | string | `""` | Snapshot or video URL. HTTP(S), blob, and relative URLs are accepted. |
| `live` | `live` | boolean | `false` | Render a native video element for browser-supported stream formats instead of a snapshot. |
| `alt` | `alt` | string | `"Camera snapshot"` | Snapshot alternative text. |
| `muted` | `muted` | boolean | `true` | Start native video muted. |

## `luma-webpage`

Sandboxed embedded webpage card. No page is fetched without a source.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `src` | `src` | string | `""` | HTTP(S) or relative page URL. Empty renders an empty state. |
| `height` | `height` | number | `320` | Frame height in pixels. |

## `luma-markdown`

Safe, dependency-free Markdown-subset card; raw HTML is always escaped.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `content` | `content` | string | `""` | Safe Markdown subset: headings, bold, italic, inline code, and line breaks. Raw HTML is escaped. |

## `luma-picture-entity`

Picture card with a state-bearing entity footer and details action.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `src` | `src` | string | `""` | Room/snapshot image URL. |
| `alt` | `alt` | string | `""` | Image description. |

## `luma-picture-glance`

Room picture composed with independent entity glance controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `src` | `src` | string | `""` | Room/snapshot image URL. |
| `alt` | `alt` | string | `""` | Image description. |
| `entities` | `entities` | array | `[]` | Glance entities as {label,state,icon?,entityId?}. |

## `luma-picture-elements`

Floorplan/background with independently interactive entity badges at percentage coordinates.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `src` | `src` | string | `""` | Floorplan/background image URL. |
| `elements` | `elements` | array | `[]` | Positioned entities as {x,y,label,state,icon?,entityId?,domain?}; x/y are percentages. |

## `luma-plant`

Plant status composed from entity row and independently reusable attribute table.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |
| `moisture` | `moisture` | number | `45` | Soil moisture percentage. |
| `temperature` | `temperature` | number | `22` | Plant temperature in °C. |
| `illuminance` | `illuminance` | number | `1200` | Illuminance in lx. |
| `conductivity` | `conductivity` | number | `500` | Soil conductivity in µS/cm. |

## `luma-form`

Reusable configurator/form composed from validated fields, selects, and a submit button.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `fields` | `fields` | array | `[]` | Form fields as {name,label,type?,required?,options?}. Types use native text/date/time inputs. |
| `data` | `data` | object | `{}` | Field values keyed by field name. |

## `luma-conversation`

Conversation UI with escaped messages, draft input, and a send event for your own assistant adapter.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `messages` | `messages` | array | `[]` | Messages as {role,content}. Content is always escaped. |
| `draft` | `draft` | string | `""` | Draft message. Sending emits an action; no external service is contacted. |

## `luma-shortcut`

Shortcut card that emits a navigate action for the application router.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"light"` | Built-in icon name. Use the icon slot for a custom SVG. |
| `state` | `state` | string | `"off"` | Displayed entity state. on, home, playing, heating, cooling, and open receive active styling. |
| `secondary` | `secondary` | string | `""` | Optional secondary text; overrides the displayed state. |
| `entityId` | `entity-id` | string | `""` | Opaque entity identifier returned in action and change event details. No backend connection is made. |
| `domain` | `domain` | string | `""` | Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted. |
| `detailProperties` | `detail-properties` | object | `{}` | Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Entity attribute name/value pairs shown in the Attributes detail tab. |
| `tapAction` | `tap-action` | string | `"more-info"` | Content action: more-info, toggle, press, none, or an application-defined action. |
| `iconTapAction` | `icon-tap-action` | string | `"auto"` | Icon action. auto toggles supported toggle domains, otherwise opens details. |
| `holdAction` | `hold-action` | string | `"more-info"` | Action after a 500ms pointer hold. none disables hold handling. |
| `doubleTapAction` | `double-tap-action` | string | `"none"` | Optional double-click action. A non-none action defers single clicks to distinguish the gestures. |
| `color` | `color` | string | `"amber"` | State accent: amber, blue, green, red, purple, orange, or any valid CSS color. |

## `luma-energy-node`

Standalone circular energy node with independent readings and optional source-mix ring segments.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `icon` | `icon` | string | `"home"` | Node icon. |
| `color` | `color` | string | `"blue"` | Node ring color. |
| `values` | `values` | array | `[]` | Displayed readings as {value,unit,color?,label?}. |
| `labelPosition` | `label-position` | string | `"bottom"` | Place the node label above or below its circle. |
| `segments` | `segments` | array | `[]` | Optional ring segments as {value,color} for the home energy-source mix. |

## `luma-flow-line`

Standalone SVG connection with an animated flow dot and reduced-motion support.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `path` | `path` | string | `"M0 50 H200"` | SVG path connecting nodes, using the supplied view-box coordinates. |
| `viewBox` | `view-box` | string | `"0 0 600 400"` | SVG viewBox of the containing flow diagram. |
| `color` | `color` | string | `"blue"` | Flow line and moving-dot color. |
| `active` | `active` | boolean | `true` | Show a moving flow indicator. |
| `reverse` | `reverse` | boolean | `false` | Reverse the flow direction. |
| `duration` | `duration` | number | `4` | Seconds per flow animation cycle. |

## `luma-energy-flow`

Home Assistant-style connected energy distribution diagram composed from independently reusable nodes and animated flow lines.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `solar` | `solar` | number | `1.17` | Solar generation. |
| `grid` | `grid` | number | `4.03` | Signed net grid flow; positive imports, negative exports. |
| `home` | `home` | number | `5.11` | Home consumption. |
| `battery` | `battery` | number | `1.18` | Signed net battery discharge. |
| `gridImport` | `grid-import` | number | `0` | Separate grid import reading; zero falls back to positive grid. |
| `gridExport` | `grid-export` | number | `0.12` | Separate grid export reading; zero falls back to negative grid. |
| `batteryCharge` | `battery-charge` | number | `1.16` | Battery charging reading. |
| `batteryDischarge` | `battery-discharge` | number | `1.18` | Battery discharge reading. |
| `gas` | `gas` | number | `1.09` | Gas consumption. |
| `water` | `water` | number | `154` | Water consumption. |
| `showGas` | `show-gas` | boolean | `true` | Display the gas node. |
| `showWater` | `show-water` | boolean | `true` | Display the water node. |
| `unit` | `unit` | string | `"kWh"` | Electrical value unit. |
| `gasUnit` | `gas-unit` | string | `"m³"` | Gas unit. |
| `waterUnit` | `water-unit` | string | `"L"` | Water unit. |

## `luma-energy`

Energy distribution card composed from the standalone connected flow diagram.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `solar` | `solar` | number | `1.17` | Solar generation. |
| `grid` | `grid` | number | `4.03` | Signed net grid flow; positive imports, negative exports. |
| `home` | `home` | number | `5.11` | Home consumption. |
| `battery` | `battery` | number | `1.18` | Signed net battery discharge. |
| `gridImport` | `grid-import` | number | `0` | Separate grid import reading; zero falls back to positive grid. |
| `gridExport` | `grid-export` | number | `0.12` | Separate grid export reading; zero falls back to negative grid. |
| `batteryCharge` | `battery-charge` | number | `1.16` | Battery charging reading. |
| `batteryDischarge` | `battery-discharge` | number | `1.18` | Battery discharge reading. |
| `gas` | `gas` | number | `1.09` | Gas consumption. |
| `water` | `water` | number | `154` | Water consumption. |
| `showGas` | `show-gas` | boolean | `true` | Display the gas node. |
| `showWater` | `show-water` | boolean | `true` | Display the water node. |
| `unit` | `unit` | string | `"kWh"` | Electrical value unit. |
| `gasUnit` | `gas-unit` | string | `"m³"` | Gas unit. |
| `waterUnit` | `water-unit` | string | `"L"` | Water unit. |
| `label` | `label` | string | `"Energy distribution"` | Card title. |

## `luma-data-table`

Standalone escaped-data table with column definitions, swatch cells, and an optional totals footer.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `columns` | `columns` | array | `[]` | Column definitions as {key,label}. |
| `rows` | `rows` | array | `[]` | Objects keyed by column name. Cells can be strings/numbers or {text,color?,swatch?}. |
| `footer` | `footer` | object | `{}` | Optional footer row keyed by column names. |

## `luma-energy-summary`

Energy-source totals and costs table, composed from the standalone data-table component.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `sources` | `sources` | array | `[]` | Energy sources as {label,energy,unit,cost?,color?}. |
| `currency` | `currency` | string | `"USD"` | ISO currency code for costs. |
| `locale` | `locale` | string | `"en"` | Number/currency formatting locale. |

## `luma-date-range-picker`

Standalone energy/history date toolbar with native calendar, Today, previous/next, and day/week/month/year navigation.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `value` | `value` | object | `{"start":"2026-11-10","end":"2026-11-10"}` | Selected inclusive date range as {start,end}, both YYYY-MM-DD. |
| `period` | `period` | string | `"day"` | Navigation period: day, week, month, or year. |

## `luma-energy-dashboard`

Energy dashboard assembled from reusable flow, totals table, history plot, signed stacked-bar charts, grid, and date-range controls.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `flow` | `flow` | object | `{}` | Properties forwarded to luma-energy-flow. |
| `sources` | `sources` | array | `[]` | Sources forwarded to luma-energy-summary. |
| `powerSeries` | `power-series` | array | `[]` | Power-source history chart series. |
| `electricitySeries` | `electricity-series` | array | `[]` | Signed electrical energy series for stacked bars. |
| `gasSeries` | `gas-series` | array | `[]` | Gas consumption bar series. |
| `waterSeries` | `water-series` | array | `[]` | Water consumption bar series. |
| `labels` | `labels` | array | `[]` | Labels for hourly/daily bar positions. |
| `dateRange` | `date-range` | object | `{"start":"2026-11-10","end":"2026-11-10"}` | Selected date interval. luma-change asks the application to supply data for the new interval. |

## `luma-map`

Library-free Mercator map with optional supplied slippy tiles, pointer panning, zoom buttons, and interactive entity markers.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `center` | `center` | object | `{"latitude":52.52,"longitude":13.405}` | Map center as {latitude,longitude}, in WGS84 degrees. |
| `zoom` | `zoom` | number | `12` | Slippy-map zoom level, from 1 to 19. |
| `markers` | `markers` | array | `[]` | Markers as {latitude,longitude,label,entityId?,state?,icon?}. |
| `tileUrl` | `tile-url` | string | `""` | Optional HTTP(S) tile template using {z}/{x}/{y}. No external tiles are requested unless you supply a URL. |
| `attribution` | `attribution` | string | `""` | Required attribution text for your supplied tile provider. |

## `luma-dialog`

Standalone modal shell with native focus trapping, Escape/backdrop dismissal, return focus, header/footer slots, and responsive sizing.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `open` | `open` | boolean | `false` | Show a modal using the native top layer and focus trap. Escape, close button, and backdrop dismiss it. |
| `dismissible` | `dismissible` | boolean | `true` | Allow Escape, close-button, and backdrop dismissal. |
| `back` | `back` | boolean | `false` | Show a Back to details action in place of Close; emits luma-back. |
| `width` | `width` | number | `580` | Preferred dialog width in pixels, constrained to the viewport. |

## `luma-confirm-dialog`

Reusable confirmation popup composed from the native dialog and buttons; confirmation is reported as luma-confirm.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `open` | `open` | boolean | `false` | Whether to show the confirmation popup. |
| `message` | `message` | string | `"Are you sure?"` | Plain-text confirmation message. |
| `confirmLabel` | `confirm-label` | string | `"Confirm"` | Confirm button text. |
| `cancelLabel` | `cancel-label` | string | `"Cancel"` | Cancel button text. |

## `luma-state-panel`

Reusable read-only entity state, history, and attributes panel for sensors, people, sun, binary sensors, and unknown domains.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `state` | `state` | string | `"unknown"` | Displayed entity state. |
| `entityAttributes` | `entity-attributes` | object | `{}` | Attribute key/value pairs. |
| `series` | `series` | array | `[]` | Optional history series, using the luma-line-chart data format. |
| `unit` | `unit` | string | `""` | State unit. |
| `icon` | `icon` | string | `"chart"` | Entity icon. |
| `lastChangedLabel` | `last-changed-label` | string | `""` | Application-formatted last-changed text. |

## `luma-more-info`

Domain-aware entity details popup composed from the standalone dialog, tabs, device controls, history chart, and attributes table.

| Property | Attribute | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `label` | `label` | string | `""` | Accessible name and primary label of the element. |
| `disabled` | `disabled` | boolean | `false` | Disables user interaction. Boolean attributes use presence; disabled="false" also disables. |
| `open` | `open` | boolean | `false` | Open the entity details popup. |
| `entity` | `entity` | object | `{}` | Entity snapshot: {domain,entityId,label,state,properties,entityAttributes,series}. All device values are properties supplied by the application. |
| `view` | `view` | string | `"info"` | Selected popup view: info, history, or attributes. |
