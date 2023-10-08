import { useEffect } from "react";

describe("useIsomorphicLayoutEffect on server", () => {
  beforeAll(() => {
    vi.stubGlobal("window", undefined);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  test("should pick useLayoutEffect when window not defined", async () => {
    const effect = await import("./use-isomorphic-layout-effect");

    expect(effect.default).toBe(useEffect);
  });
});
