const app = require ('http').createServer ();

const routes = new Map ();
app.listen (process.env.PORT || 9000);
app.on ('request', (request, response) => {
  const bodyChunks = [];
  request.on ('data', (chunk) => bodyChunks.push (chunk));
  request.on ('end', async () => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    if (request.method === 'OPTIONS') {
      response.statusCode = 204;
      response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
      response.setHeader('Access-Control-Allow-Headers', 'content-type');
      return response.end();
    }
    try {
      request.bodyRaw = Buffer.concat (bodyChunks);
      request.body    = request.bodyRaw.length ? JSON.parse (request.bodyRaw.toString ()) : null;
    } catch (err) {
      return sendError (400, -37600, "Parse error");
    }
    try {
      for (let route of routes) {
        if (request.url.match (route[ 0 ]) && route[ 1 ][ request.method.toLowerCase () ]) {
          await route[ 1 ][ request.method.toLowerCase () ] (request, response);
          if (response.finished) {
            return log ();
          }
        }
      }
      return sendError (401, -32601, "Method not found", request.body.id);
    } catch (err) {
      if (err.message === "Cannot read property 'apply' of undefined") {
        return sendError (401, -32601, "Method not found", request.body.id);
      } else {
        return sendError (500, -32000, err.message, request.body.id);
      }
    }
  });

  function sendError (status, code, message, id = null) {
    response.statusCode = status;
    response.setHeader ('Content-Type', 'application/json');
    response.end (JSON.stringify ({
      "jsonrpc" : "2.0",
      "error"   : {code, message},
      "id"      : id
    }));
    log ()
  }
  
  function log () {
    console.log (new Date ().toISOString (), request.connection.remoteAddress,
      response.statusCode, request.url, request.body && request.body.method);
  }

});

module.exports = function addRoute (path, methods) {
  routes.set (path, methods);
  return app;
};