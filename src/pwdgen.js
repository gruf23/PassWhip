const {randomBytes} = require('crypto');

const charsetEnum = Object.freeze({
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
});

/**
 * get pull of characters, available to use in password
 * @param {Object} options - options parameter of generate function.
 * @return {string[]}
 */
const getPool = function (options) {
  let pool = '';
  if (options.randomCase || (options.uppercase && options.lowercase)) {
    pool += charsetEnum.lowercase + charsetEnum.uppercase;
  } else {
    if (options.uppercase && !options.lowercase) {
      pool += charsetEnum.uppercase;
    } else if (options.lowercase && !options.uppercase) {
      pool += charsetEnum.lowercase;
    } else {
      throw new Error('Case must be selected');
    }
  }
  if (options.numbers) pool += charsetEnum.numbers;
  if (options.symbols) pool += charsetEnum.symbols;

  return pool.split('');
};

const defaultOptions = {
  length: 10,
  characters: true,
  numbers: true,
  symbols: true,
  randomCase: true,
  uppercase: false,
  lowercase: false,
  exclude: [],
  excludeSimilarCharacters: false
};

const generate = function (opts) {
  const options = Object.assign(defaultOptions, opts);

  const bytes = randomBytes(options.length);
  const pool = getPool(options);
  let res = '';

  for (let i = 0; i <= options.length - 1; i += 1) {
    res += pool[bytes.readUInt8(i) % pool.length];
  }

  return res;
};

module.exports = generate;
