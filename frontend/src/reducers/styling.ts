import remove from "lodash/remove";
import join from "lodash/join";
import filter from "lodash/filter";
import reduce from "lodash/reduce";
import { REGISTER_STYLE, REGISTER_STYLES, UNREGISTER_STYLE } from "../actions";
import { StyleDef } from "../styles";

const removeStyle = (styles: StyleDef[], name: string) => {
  const copy = styles.slice();
  remove(copy, (styleDef) => styleDef.name === name);

  return copy;
};

const registerStyle = (styles: StyleDef[], { name, classNames }: StyleDef) => {
  const copy = removeStyle(styles, name);
  copy.push({ name, classNames });

  return copy;
};

export const findStyle =
  (styles: StyleDef[]) =>
  (style: string, ...args: any[]): string[] => {
    const foundStyles = filter(styles, (s) => s.name === style);
    return reduce(
      foundStyles,
      (res: string[], style: StyleDef) => {
        if (typeof style.classNames === "function") {
          return res.concat(style.classNames(args));
        }
        return res.concat(style.classNames);
      },
      []
    );
  };

export const findStyleAsClassName =
  (styles: StyleDef[]) =>
  (style: string, ...args: any[]): string =>
    join(findStyle(styles)(style, args), " ");

// TODO
export const stylingReducer = (state: StyleDef[] = [], action: any) => {
  switch (action.type) {
    case REGISTER_STYLE: {
      return registerStyle(state, {
        name: action.name,
        classNames: action.classNames,
      });
    }
    case REGISTER_STYLES: {
      return action.styles.reduce(
        (allStyles: StyleDef[], style: StyleDef) =>
          registerStyle(allStyles, style),
        state
      );
    }
    case UNREGISTER_STYLE: {
      return removeStyle(state, action.name);
    }
    default:
      return state;
  }
};
