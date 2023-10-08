import { useResizeObserverCallback } from "./use-resize-observer.types";

export const getResizeObserverCallback = <
  T extends keyof HTMLElementTagNameMap
>(
  element: HTMLElementTagNameMap[T]
) => {
  return (callback: useResizeObserverCallback<T>) =>
    (entries: ResizeObserverEntry[]) => {
      callback(entries, element);
    };
};
