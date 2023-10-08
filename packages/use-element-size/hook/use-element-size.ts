import { useResizeObserver } from "@wild-hooks/use-resize-observer";
import { useMemo, useReducer } from "react";
import { type UseElementSizeOptions } from "./use-element-size.types";
import {
  applyResizeObserverCallback,
  elementSizeReducer,
  initialState,
} from "./use-element-size.utils";

export default function useElementSize<T extends keyof HTMLElementTagNameMap>(
  options: UseElementSizeOptions<T>
) {
  const [size, dispatch] = useReducer(elementSizeReducer, initialState);

  const resizeObserverCallback = useMemo(
    () => applyResizeObserverCallback(dispatch, options.dimension),
    []
  );

  useResizeObserver(options.ref, resizeObserverCallback);

  return size;
}
