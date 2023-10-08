import { defineProject, mergeConfig } from "vitest/config";
import vitestBase from "../configs/vitest.base";

export default mergeConfig(
  vitestBase,
  //@ts-ignore
  defineProject({
    test: {
      environment: "happy-dom",
    },
  })
);
