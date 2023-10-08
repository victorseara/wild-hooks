import { useLayoutEffect, useReducer } from "react";
import {
  UseElementSizeActionType,
  type ElementSize,
  type UseElementSizeOptions,
} from "./use-element-size.types";
import { elementSizeReducer, initialState } from "./use-element-size.utils";

export default function useElementSize<T extends keyof HTMLElementTagNameMap>(
  options: UseElementSizeOptions<T>
) {
  const [size, dispatch] = useReducer(elementSizeReducer, initialState);

  useLayoutEffect(() => {
    const element = options.ref.current;

    if (element == null) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries.find((item) => item.target === element);

      if (!entry) return;

      const newSize: ElementSize = {
        height: entry.target.clientHeight,
        width: entry.target.clientWidth,
      };

      if (options.dimension) {
        dispatch({
          type: UseElementSizeActionType.UPDATE_SINGLE_DIMENSION,
          dimension: options.dimension,
          value: newSize[options.dimension],
        });
        return;
      }

      return dispatch({
        type: UseElementSizeActionType.UPDATE_BOTH_DIMENSIONS,
        size: newSize,
      });
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, []);

  return size;
}
