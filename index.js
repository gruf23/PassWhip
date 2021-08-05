module.exports = require('./src/pwdgen');

var gen = require('./src/pwdgen');

console.log(gen({
  length: 32,
  numbers: true,
  symbols: true
}));
