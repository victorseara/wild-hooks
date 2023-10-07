import { renderHook } from "@testing-library/react";
import useElementSize from "./use-element-size";
import { initialState } from "./use-element-size.utils";

describe(useElementSize.name, () => {
  test("should initialize with a valid state", () => {
    const ref = { current: document.createElement("div") };

    const { result } = renderHook(() => useElementSize({ ref }));

    expect(result.current).toEqual(initialState);
  });

  test("should set an observer on the passed element", () => {
    const ref = { current: document.createElement("div") };
    const spyOnObserve = vi.spyOn(ResizeObserver.prototype, "observe");

    renderHook(() => useElementSize({ ref }));

    expect(spyOnObserve).toHaveBeenCalledWith(ref.current);
  });

  test.each([null, undefined])(
    "shouldn't set an observer if the passed element is invalid (%s)",
    (args) => {
      const ref = { current: args };
      const spyOnObserve = vi.spyOn(ResizeObserver.prototype, "observe");

      renderHook(() => useElementSize({ ref }));

      expect(spyOnObserve).not.toHaveBeenCalled();
    }
  );

  test("should remove the observer on unmount", () => {
    const ref = { current: document.createElement("div") };
    const spyOnUnobserve = vi.spyOn(ResizeObserver.prototype, "unobserve");

    const { unmount } = renderHook(() => useElementSize({ ref }));

    unmount();

    expect(spyOnUnobserve).toHaveBeenCalledWith(ref.current);
  });
});
