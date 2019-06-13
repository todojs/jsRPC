const Arithmetic  = require ('./arithmetic');
const skeletonify = require ('@todojs/jsrpc/skeletonify');
module.exports    = skeletonify ('arithmetic', Arithmetic);