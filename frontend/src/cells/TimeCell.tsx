import React from "react";
import {
  CellProps,
  isTimeControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index";
import { withVanillaCellProps } from "../util/index";

/**
 * AJV 'time' format expects HH:mm:ss while <input type='time'> only returns HH:mm.
 * Therefore we append ':00' when the seconds are missing.
 */
const appendSecondsIfNecessary = (value: unknown) => {
  if (typeof value === "string") {
    const splitValue = value.split(":");
    if (splitValue.length === 2) {
      splitValue.push("00");
    }
    return splitValue.join(":");
  }
  return value;
};

export const TimeCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <input
      type="time"
      value={data || ""}
      onChange={(ev) =>
        handleChange(path, appendSecondsIfNecessary(ev.target.value))
      }
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    />
  );
};

/**
 * Default tester for date controls.
 * @type {RankedTester}
 */
export const timeCellTester: RankedTester = rankWith(2, isTimeControl);

export default withJsonFormsCellProps(withVanillaCellProps(TimeCell));
