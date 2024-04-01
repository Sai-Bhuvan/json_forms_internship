import { findStyle, findStyleAsClassName, stylingReducer } from "./styling";
import { JsonFormsState } from "@jsonforms/core";
export { stylingReducer };

export const getStyle =
  (state: JsonFormsState) =>
  (styleName: string, ...args: any[]): string[] =>
    findStyle(state.jsonforms.styles)(styleName, args);
export const getStyleAsClassName =
  (state: JsonFormsState) =>
  (styleName: string, ...args: any[]) =>
    findStyleAsClassName(state.jsonforms.styles)(styleName, args);
