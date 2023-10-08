import { MutableRefObject } from "react";

export type RefHTMLElement<T extends keyof HTMLElementTagNameMap> =
  MutableRefObject<HTMLElementTagNameMap[T] | null | undefined>;

export type useResizeObserverCallback = (entry: ResizeObserverEntry) => void;
