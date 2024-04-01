import React from "react";
import {
  CellProps,
  isIntegerControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index";
import { withVanillaCellProps } from "../util/index";

const toNumber = (value: string) =>
  value === "" ? undefined : parseInt(value, 10);

export const IntegerCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <input
      type="number"
      step="1"
      value={data ?? ""}
      onChange={(ev) => handleChange(path, toNumber(ev.target.value))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    />
  );
};
/**
 * Default tester for integer controls.
 * @type {RankedTester}
 */
export const integerCellTester: RankedTester = rankWith(2, isIntegerControl);

export default withJsonFormsCellProps(withVanillaCellProps(IntegerCell));
