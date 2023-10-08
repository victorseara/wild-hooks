import { Dispatch } from "react";
import {
  Dimension,
  UseElementSizeActionType,
  type ElementSize,
  type UseElementSizeAction,
} from "./use-element-size.types";
import type { UseResizeObserverCallback } from "@wild-hooks/use-resize-observer";

export const isSizesEquals = (
  previousSize: ElementSize,
  currentSize: ElementSize
) =>
  previousSize.height === currentSize.height &&
  previousSize.width === currentSize.width;

export const isDimensionEquals = (
  previousSize: ElementSize,
  value: number,
  dimension: Dimension
) => previousSize[dimension] === value;

export const elementSizeReducer = (
  state: ElementSize,
  action: UseElementSizeAction
) => {
  if (action.type === UseElementSizeActionType.UPDATE_SINGLE_DIMENSION) {
    return isDimensionEquals(state, action.value, action.dimension)
      ? state
      : {
          ...state,
          [action.dimension]: action.value,
        };
  }

  return isSizesEquals(state, action.size) ? state : action.size;
};

export const initialState: ElementSize = {
  height: 0,
  width: 0,
};

export const applyResizeObserverCallback = <
  T extends keyof HTMLElementTagNameMap
>(
  dispatch: Dispatch<UseElementSizeAction>,
  dimension?: Dimension
): UseResizeObserverCallback<T> => {
  return (entries, element) => {
    const entry = entries.find((entry) => entry.target === element);

    if (!entry) return;

    const newSize: ElementSize = {
      height: entry.target.clientHeight,
      width: entry.target.clientWidth,
    };

    if (dimension) {
      return dispatch({
        type: UseElementSizeActionType.UPDATE_SINGLE_DIMENSION,
        dimension: dimension,
        value: newSize[dimension],
      });
    }

    return dispatch({
      type: UseElementSizeActionType.UPDATE_BOTH_DIMENSIONS,
      size: newSize,
    });
  };
};
