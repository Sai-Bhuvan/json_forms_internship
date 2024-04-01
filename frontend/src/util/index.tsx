import React, { ComponentType, useMemo } from "react";
import isEmpty from "lodash/isEmpty";
import { useJsonForms } from "@jsonforms/react";
import { getStyle, getStyleAsClassName } from "../reducers";
import { VanillaRendererProps } from "../index";
import { findStyle, findStyleAsClassName } from "../reducers/styling";
import { useStyles } from "../styles";
import {
  ControlElement,
  convertToValidClassName,
  getConfig,
  JsonFormsState,
  OwnPropsOfCell,
  OwnPropsOfControl,
  OwnPropsOfRenderer,
  RendererProps,
  StatePropsOfCell,
  StatePropsOfControl,
} from "@jsonforms/core";
export * from "./i18nDefaults";

/**
 * Add vanilla props to the return value of calling the given
 * mapStateToProps function.
 *
 * @param mapStateToProps existing mapStateToProps function
 * @returns {VanillaControlStateProps} vanilla-specific control props
 */
export const addVanillaControlProps =
  <P extends StatePropsOfControl>(
    mapStateToProps: (s: JsonFormsState, p: OwnPropsOfControl) => P
  ) =>
  (
    state: JsonFormsState,
    ownProps: OwnPropsOfControl
  ): StatePropsOfControl & VanillaRendererProps => {
    const props: StatePropsOfControl = mapStateToProps(state, ownProps);
    const config = getConfig(state);
    const trim = config.trim;
    const controlElement = props.uischema as ControlElement;
    const isValid = isEmpty(props.errors);
    const styles = getStyle(state)("control");
    let classNames: string[] = !isEmpty(controlElement.scope)
      ? styles.concat([`${convertToValidClassName(controlElement.scope)}`])
      : [""];

    if (trim) {
      classNames = classNames.concat(getStyle(state)("control.trim"));
    }
    const labelClass = getStyleAsClassName(state)("control.label");
    const descriptionClassName =
      getStyleAsClassName(state)("input.description");
    const validationClassName =
      getStyleAsClassName(state)("control.validation");
    const validationErrorClassName = getStyleAsClassName(state)(
      "control.validation.error"
    );
    const inputClassName = ["validate"].concat(isValid ? "valid" : "invalid");

    return {
      ...props,
      getStyleAsClassName: getStyleAsClassName(state),
      getStyle: getStyle(state),
      classNames: {
        wrapper: classNames.join(" "),
        input: inputClassName.join(" "),
        label: labelClass,
        description: descriptionClassName,
        validation: validationClassName,
        validationError: validationErrorClassName,
      },
    };
  };

export const withVanillaControlProps = (Component: ComponentType<any>) =>
  function WithVanillaControlProps(props: any) {
    const ctx = useJsonForms();
    const contextStyles = useStyles();
    const controlElement = props.uischema as ControlElement;
    const config = ctx.config;
    const trim = config && config.trim;
    const styles = useMemo(
      () => findStyle(contextStyles)("control"),
      [contextStyles]
    );
    let classNames: string[] = !isEmpty(controlElement.scope)
      ? styles.concat([`${convertToValidClassName(controlElement.scope)}`])
      : [""];

    if (trim) {
      classNames = classNames.concat(findStyle(contextStyles)("control.trim"));
    }
    const isValid = isEmpty(props.errors);
    const labelClass = useMemo(
      () => findStyleAsClassName(contextStyles)("control.label"),
      [contextStyles]
    );
    const descriptionClassName = useMemo(
      () => findStyleAsClassName(contextStyles)("input.description"),
      [contextStyles]
    );
    const validationClassName = useMemo(
      () => findStyleAsClassName(contextStyles)("control.validation"),
      [contextStyles]
    );
    const validationErrorClassName = useMemo(
      () => findStyleAsClassName(contextStyles)("control.validation.error"),
      [contextStyles]
    );
    const inputClassName = ["validate"].concat(isValid ? "valid" : "invalid");

    const getStyleAsClassName = useMemo(
      () => findStyleAsClassName(contextStyles),
      [contextStyles]
    );
    const getStyle = useMemo(() => findStyle(contextStyles), [contextStyles]);

    const wrapper = classNames.join(" ");
    const input = inputClassName.join(" ");

    const classNamesProp = useMemo(
      () => ({
        wrapper,
        input,
        label: labelClass,
        description: descriptionClassName,
        validation: validationClassName,
        validationError: validationErrorClassName,
      }),
      [
        wrapper,
        input,
        labelClass,
        descriptionClassName,
        validationClassName,
        validationErrorClassName,
      ]
    );

    return (
      <Component
        {...props}
        getStyleAsClassName={getStyleAsClassName}
        getStyle={getStyle}
        classNames={classNamesProp}
      />
    );
  };

/**
 * Add vanilla props to the return value of calling the given
 * mapStateToProps function.
 *
 * @param mapStateToProps an existing mapStateToProps function for retrieving layout props
 * @returns {VanillaLayoutProps} vanilla specific layout props
 */
export const addVanillaLayoutProps =
  (
    mapStateToProps: (s: JsonFormsState, p: OwnPropsOfRenderer) => RendererProps
  ) =>
  (
    state: JsonFormsState,
    ownProps: OwnPropsOfRenderer
  ): RendererProps & VanillaRendererProps => {
    const props = mapStateToProps(state, ownProps);

    return {
      ...props,
      getStyleAsClassName: getStyleAsClassName(state),
      getStyle: getStyle(state),
    };
  };

export const addVanillaCellProps =
  (
    mapStateToCellsProps: (
      s: JsonFormsState,
      p: OwnPropsOfCell
    ) => StatePropsOfCell
  ) =>
  (
    state: JsonFormsState,
    ownProps: OwnPropsOfCell
  ): StatePropsOfCell & VanillaRendererProps => {
    const props = mapStateToCellsProps(state, ownProps);
    const inputClassName = ["validate"].concat(
      props.isValid ? "valid" : "invalid"
    );
    return {
      ...props,
      className: inputClassName.join(" "),
      getStyleAsClassName: getStyleAsClassName(state),
      getStyle: getStyle(state),
    };
  };

const withVanillaCellPropsForType =
  (type: string) => (Component: ComponentType<any>) =>
    function WithVanillaCellPropsForType(props: any) {
      const inputClassName = ["validate"].concat(
        props.isValid ? "valid" : "invalid"
      );
      const styles = useStyles();
      const definedStyle = findStyleAsClassName(styles)(type);
      if (definedStyle) {
        inputClassName.push(definedStyle);
      }

      return (
        <Component
          {...props}
          getStyleAsClassName={findStyleAsClassName(styles)}
          getStyle={findStyle(styles)}
          className={inputClassName.join(" ")}
        />
      );
    };

export const withVanillaCellProps =
  withVanillaCellPropsForType("control.input");

export const withVanillaEnumCellProps =
  withVanillaCellPropsForType("control.select");

export const withVanillaBooleanCellProps =
  withVanillaCellPropsForType("control.checkbox");
