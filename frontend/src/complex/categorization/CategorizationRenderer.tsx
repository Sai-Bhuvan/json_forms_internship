import React from "react";
import type { Categorization, Category, LayoutProps } from "@jsonforms/core";
import {
  RendererComponent,
  TranslateProps,
  withJsonFormsLayoutProps,
  withTranslateProps,
} from "@jsonforms/react";
import { CategorizationList } from "./CategorizationList";
import { SingleCategory } from "./SingleCategory";
import { isCategorization } from "./tester";
import { withVanillaControlProps } from "../../util";
import type { VanillaRendererProps } from "../../index";

export interface CategorizationState {
  selectedCategory: Category;
}

class CategorizationRenderer extends RendererComponent<
  LayoutProps & VanillaRendererProps & TranslateProps,
  CategorizationState
> {
  onCategorySelected = (category: Category) => () => {
    return this.setState({ selectedCategory: category });
  };

  /**
   * @inheritDoc
   */
  render() {
    const { uischema, visible, getStyleAsClassName, t } = this.props;

    // Use optional chaining to safely call getStyleAsClassName
    const classNames = getStyleAsClassName?.("categorization");
    const masterClassNames = getStyleAsClassName?.("categorization.master");
    const detailClassNames = getStyleAsClassName?.("categorization.detail");

    // Check if getStyleAsClassName is defined before using it
    if (
      classNames === undefined ||
      masterClassNames === undefined ||
      detailClassNames === undefined
    ) {
      // Handle the case when getStyleAsClassName is undefined
      return null; // or any other appropriate handling
    }

    const categorization = uischema as Categorization;
    const selectedCategory = this.findCategory(categorization);

    const subcategoriesClassName: string =
      getStyleAsClassName?.("category.subcategories") || "";
    const groupClassName: string =
      getStyleAsClassName?.("category.group") || "";

    return (
      <div
        className={classNames}
        hidden={visible === null || visible === undefined ? false : !visible}
      >
        <div className={masterClassNames}>
          <CategorizationList
            categorization={categorization}
            selectedCategory={selectedCategory}
            depth={0}
            onSelect={this.onCategorySelected}
            subcategoriesClassName={subcategoriesClassName}
            groupClassName={groupClassName}
            t={t}
          />
        </div>
        <div className={detailClassNames}>
          <SingleCategory
            category={selectedCategory}
            schema={this.props.schema}
            path={this.props.path}
          />
        </div>
      </div>
    );
  }

  private findCategory(categorization: Categorization): Category {
    const category = categorization.elements[0];

    if (this.state && this.state.selectedCategory) {
      return this.state.selectedCategory;
    }

    if (isCategorization(category)) {
      return this.findCategory(category);
    }

    return category;
  }
}

export default withVanillaControlProps(
  withTranslateProps(withJsonFormsLayoutProps(CategorizationRenderer))
);
