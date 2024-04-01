import React, { FunctionComponent } from "react";
import { LabelProps, RankedTester, rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsLabelProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index";
import { withVanillaControlProps } from "../util";

/**
 * Default tester for a label.
 * @type {RankedTester}
 */
export const labelRendererTester: RankedTester = rankWith(1, uiTypeIs("Label"));

/**
 * Default renderer for a label.
 */
export const LabelRenderer: FunctionComponent<
  LabelProps & VanillaRendererProps
> = ({ text, visible, getStyleAsClassName }) => {
  const classNames = getStyleAsClassName?.("label-control");
  const isHidden = !visible;

  return (
    <label hidden={isHidden} className={classNames}>
      {text}
    </label>
  );
};

export default withVanillaControlProps(withJsonFormsLabelProps(LabelRenderer));
