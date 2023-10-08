import { useEffect, useLayoutEffect } from "react";
import useIsomorphicLayoutEffect from "./use-isomorphic-layout-effect";
import { renderHook } from "@testing-library/react";

const getWindowMock = () => {
  const originalWindow = global.window;
  global.window = undefined as any;

  return () => {
    global.window = originalWindow;
  };
};

describe(useIsomorphicLayoutEffect.name, () => {
  test("should use useLayoutEffect on client", () => {
    const { result } = renderHook(() => useIsomorphicLayoutEffect());

    expect(result.current).toBe(useLayoutEffect);
  });

  test("should use useEffect on the server", () => {
    const resetMock = getWindowMock();

    const result = useIsomorphicLayoutEffect();

    expect(result).toBe(useEffect);

    resetMock();
  });
});
