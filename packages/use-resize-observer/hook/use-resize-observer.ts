import { useCallback, useLayoutEffect } from "react";
import {
  RefHTMLElement,
  useResizeObserverCallback,
} from "./use-resize-observer.types";
import { getResizeObserverCallback } from "./use-resize-observer.utils";

export default function useResizeObserver<
  T extends keyof HTMLElementTagNameMap
>(ref: RefHTMLElement<T>, callback: useResizeObserverCallback) {
  const createObserver = useCallback((element: HTMLElementTagNameMap[T]) => {
    const applyCallback = getResizeObserverCallback(element);
    const setupObserver = applyCallback(callback);

    const resizeObserver = new ResizeObserver(setupObserver);

    return resizeObserver;
  }, []);

  useLayoutEffect(() => {
    const element = ref.current;

    if (element == null) return;

    const resizeObserver = createObserver(element);

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, []);
}