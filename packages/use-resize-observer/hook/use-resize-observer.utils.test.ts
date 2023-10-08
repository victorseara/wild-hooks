import { getResizeObserverCallback } from "./use-resize-observer.utils";

describe(getResizeObserverCallback.name, () => {
  test("should apply callback to the entry", () => {
    const ref = { current: document.createElement("div") };
    const callbackMock = vi.fn();
    const entry = { target: ref.current } as unknown as ResizeObserverEntry;

    const applyCallback = getResizeObserverCallback(ref.current);
    const setupObserver = applyCallback(callbackMock);
    setupObserver([entry]);

    expect(callbackMock).toHaveBeenCalledWith(entry);
  });

  test("shouldn't apply callback in entry was not found", () => {
    const ref = { current: document.createElement("div") };
    const callbackMock = vi.fn();

    const applyCallback = getResizeObserverCallback(ref.current);
    const setupObserver = applyCallback(callbackMock);
    setupObserver([]);

    expect(callbackMock).not.toHaveBeenCalled();
  });
});
