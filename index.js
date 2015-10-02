"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;
exports["default"] = middlewarePlugin;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (arg) {
    return funcs.reduceRight(function (composed, f) {
      return f(composed);
    }, arg);
  };
}

function middlewarePlugin() {
  for (var _len2 = arguments.length, middlewares = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    middlewares[_key2] = arguments[_key2];
  }

  return {
    name: "MiddlewarePlugin",
    plugContext: function plugContext() {
      return {
        plugActionContext: function plugActionContext(actionContext) {
          var chain = middlewares.map(function (middleware) {
            return middleware(actionContext);
          });
          actionContext.dispatch = compose.apply(undefined, _toConsumableArray(chain))(actionContext.dispatch);
        }
      };
    }
  };
}

