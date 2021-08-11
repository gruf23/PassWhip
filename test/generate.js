const assert = require('chai').assert;
const pwdGen = require('../lib/pwdgen');

describe('Generate password', function () {
  it('Should generate password when no options provided', function () {
    assert.doesNotThrow(function () {
      pwdGen.generatePassword();
    });
  });
  it('Should generate password of provided length', function () {
    const length = 16;
    const password = pwdGen.generatePassword({length: length});
    assert.equal(password.length, length);
  });
  it('Should generate password containing only letter', function () {
    const password = pwdGen.generatePassword({
      numbers: false,
      symbols: false
    });
    assert.match(password, /^[a-zA-Z]+$/);
  });
});
