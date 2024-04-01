import React, { useContext } from "react";
import { StyleDef, vanillaStyles } from "./styles";

export interface StyleContext {
  styles: StyleDef[];
}

const defaultContext: StyleContext = {
  styles: vanillaStyles,
};

export const JsonFormsStyleContext = React.createContext(defaultContext);

export const useStyleContext = (): StyleContext =>
  useContext(JsonFormsStyleContext);

export const useStyles = (): StyleDef[] => {
  const { styles } = useStyleContext();
  return styles;
};

// const styleContextValue = {
//   styles: [
//     {
//       name: "control",
//       classNames: ["mb-3 font-mono fs-4"],
//     },
//     {
//       name: "control.input",
//       classNames: [
//         "form-control rounded bg-light border border-secondary focus-border-primary fs-6 outline-0 text-dark py-3 px-4 transition-200 font-sans",
//       ],
//     },
//     {
//       name: "HorizontalLayout",
//       classNames: [""],
//     },
//     {
//       name: "control.validation",
//       classNames: ["text-danger fw-normal mt-2 fs-4"],
//     },
//     {
//       name: "control.label",
//       classNames: ["fw-bold pb-4"],
//     },
//     {
//       name: "control.select",
//       classNames: [
//         "form-select rounded bg-light border border-secondary focus-border-primary fs-6 outline-0 text-dark py-3 px-4 transition-200 appearance-none",
//       ],
//     },
//     {
//       name: "group.layout",
//       classNames: ["accordion-item bg-white"],
//     },
//     {
//       name: "control.slider",
//       classNames: ["form-range", "custum-range", "border:0"],
//     },
//     {
//       name: "group.label",
//       classNames: [
//         "accordion-button d-flex w-100 py-4 transition-none focus-outline-none text-uppercase fw-bold text-dark fs-5 pb-4",
//       ],
//     },
//   ],
// };

// export default styleContextValue;
