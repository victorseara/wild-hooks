import { useLayoutEffect } from "react";

describe("useIsomorphicLayoutEffect on client", () => {
  test("should pick useLayoutEffect when window is defined", async () => {
    const effect = await import("./use-isomorphic-layout-effect");

    expect(effect.default).toBe(useLayoutEffect);
  });
});
