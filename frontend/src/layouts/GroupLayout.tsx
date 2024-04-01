import isEmpty from "lodash/isEmpty";
import React, { FunctionComponent } from "react";
import {
  GroupLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
} from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";
import { renderChildren } from "./util";
import type { VanillaRendererProps } from "../index";
import { withVanillaControlProps } from "../util";

/**
 * Default tester for a group layout.
 *
 * @type {RankedTester}
 */
export const groupTester: RankedTester = rankWith(1, uiTypeIs("Group"));

export const GroupLayoutRenderer = (
  props: LayoutProps & VanillaRendererProps
) => {
  const { data: _data, ...otherProps } = props;
  // We don't hand over data to the layout renderer to avoid rerendering it with every data change
  return <GroupLayoutRendererComponent {...otherProps} />;
};

const GroupLayoutRendererComponent: FunctionComponent<
  LayoutProps & VanillaRendererProps
> = React.memo(function GroupLayoutRendererComponent({
  schema,
  uischema,
  path,
  enabled,
  visible,
  label,
  getStyle,
  getStyleAsClassName,
}: LayoutProps & VanillaRendererProps) {
  const group = uischema as GroupLayout;
  const elementsSize = group.elements ? group.elements.length : 0;
  const classNames = getStyleAsClassName?.("group.layout") || "";
  const childClassNames = ["group-layout-item"]
    .concat(getStyle?.("group.layout.item", elementsSize) || "")
    .join(" ");

  return (
    <fieldset
      className={classNames}
      hidden={visible === undefined || visible === null ? false : !visible}
    >
      {!isEmpty(label) ? (
        <legend className={getStyleAsClassName?.("group.label") || ""}>
          {label}
        </legend>
      ) : (
        ""
      )}
      {renderChildren(group, schema, childClassNames, path, enabled)}
    </fieldset>
  );
});

export default withVanillaControlProps(
  withJsonFormsLayoutProps(GroupLayoutRenderer)
);
