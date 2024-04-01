import React from "react";
import {
  CellProps,
  isNumberControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index";
import { withVanillaCellProps } from "../util/index";

const toNumber = (value: string) => (value === "" ? undefined : Number(value));

export const NumberCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <input
      type="number"
      step="0.1"
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
 * Default tester for number controls.
 * @type {RankedTester}
 */
export const numberCellTester: RankedTester = rankWith(2, isNumberControl);

export default withJsonFormsCellProps(withVanillaCellProps(NumberCell));
