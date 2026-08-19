import { NEXA_ICON_CATALOG } from './icon-catalog';

describe('Nexa PrimeIcon catalog', () => {
  it('exposes every renderable local icon and excludes utility modifiers', () => {
    expect(NEXA_ICON_CATALOG).toHaveLength(83);
    expect(NEXA_ICON_CATALOG.some((icon) => icon.name === 'pi-spin')).toBe(false);
    expect(new Set(NEXA_ICON_CATALOG.map((icon) => icon.name)).size).toBe(NEXA_ICON_CATALOG.length);
  });
});
