import { renderHook } from "@testing-library/react";
import useResizeObserver from "./use-resize-observer";

describe(useResizeObserver.name, () => {
  test("should set an observer on the passed element", () => {
    const spyOnObserve = vi.spyOn(ResizeObserver.prototype, "observe");
    const ref = { current: document.createElement("div") };
    const callbackMock = vi.fn();

    renderHook(() => useResizeObserver(ref, callbackMock));

    expect(spyOnObserve).toHaveBeenCalledWith(ref.current);
  });

  test.each([null, undefined])(
    "shouldn't set an observer if the passed element is invalid (%s)",
    (args) => {
      const ref = { current: args };
      const spyOnObserve = vi.spyOn(ResizeObserver.prototype, "observe");
      const callbackMock = vi.fn();

      renderHook(() => useResizeObserver(ref, callbackMock));

      expect(spyOnObserve).not.toHaveBeenCalled();
    }
  );

  test("should remove the observer on unmount", () => {
    const ref = { current: document.createElement("div") };
    const spyOnUnobserve = vi.spyOn(ResizeObserver.prototype, "unobserve");
    const callbackMock = vi.fn();

    const { unmount } = renderHook(() => useResizeObserver(ref, callbackMock));

    unmount();

    expect(spyOnUnobserve).toHaveBeenCalledWith(ref.current);
  });
});
