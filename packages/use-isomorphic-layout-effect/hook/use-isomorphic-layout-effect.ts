import React from "react";

export default function useIsomorphicLayoutEffect() {
  return typeof window !== "undefined"
    ? React.useLayoutEffect
    : React.useEffect;
}
