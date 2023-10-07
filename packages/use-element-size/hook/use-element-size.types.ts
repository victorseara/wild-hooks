import { MutableRefObject } from "react";

export type ElementSize = {
  height: number;
  width: number;
};

export type Dimension = keyof ElementSize;

export type UseElementSizeOptions<T extends keyof HTMLElementTagNameMap> = {
  dimension?: Dimension;
  ref: MutableRefObject<HTMLElementTagNameMap[T] | null | undefined>;
};

export enum UseElementSizeActionType {
  UPDATE_SINGLE_DIMENSION = "UPDATE_SINGLE_DIMENSION",
  UPDATE_BOTH_DIMENSIONS = "UPDATE_BOTH_DIMENSIONS",
}

export type UpdateSingleDimensionAction = {
  type: UseElementSizeActionType.UPDATE_SINGLE_DIMENSION;
  dimension: Dimension;
  value: number;
};

export type UpdateBothDimensionsAction = {
  type: UseElementSizeActionType.UPDATE_BOTH_DIMENSIONS;
  size: ElementSize;
};

export type UseElementSizeAction =
  | UpdateSingleDimensionAction
  | UpdateBothDimensionsAction;
