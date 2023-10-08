import { MutableRefObject } from "react";

export type RefHTMLElement<T extends keyof HTMLElementTagNameMap> =
  MutableRefObject<HTMLElementTagNameMap[T] | null | undefined>;

export type useResizeObserverCallback<T extends keyof HTMLElementTagNameMap> = (
  entries: ResizeObserverEntry[],
  element: HTMLElementTagNameMap[T]
) => void;
