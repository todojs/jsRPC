const stubify  = require ('@todojs/jsrpc/stubify');
module.exports = stubify (
  "http://localhost:9000",
  'arithmetic',
  [
    'addition',
    'subtraction',
    'multiplication',
    'division'
  ]);