import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/@restart/hooks/esm/useMergedRefs.js
var import_react = __toESM(require_react());
var toFnRef = (ref) => !ref || typeof ref === "function" ? ref : (value) => {
  ref.current = value;
};
function mergeRefs(refA, refB) {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return (value) => {
    if (a)
      a(value);
    if (b)
      b(value);
  };
}
function useMergedRefs(refA, refB) {
  return (0, import_react.useMemo)(() => mergeRefs(refA, refB), [refA, refB]);
}
var useMergedRefs_default = useMergedRefs;

// node_modules/@restart/hooks/esm/useCommittedRef.js
var import_react2 = __toESM(require_react());
function useCommittedRef(value) {
  const ref = (0, import_react2.useRef)(value);
  (0, import_react2.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
var useCommittedRef_default = useCommittedRef;

// node_modules/@restart/hooks/esm/useEventCallback.js
var import_react3 = __toESM(require_react());
function useEventCallback(fn) {
  const ref = useCommittedRef_default(fn);
  return (0, import_react3.useCallback)(function(...args) {
    return ref.current && ref.current(...args);
  }, [ref]);
}

// node_modules/@restart/hooks/esm/useMounted.js
var import_react4 = __toESM(require_react());
function useMounted() {
  const mounted = (0, import_react4.useRef)(true);
  const isMounted = (0, import_react4.useRef)(() => mounted.current);
  (0, import_react4.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}

export {
  useMounted,
  _objectWithoutPropertiesLoose,
  useMergedRefs_default,
  useCommittedRef_default,
  useEventCallback
};
//# sourceMappingURL=chunk-ZPSZHCAB.js.map
