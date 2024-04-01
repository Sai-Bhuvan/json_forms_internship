import React from "react";
import { RendererProps } from "@jsonforms/core";
import { VanillaRendererProps, WithChildren } from "../index";

export const JsonFormsLayout = ({
  className,
  children,
  visible,
}: RendererProps & VanillaRendererProps & WithChildren) => {
  return (
    <div
      className={className}
      hidden={visible === undefined || visible === null ? false : !visible}
    >
      {children}
    </div>
  );
};
