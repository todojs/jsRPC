Simple, lightly and powerful Javascript Remote Procedure Calling (jsRPC) using jsonRPC over HTTP.

This library is installed with:

```js
npm install @todojs/jsrpc --save
```

This library has two method:

## stubify (url, name[, methods])

Create a client stub than replace the original objet with methods.

- `url` (string) server address, ie, ´http://myserver.com/`
- `name` (string) object name as reference, ie, `Arithmetic`
- `method` (array of string) list of method names [optional]

Return a new Proxy object. 

Example:

```js
const stubify = require('@todojs/jsrpc/stubify');
const stub = stubify (
  "http://localhost:9000",
  'arithmetic',
  [
    'addition',
    'subtraction',
    'multiplication',
    'division'
  ]);
```

## skeletonify (name, obj) 

Create a server skeleton than recibe call by HTTP with jsonRPC message format, call to original method and return the 
result.

- `name` (string) object name as reference, ie, `Arithmetic`
- `obj` (object) the original object with methods.

Example:

```js
const skeletonify = require ('@todojs/jsrpc/skeletonify');
skeletonify ('arithmetic', Arithmetic);
```