import React, { useMemo } from "react";
import {
  Categorization,
  Category,
  deriveLabelForUISchemaElement,
  Translator,
} from "@jsonforms/core";
import { isCategorization } from "./tester";

const getCategoryClassName = (
  category: Category,
  selectedCategory: Category
): string => (selectedCategory === category ? "selected" : "");

export interface CategorizationProps {
  categorization: Categorization;
  selectedCategory: Category;
  depth: number;
  onSelect: any;
  subcategoriesClassName: string;
  groupClassName: string;
  t: Translator;
}

export const CategorizationList = ({
  categorization,
  selectedCategory,
  depth,
  onSelect,
  subcategoriesClassName,
  groupClassName,
  t,
}: CategorizationProps) => {
  const categoryLabels = useMemo(
    () =>
      categorization.elements.map((cat) =>
        deriveLabelForUISchemaElement(cat, t)
      ),
    [categorization, t]
  );

  return (
    <ul className={subcategoriesClassName}>
      {categorization.elements.map((category, idx) => {
        if (isCategorization(category)) {
          return (
            <li key={categoryLabels[idx]} className={groupClassName}>
              <span>{categoryLabels[idx]}</span>
              <CategorizationList
                categorization={category}
                selectedCategory={selectedCategory}
                depth={depth + 1}
                onSelect={onSelect}
                subcategoriesClassName={subcategoriesClassName}
                groupClassName={groupClassName}
                t={t}
              />
            </li>
          );
        } else {
          return (
            <li
              key={categoryLabels[idx]}
              onClick={onSelect(category)}
              className={getCategoryClassName(category, selectedCategory)}
            >
              <span>{categoryLabels[idx]}</span>
            </li>
          );
        }
      })}
    </ul>
  );
};
