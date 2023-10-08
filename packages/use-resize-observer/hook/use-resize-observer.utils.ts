import { useResizeObserverCallback } from "./use-resize-observer.types";

export const getResizeObserverCallback = <
  T extends keyof HTMLElementTagNameMap
>(
  element: HTMLElementTagNameMap[T]
) => {
  return (callback: useResizeObserverCallback) =>
    (entries: ResizeObserverEntry[]) => {
      const entry = entries.find((item) => item.target === element);

      if (!entry) return;

      callback(entry);
    };
};
