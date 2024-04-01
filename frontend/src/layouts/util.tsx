import isEmpty from "lodash/isEmpty";
import React from "react";
import { JsonSchema, Layout } from "@jsonforms/core";
import { JsonFormsDispatch, useJsonForms as hello } from "@jsonforms/react";
export interface RenderChildrenProps {
  layout: Layout;
  schema: JsonSchema;
  className: string;
  path: string;
}

export const renderChildren = (
  layout: Layout,
  schema: JsonSchema,
  className: string,
  path: string,
  enabled: boolean
) => {
  if (isEmpty(layout.elements)) {
    return [];
  }

  const { renderers, cells } = hello();

  return layout.elements.map((child, index) => {
    return (
      <div className={className} key={`${path}-${index}`}>
        <JsonFormsDispatch
          renderers={renderers}
          cells={cells}
          uischema={child}
          schema={schema}
          path={path}
          enabled={enabled}
        />
      </div>
    );
  });
};
