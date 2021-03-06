/*
 Slight modification to d3.rebind taking a post set callback
 https://github.com/mbostock/d3/blob/master/src/core/rebind.js
 */
function rebindCallback(target, source, postSetCallback) {
  let i = 2;
  const n = arguments.length;
  let method;
  while (++i < n) target[method = arguments[i]] = doRebind(target, source, source[method], postSetCallback);
  return target;
}

function doRebind(target, source, method, postSetCallback) {
  return function() {
    const value = method.apply(source, arguments);
    if(postSetCallback && value === source) postSetCallback();
    return value === source ? target : value;
  };
}

function rebind (target, source) {
  const newArgs = Array.prototype.slice.call(arguments, 0);
  newArgs.splice(2, 0, undefined);
  return rebindCallback.apply(this, newArgs);
}

// https://github.com/d3/d3/blob/v3.5.17/src/core/functor.js
function functor (v) {
  return typeof v === "function" ? v : () => v;
}

export default {
  rebindCallback,
  rebind,
  functor
}
