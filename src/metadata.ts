/** A public property and its corresponding kebab-case HTML attribute. */
export interface PropertyDefinition {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  default: unknown;
  description: string;
}
export type Schema = Record<string, PropertyDefinition>;
export const prop = (type: PropertyDefinition['type'], value: unknown, description: string): PropertyDefinition => ({ type, default: value, description });
export const common: Schema = {
  label: prop('string', '', 'Accessible name and primary label of the element.'),
  disabled: prop('boolean', false, 'Disables user interaction. Boolean attributes use presence; disabled="false" also disables.'),
};
export const entity: Schema = {
  ...common,
  icon: prop('string', 'light', 'Built-in icon name. Use the icon slot for a custom SVG.'),
  state: prop('string', 'off', 'Displayed entity state. on, home, playing, heating, cooling, and open receive active styling.'),
  secondary: prop('string', '', 'Optional secondary text; overrides the displayed state.'),
  entityId: prop('string', '', 'Opaque entity identifier returned in action and change event details. No backend connection is made.'),
  domain: prop('string','','Entity domain such as light, climate, cover, fan, or sensor. Inferred from entity-id when omitted.'),
  detailProperties: prop('object',{},'Additional domain-specific properties for the automatic details popup, such as brightness, rgbColor, modes, or history.'),
  entityAttributes: prop('object',{},'Entity attribute name/value pairs shown in the Attributes detail tab.'),
  tapAction: prop('string','more-info','Content action: more-info, toggle, press, none, or an application-defined action.'),
  iconTapAction: prop('string','auto','Icon action. auto toggles supported toggle domains, otherwise opens details.'),
  holdAction: prop('string','more-info','Action after a 500ms pointer hold. none disables hold handling.'),
  doubleTapAction: prop('string','none','Optional double-click action. A non-none action defers single clicks to distinguish the gestures.'),
  color: prop('string', 'amber', 'State accent: amber, blue, green, red, purple, orange, or any valid CSS color.'),
};
export const catalog: Array<{tag: string; name: string; description: string; schema: Schema}> = [];
export const attributeName = (name: string): string => name.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
