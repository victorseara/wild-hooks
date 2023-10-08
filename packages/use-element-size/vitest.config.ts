import { defineProject, mergeConfig } from "vitest/config";
import vitestBase from "../configs/vitest.base";
import { resolve } from "path";

export default mergeConfig(
  vitestBase,
  //@ts-ignore
  defineProject({
    test: {
      environment: "happy-dom",
      alias: {
        "@wild-hooks": resolve(__dirname, "../"),
      },
    },
  })
);
