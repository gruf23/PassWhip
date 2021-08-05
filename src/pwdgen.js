const {randomBytes} = require('crypto');

const defaultOptions = {
  length: 10,
  letters: true,
  numbers: true,
  symbols: true,
  randomCase: true,
  uppercase: false,
  lowercase: false,
  exclude: [],
  excludeSimilarCharacters: false
};

const charsetEnum = Object.freeze({
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
});

/**
 * Get pull of characters, available to use in password
 * @param {Object} options - options parameter of generate function.
 * @return {string[]}
 */
const getPool = function (options) {
  let pool = '';
  if (options.letters) {
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
  }
  if (options.numbers) pool += charsetEnum.numbers;
  if (options.symbols) pool += charsetEnum.symbols;
  if (options.exclude) {
    options.exclude.map(char => {
      pool = pool.replace(char, '');
    });
  }
  if (options.excludeSimilarCharacters) {
    pool = pool.replace(/[ilLI|`oO0]/g, '');
  }
  if (!pool.length) {
    throw new Error('Pool shouldn\'t be empty.');
  }
  return pool.split('');
};

/**
 * Generate password
 * @param opts - password string settings
 * @param {Number} opts.length - password length
 * @param {boolean} opts.letters - Should password include letters
 * @param {boolean} opts.numbers - Should password include numbers
 * @param {boolean} opts.symbols - Should password include special chars
 * @param {boolean} opts.randomCase - Should password include random case letters
 * @param {boolean} opts.uppercase - Should password include uppercase letters
 * @param {boolean} opts.lowercase - Should password include lowercase letters
 * @param {[]} opts.exclude - Characters, that shouldn't be in a generated password
 * @param {boolean} opts.excludeSimilarCharacters - Exclude visually similar characters from password
 * @return {string}
 */
const generatePassword = function (opts) {
  const options = Object.assign(defaultOptions, opts);

  const bytes = randomBytes(options.length);
  const pool = getPool(options);
  let password = '';

  for (let i = 0; i <= options.length - 1; i += 1) {
    password += pool[bytes.readUInt8(i) % pool.length];
  }

  return password;
};

module.exports = generatePassword;
