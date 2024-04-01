import React from "react";
import {
  and,
  ControlProps,
  isOneOfEnumControl,
  optionIs,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withVanillaControlProps } from "../util";
import type { VanillaRendererProps } from "../index";
import { withJsonFormsOneOfEnumProps } from "@jsonforms/react";
import { RadioGroup } from "./RadioGroup";

export const OneOfRadioGroupControl = (
  props: ControlProps & VanillaRendererProps
) => {
  return <RadioGroup {...props} />;
};

export const oneOfRadioGroupControlTester: RankedTester = rankWith(
  3,
  and(isOneOfEnumControl, optionIs("format", "radio"))
);

export default withVanillaControlProps(
  withJsonFormsOneOfEnumProps(OneOfRadioGroupControl)
);
