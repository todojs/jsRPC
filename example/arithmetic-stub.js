const stubify  = require ('../stubify');
module.exports = stubify (
  "http://localhost:9000",
  'arithmetic',
  [
    'addition',
    'subtraction',
    'multiplication',
    'division'
  ]);