import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/@restart/hooks/esm/usePrevious.js
var import_react = __toESM(require_react());
function usePrevious(value) {
  const ref = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    ref.current = value;
  });
  return ref.current;
}

// node_modules/@restart/hooks/esm/useIsomorphicEffect.js
var import_react2 = __toESM(require_react());
var isReactNative = typeof global !== "undefined" && // @ts-ignore
global.navigator && // @ts-ignore
global.navigator.product === "ReactNative";
var isDOM = typeof document !== "undefined";
var useIsomorphicEffect_default = isDOM || isReactNative ? import_react2.useLayoutEffect : import_react2.useEffect;

export {
  usePrevious,
  useIsomorphicEffect_default
};
//# sourceMappingURL=chunk-D5H7BB6P.js.map
