import {
  Dimension,
  UseElementSizeAction,
  UseElementSizeActionType,
} from "./use-element-size.types";
import {
  isSizesEquals,
  initialState,
  isDimensionEquals,
  elementSizeReducer,
} from "./use-element-size.utils";

describe(isSizesEquals.name, () => {
  test.each([
    {
      case: "equals",
      expected: true,
      previousValue: initialState,
      currentValue: { height: 0, width: 0 },
    },
    {
      case: "notEquals",
      expected: false,
      previousValue: initialState,
      currentValue: { height: 100, width: 100 },
    },
  ])("$case", (args) => {
    expect(isSizesEquals(args.previousValue, args.currentValue)).toBe(
      args.expected
    );
  });
});

describe(isDimensionEquals.name, () => {
  test.each([
    {
      case: "equals",
      dimension: "height" as Dimension,
      previousValue: { height: 0, width: 0 },
      value: 0,
      expected: true,
    },
    {
      case: "notEquals",
      dimension: "height" as Dimension,
      previousValue: { height: 0, width: 0 },
      value: 100,
      expected: false,
    },
    {
      case: "equals",
      dimension: "width" as Dimension,
      previousValue: { height: 0, width: 0 },
      value: 0,
      expected: true,
    },
    {
      case: "notEquals",
      dimension: "width" as Dimension,
      previousValue: { height: 0, width: 0 },
      value: 100,
      expected: false,
    },
  ])("$dimension -> $case", (args) => {
    expect(
      isDimensionEquals(args.previousValue, args.value, args.dimension)
    ).toBe(args.expected);
  });
});

describe(elementSizeReducer.name, () => {
  test.each(["height", "width"] as Dimension[])(
    "%s -> should UPDATE_SINGLE_DIMENSION",
    (dimension) => {
      const action: UseElementSizeAction = {
        dimension,
        type: UseElementSizeActionType.UPDATE_SINGLE_DIMENSION,
        value: 100,
      };

      expect(elementSizeReducer(initialState, action)).toHaveProperty(
        dimension,
        action.value
      );
    }
  );

  test.each(["height", "width"] as Dimension[])(
    "%s -> shouldn't UPDATE_SINGLE_DIMENSION",
    (dimension) => {
      const action: UseElementSizeAction = {
        dimension,
        type: UseElementSizeActionType.UPDATE_SINGLE_DIMENSION,
        value: 0,
      };

      expect(elementSizeReducer(initialState, action)).toEqual(initialState);
    }
  );

  test("should UPDATE_BOTH_DIMENSIONS", () => {
    const action: UseElementSizeAction = {
      size: { height: 100, width: 100 },
      type: UseElementSizeActionType.UPDATE_BOTH_DIMENSIONS,
    };

    expect(elementSizeReducer(initialState, action)).toEqual({
      height: 100,
      width: 100,
    });
  });

  test("shouldn't UPDATE_BOTH_DIMENSIONS", () => {
    const action: UseElementSizeAction = {
      size: { height: 0, width: 0 },
      type: UseElementSizeActionType.UPDATE_BOTH_DIMENSIONS,
    };

    expect(elementSizeReducer(initialState, action)).toEqual({
      height: 0,
      width: 0,
    });
  });
});
