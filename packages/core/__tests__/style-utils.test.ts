import { describe, expect, it } from "vitest";
import { buildBoxShadowChain, hasBorderRadiusStyle } from "../src/style-utils.js";

describe("buildBoxShadowChain", () => {
  it("serializes hex shadows and skips invisible entries", () => {
    expect(
      buildBoxShadowChain([
        { offsetX: 0, offsetY: 4, blur: 8, spread: 0, color: "#000", opacity: 0 },
        { offsetX: 1, offsetY: 2, blur: 4, spread: -1, color: "#ff0000", opacity: 0.5 },
      ]),
    ).toBe("1px 2px 4px -1px rgba(255,0,0,0.5)");
  });

  it("preserves non-hex colors without producing invalid rgba values", () => {
    expect(
      buildBoxShadowChain({
        offsetX: 0,
        offsetY: 4,
        blur: 8,
        spread: 0,
        color: "oklch(0.6 0.15 250 / 0.3)",
        opacity: 0.3,
      }),
    ).toBe("0px 4px 8px 0px color-mix(in srgb, oklch(0.6 0.15 250 / 0.3) 30%, transparent)");
  });
});

describe("hasBorderRadiusStyle", () => {
  it("recognizes shorthand and per-corner properties", () => {
    expect(hasBorderRadiusStyle({ borderRadius: 4 })).toBe(true);
    expect(hasBorderRadiusStyle({ borderTopLeftRadius: 4 })).toBe(true);
  });

  it("ignores missing, undefined, and non-style values", () => {
    expect(hasBorderRadiusStyle(undefined)).toBe(false);
    expect(hasBorderRadiusStyle({ borderRadius: undefined })).toBe(false);
    expect(hasBorderRadiusStyle("border-radius: 4px")).toBe(false);
  });
});
