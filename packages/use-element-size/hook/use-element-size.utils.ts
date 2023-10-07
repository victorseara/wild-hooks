import {
  Dimension,
  UseElementSizeActionType,
  type ElementSize,
  type UseElementSizeAction,
} from "./use-element-size.types";

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
  switch (action.type) {
    case UseElementSizeActionType.UPDATE_SINGLE_DIMENSION: {
      if (isDimensionEquals(state, action.value, action.dimension))
        return state;
      return {
        ...state,
        [action.dimension]: action.value,
      };
    }
    case UseElementSizeActionType.UPDATE_BOTH_DIMENSIONS:
      {
        if (isSizesEquals(state, action.size)) return state;
      }
      return action.size;
    default:
      return state;
  }
};

export const initialState: ElementSize = {
  height: 0,
  width: 0,
};
