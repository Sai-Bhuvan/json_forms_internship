import React, { FunctionComponent } from "react";
import {
  HorizontalLayout,
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs,
} from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { withVanillaControlProps } from "../util";
import { JsonFormsLayout } from "./JsonFormsLayout";
import { renderChildren } from "./util";
import { VanillaRendererProps } from "../index";

/**
 * Default tester for a horizontal layout.
 * @type {RankedTester}
 */
export const horizontalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs("HorizontalLayout")
);

export const HorizontalLayoutRenderer = (
  props: RendererProps & VanillaRendererProps
) => {
  const { data: _data, ...otherProps } = props;
  // We don't hand over data to the layout renderer to avoid rerendering it with every data change
  return <HorizontalLayoutRendererComponent {...otherProps} />;
};

const HorizontalLayoutRendererComponent: FunctionComponent<
  RendererProps & VanillaRendererProps
> = React.memo(function HorizontalLayoutRendererComponent({
  schema,
  uischema,
  getStyle,
  getStyleAsClassName,
  enabled,
  visible,
  path,
}: RendererProps & VanillaRendererProps) {
  const horizontalLayout = uischema as HorizontalLayout;
  const elementsSize = horizontalLayout.elements
    ? horizontalLayout.elements.length
    : 0;
  const layoutClassName = getStyleAsClassName?.("horizontal.layout") || "";
  const childClassNames = ["horizontal-layout-item"]
    .concat(getStyle?.("horizontal.layout.item", elementsSize) || "")
    .join(" ");

  return (
    <JsonFormsLayout
      className={layoutClassName}
      visible={visible}
      enabled={enabled}
      path={path}
      uischema={uischema}
      schema={schema}
      getStyle={getStyle}
      getStyleAsClassName={getStyleAsClassName}
    >
      {renderChildren(horizontalLayout, schema, childClassNames, path, enabled)}
    </JsonFormsLayout>
  );
});

export default withVanillaControlProps(
  withJsonFormsLayoutProps(HorizontalLayoutRenderer, false)
);
