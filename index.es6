export function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}

export default function middlewarePlugin(...middlewares){
  return {
    name: "MiddlewarePlugin",
    plugContext: function(){
      return {
        plugActionContext: function(actionContext){
          const chain = middlewares.map(middleware => middleware(actionContext));
          actionContext.dispatch = compose(...chain)(actionContext.dispatch);
        }
      };
    }
  };
}
