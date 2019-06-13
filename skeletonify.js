const addRoute = require ('./server');

module.exports = function skeletonify (objName, obj) {
  return addRoute (new RegExp (`^\/${ objName }\/`), {
    post : async (request, response) => {
      response.setHeader ('Content-Type', 'application/json');
      response.end (JSON.stringify ({
        jsonrpc : "2.0",
        result  : await obj[ request.body.method ].apply (null, request.body.params),
        id      : request.body.id
      }));
    }
  });
};