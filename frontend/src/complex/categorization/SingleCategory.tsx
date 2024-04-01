import React from "react";
import type { Category, JsonSchema } from "@jsonforms/core";
import { JsonFormsDispatch } from "@jsonforms/react";

export interface CategoryProps {
  category: Category;
  schema: JsonSchema;
  path: string;
}

export const SingleCategory = ({ category, schema, path }: CategoryProps) => (
  // TODO: add selected style
  <div id="categorization.detail">
    {(category.elements || []).map((child, index) => (
      <JsonFormsDispatch
        key={`${path}-${index}`}
        uischema={child}
        schema={schema}
        path={path}
      />
    ))}
  </div>
);
