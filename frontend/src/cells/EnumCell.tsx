import React, { useMemo } from "react";
import {
  EnumCellProps,
  isEnumControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import {
  TranslateProps,
  withJsonFormsEnumCellProps,
  withTranslateProps,
} from "@jsonforms/react";
import { i18nDefaults, withVanillaEnumCellProps } from "../util";
import type { VanillaRendererProps } from "../index";

export const EnumCell = (
  props: EnumCellProps & VanillaRendererProps & TranslateProps
) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    uischema,
    path,
    handleChange,
    options,
    t,
  } = props;
  const noneOptionLabel = useMemo(
    () => t("enum.none", i18nDefaults["enum.none"], { schema, uischema, path }),
    [t, schema, uischema, path]
  );

  // Check if 'options' is defined before using it
  const selectableOptions = options || [];

  return (
    <select
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      value={data || ""}
      onChange={(ev) =>
        handleChange(
          path,
          ev.target.selectedIndex === 0 ? undefined : ev.target.value
        )
      }
    >
      {[
        <option value={""} key={"jsonforms.enum.none"}>
          {noneOptionLabel}
        </option>,
      ].concat(
        selectableOptions.map((optionValue) => (
          <option
            value={optionValue.value}
            label={optionValue.label}
            key={optionValue.value}
          />
        ))
      )}
    </select>
  );
};

/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const enumCellTester: RankedTester = rankWith(2, isEnumControl);

export default withJsonFormsEnumCellProps(
  withTranslateProps(withVanillaEnumCellProps(EnumCell))
);
