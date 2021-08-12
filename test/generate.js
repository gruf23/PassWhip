const assert = require('chai').assert;
const passWhip = require('../lib/cjs');

describe('Generate password', function () {
  it('Should generate password when no options provided', function () {
    assert.doesNotThrow(function () {
      passWhip.generatePassword();
    });
  });
  it('Should generate password of provided length', function () {
    const length = 16;
    const password = passWhip.generatePassword({length: length});
    assert.equal(password.length, length);
  });
  it('Should generate password containing only letter', function () {
    const password = passWhip.generatePassword({
      numbers: false,
      symbols: false
    });
    assert.match(password, /^[a-zA-Z]+$/);
  });
});
