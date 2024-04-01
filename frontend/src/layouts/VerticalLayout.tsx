import React, { FunctionComponent } from "react";
import {
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs,
  VerticalLayout,
} from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { withVanillaControlProps } from "../util";
import { JsonFormsLayout } from "./JsonFormsLayout";
import { renderChildren } from "./util";
import { VanillaRendererProps } from "../index";

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const verticalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs("VerticalLayout")
);

export const VerticalLayoutRenderer = (
  props: RendererProps & VanillaRendererProps
) => {
  const { data: _data, ...otherProps } = props;
  // We don't hand over data to the layout renderer to avoid rerendering it with every data change
  return <VerticalLayoutRendererComponent {...otherProps} />;
};

const VerticalLayoutRendererComponent: FunctionComponent<
  RendererProps & VanillaRendererProps
> = React.memo(function VerticalLayoutRendererComponent({
  schema,
  uischema,
  path,
  visible,
  enabled,
  getStyle,
  getStyleAsClassName,
}: RendererProps & VanillaRendererProps) {
  const verticalLayout = uischema as VerticalLayout;
  const elementsSize = verticalLayout.elements
    ? verticalLayout.elements.length
    : 0;
  const layoutClassName = getStyleAsClassName?.("vertical.layout") || "";
  const childClassNames = ["vertical-layout-item"]
    .concat(getStyle?.("vertical.layout.item", elementsSize) || "")
    .join(" ");

  return (
    <JsonFormsLayout
      className={layoutClassName}
      uischema={uischema}
      schema={schema}
      visible={visible}
      enabled={enabled}
      path={path}
      getStyle={getStyle}
      getStyleAsClassName={getStyleAsClassName}
    >
      {renderChildren(verticalLayout, schema, childClassNames, path, enabled)}
    </JsonFormsLayout>
  );
});

export default withVanillaControlProps(
  withJsonFormsLayoutProps(VerticalLayoutRenderer, false)
);
