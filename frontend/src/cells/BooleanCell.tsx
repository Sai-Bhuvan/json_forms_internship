import React from "react";
import {
  CellProps,
  isBooleanControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index";
import { withVanillaBooleanCellProps } from "../util/index";

const BooleanCell: React.FC<CellProps> = (
  props: CellProps & VanillaRendererProps
) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <input
      type="checkbox"
      checked={!!data}
      onChange={(ev) => handleChange(path, ev.target.checked)}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    />
  );
};

/**
 * Default tester for boolean controls.
 * @type {RankedTester}
 */
export const booleanCellTester: RankedTester = rankWith(2, isBooleanControl);

export default withJsonFormsCellProps(withVanillaBooleanCellProps(BooleanCell));
