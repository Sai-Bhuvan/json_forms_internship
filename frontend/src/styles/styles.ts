export interface StyleDef {
  name: string;
  classNames: string[] | ((...args: any[]) => string[]);
}

/**
 * Pre-defined vanilla styles.
 *
 * @type {{name: string; classNames: string[]}[]}
 */
export const vanillaStyles: StyleDef[] = [
  {
    name: "control",
    classNames: ["control"],
  },
  {
    name: "control.trim",
    classNames: ["trim"],
  },
  {
    name: "control.input",
    classNames: ["input"],
  },
  {
    name: "control.select",
    classNames: ["select"],
  },
  {
    name: "control.checkbox",
    classNames: ["checkbox"],
  },
  {
    name: "control.radio",
    classNames: ["radio"],
  },
  {
    name: "control.radio.option",
    classNames: ["radio-option"],
  },
  {
    name: "control.radio.input",
    classNames: ["radio-input"],
  },
  {
    name: "control.radio.label",
    classNames: ["radio-label"],
  },
  {
    name: "control.validation.error",
    classNames: ["validation_error"],
  },
  {
    name: "control.validation",
    classNames: ["validation"],
  },
  {
    name: "categorization",
    classNames: ["categorization"],
  },
  {
    name: "categorization.master",
    classNames: ["categorization-master"],
  },
  {
    name: "categorization.detail",
    classNames: ["categorization-detail"],
  },
  {
    name: "category.group",
    classNames: ["category-group"],
  },
  {
    name: "category.subcategories",
    classNames: ["category-subcategories"],
  },
  {
    name: "array.layout",
    classNames: ["array-layout"],
  },
  {
    name: "array.children",
    classNames: ["children"],
  },
  {
    name: "group.layout",
    classNames: ["group-layout"],
  },
  {
    name: "horizontal.layout",
    classNames: ["horizontal-layout"],
  },
  {
    name: "horizontal.layout.item",
    classNames: ([size]: number[]) => [`horizontal-layout-${size}`],
  },
  {
    name: "vertical.layout",
    classNames: ["vertical-layout"],
  },
  {
    name: "array.table.validation.error",
    classNames: ["validation_error"],
  },
  {
    name: "array.table.validation",
    classNames: ["validation"],
  },
  {
    name: "array.table",
    classNames: ["array-table-layout", "control"],
  },
  {
    name: "array.control.validation.error",
    classNames: ["validation_error"],
  },
  {
    name: "array.control.validation",
    classNames: ["validation"],
  },
  {
    name: "array.control.add",
    classNames: ["button-add"],
  },
  {
    name: "array.child.controls",
    classNames: ["child-controls"],
  },
  {
    name: "array.child.controls.up",
    classNames: ["button-up"],
  },
  {
    name: "array.child.controls.down",
    classNames: ["button-down"],
  },
  {
    name: "array.child.controls.delete",
    classNames: ["button-delete"],
  },
  {
    name: "array.control",
    classNames: ["array-control-layout", "control"],
  },
  {
    name: "input.description",
    classNames: ["input-description"],
  },
];
