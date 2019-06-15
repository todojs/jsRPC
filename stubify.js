(root => {
  const fetch = typeof window !== 'undefined' ? window.fetch : require ('node-fetch');
  
  function stubify (server, objName, methods = []) {
    let id      = 1;
    const proxy = new Proxy ({}, {
      ownKeys                  : () => methods,
      getOwnPropertyDescriptor : (target, prop) => ({
        value : proxy[ prop ], writable : true, enumerable : true, configurable : true
      }),
      get                      : (() => {
        const cache = [];
        return (target, method) => {
          return cache[ method ] || (cache[ method ] = async (...params) => {
            const res  = await fetch (`${ server }/${ objName }/`, {
              method  : 'POST',
              headers : {'Content-Type' : 'application/json'},
              body    : JSON.stringify ({
                jsonrpc : "2.0",
                method  : method,
                params  : params,
                id      : id++
              })  // jsonRPC 2.0 standard format
            });
            const data = await res.json ();
            if (res.status === 200) {
              return data.result;
            }
            throw new Error (data.error.message);
          });
        };
      }) ()
    });
    return proxy;
  }
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = stubify
  } else {
    root.stubify = stubify;
  }
}) (this);