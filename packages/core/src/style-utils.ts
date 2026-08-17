import type { ShadowConfig } from "./types.js";

const HEX_COLOR = /^#?[0-9a-f]{3}(?:[0-9a-f]{3})?$/i;
const RADIUS_PROPERTY = /^border[A-Za-z]*Radius$/;

function hexToRgbChannels(hex: string): { r: number; g: number; b: number } | null {
  if (!HEX_COLOR.test(hex)) return null;
  const h = hex.replace("#", "");
  const expanded = h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h;
  return {
    r: parseInt(expanded.substring(0, 2), 16),
    g: parseInt(expanded.substring(2, 4), 16),
    b: parseInt(expanded.substring(4, 6), 16),
  };
}

/** Serialize shadow configs for a native CSS `box-shadow` declaration. */
export function buildBoxShadowChain(shadows: ShadowConfig | ShadowConfig[]): string {
  const arr = Array.isArray(shadows) ? shadows : [shadows];
  const parts: string[] = [];
  for (const shadow of arr) {
    if (shadow.opacity <= 0) continue;
    const { offsetX, offsetY, blur, spread, color, opacity } = shadow;
    const geometry = `${offsetX}px ${offsetY}px ${blur}px ${spread}px`;
    const rgb = hexToRgbChannels(color);
    const paint = rgb
      ? `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`
      : opacity < 1
        ? `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`
        : color;
    parts.push(`${geometry} ${paint}`);
  }
  return parts.join(", ");
}

/** Return whether a style object supplies a border-radius property. */
export function hasBorderRadiusStyle(style: unknown): boolean {
  if (!style || typeof style !== "object") return false;
  const record = style as Record<string, unknown>;
  return Object.keys(record).some((key) => record[key] !== undefined && RADIUS_PROPERTY.test(key));
}
