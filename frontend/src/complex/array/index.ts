import {
  isObjectArrayWithNesting,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import ArrayControlRenderer, { ArrayControl } from "./ArrayControlRenderer";
export { ArrayControlRenderer, ArrayControl };

export const arrayControlTester: RankedTester = rankWith(
  4,
  isObjectArrayWithNesting
);

export default ArrayControlRenderer;
