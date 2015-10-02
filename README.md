# Middleware Plugin for Fluxible

A plugin for [Fluxible](https://github.com/yahoo/fluxible) applications to provide an interface that attaches middlewares between an action dispatch and a store handler. Highly inspired by [Redux middlewares](https://rackt.github.io/redux/docs/advanced/Middleware.html).

## Install

```
npm install fluxible-plugin-middleware
```

## Usage

```js
import middlewarePlugin from "fluxible-plugin-middleware";
import Fluxible from "fluxible";

const app = new Fluxible();

const logMiddleware = function(actionContext){
    return function(next) {
      return function(type, payload){
        console.log(actionContext);
        console.info(type, payload);
        next(type, payload);
      };
    };
};

app.plug(middlewarePlugin(logMiddleware));
```

Now, when calling the `context.dispatch` method within action creators, all action objects will pass through the middlewares before getting dispatched into the stores for handling.

Your middlewares will also have access to the entire [`actionContext`](http://fluxible.io/api/actions.html#action-context) so you can fire the context functions within your middlewares if you like.

For additional middlewares:

```js
app.plug(middlewarePlugin(logMiddleware, secondMiddleware, thirdMiddleware));
```