import React from "react";
import {
  CellProps,
  isDateTimeControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index";
import { withVanillaCellProps } from "../util/index";

export const DateTimeCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const toISOString = (inputDateTime: string) => {
    return inputDateTime === "" ? "" : inputDateTime + ":00.000Z";
  };

  return (
    <input
      type="datetime-local"
      value={(data || "").substr(0, 16)}
      onChange={(ev) => handleChange(path, toISOString(ev.target.value))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    />
  );
};
/**
 * Default tester for datetime controls.
 * @type {RankedTester}
 */
export const dateTimeCellTester: RankedTester = rankWith(2, isDateTimeControl);

export default withJsonFormsCellProps(withVanillaCellProps(DateTimeCell));
