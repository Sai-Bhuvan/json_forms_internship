import maxBy from "lodash/maxBy";
import React from "react";
import {
  computeLabel,
  ControlProps,
  ControlState,
  isControl,
  isDescriptionHidden,
  NOT_APPLICABLE,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import {
  Control,
  DispatchCell,
  withJsonFormsControlProps,
} from "@jsonforms/react";
import { withVanillaControlProps } from "../util";
import type { VanillaRendererProps } from "../index";
import merge from "lodash/merge";

export class InputControl extends Control<
  ControlProps & VanillaRendererProps,
  ControlState
> {
  render() {
    const {
      classNames,
      description,
      id,
      errors,
      label,
      uischema,
      schema,
      rootSchema,
      visible,
      enabled,
      required,
      path,
      cells,
      config,
    } = this.props;

    const isValid = errors.length === 0;

    const divClassNames = [classNames?.validation]
      .concat(isValid ? classNames?.description : classNames?.validationError)
      .join(" ");

    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const showDescription = !isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription
    );
    const testerContext = {
      rootSchema: rootSchema,
      config: config,
    };
    const cell = maxBy(cells, (r) => r.tester(uischema, schema, testerContext));
    if (
      cell === undefined ||
      cell.tester(uischema, schema, testerContext) === NOT_APPLICABLE
    ) {
      console.warn("No applicable cell found.", uischema, schema);
      return null;
    } else {
      return (
        <div
          className={classNames?.wrapper}
          hidden={!visible}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          id={id}
        >
          <label htmlFor={id + "-input"} className={classNames?.label}>
            {computeLabel(
              label,
              required !== undefined ? required : false,
              appliedUiSchemaOptions.hideRequiredAsterisk
            )}
          </label>
          <DispatchCell
            uischema={uischema}
            schema={schema}
            path={path}
            id={id + "-input"}
            enabled={enabled}
          />
          <div className={divClassNames}>
            {!isValid ? errors : showDescription ? description : null}
          </div>
        </div>
      );
    }
  }
}

export const inputControlTester: RankedTester = rankWith(1, isControl);

export default withVanillaControlProps(withJsonFormsControlProps(InputControl));
