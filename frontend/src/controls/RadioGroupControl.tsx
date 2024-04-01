import React from "react";
import {
  and,
  ControlProps,
  isEnumControl,
  optionIs,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsEnumProps } from "@jsonforms/react";
import { RadioGroup } from "./RadioGroup";
import { withVanillaControlProps } from "../util";
import type { VanillaRendererProps } from "../index";
export const RadioGroupControl = (
  props: ControlProps & VanillaRendererProps
) => {
  return <RadioGroup {...props} />;
};

export const radioGroupControlTester: RankedTester = rankWith(
  3,
  and(isEnumControl, optionIs("format", "radio"))
);
export default withVanillaControlProps(
  withJsonFormsEnumProps(RadioGroupControl)
);
