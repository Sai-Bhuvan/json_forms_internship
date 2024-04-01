import React from "react";
import {
  CellProps,
  isRangeControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { withJsonFormsCellProps } from "@jsonforms/react";
import type { VanillaRendererProps } from "../index";
import { withVanillaCellProps } from "../util/index";

export const SliderCell = (props: CellProps & VanillaRendererProps) => {
  const { data, className, id, enabled, uischema, schema, path, handleChange } =
    props;

  return (
    <div style={{ display: "flex" }}>
      <input
        type="range"
        max={schema.maximum}
        min={schema.minimum}
        value={data || schema.default}
        onChange={(ev) => handleChange(path, Number(ev.target.value))}
        className={className}
        id={id}
        disabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
        style={{ flex: "1" }}
      />
      <label style={{ marginLeft: "0.5em" }}>{data || schema.default}</label>
    </div>
  );
};

export const sliderCellTester: RankedTester = rankWith(4, isRangeControl);

export default withJsonFormsCellProps(withVanillaCellProps(SliderCell));
