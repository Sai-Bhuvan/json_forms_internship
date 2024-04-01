import React from "react";
import {
  CellProps,
  isMultiLineControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index";
import { withVanillaCellProps } from "../util/index";
import merge from "lodash/merge";

export const TextAreaCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, config, uischema, path, handleChange } =
    props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  return (
    <textarea
      value={data || ""}
      onChange={(ev) =>
        handleChange(path, ev.target.value === "" ? undefined : ev.target.value)
      }
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      placeholder={appliedUiSchemaOptions.placeholder}
    />
  );
};

/**
 * Tester for a multi-line string control.
 * @type {RankedTester}
 */
export const textAreaCellTester: RankedTester = rankWith(2, isMultiLineControl);

export default withJsonFormsCellProps(withVanillaCellProps(TextAreaCell));
