// @ts-ignore
const isBrowserEnv = !!(typeof self !== 'undefined' && (self.crypto || self.msCrypto));

const randomBytes = function (length: number): Uint8Array {
  if (isBrowserEnv) {
    // @ts-ignore
    const crypto = (self.crypto || self.msCrypto); // msCrypto if runs on IE11
    const quota = 65536
    const array = new Uint8Array(length);
    for (let i = 0; i < length; i += quota) {
      crypto.getRandomValues(array.subarray(i, i + Math.min(length - i, quota)));
    }
    return array;
  } else {
    const {randomBytes} = require('crypto');
    return randomBytes(length);
  }
};

interface Options {
  length: number,
  letters: boolean,
  numbers: boolean,
  symbols: boolean,
  randomCase: boolean,
  uppercase: boolean,
  lowercase: boolean,
  exclude: string[],
  excludeSimilarCharacters: boolean
}

const defaultOptions: Options = {
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

enum Charset {
    lowercase = 'abcdefghijklmnopqrstuvwxyz',
    uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers = '0123456789',
    symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~'
}

/**
 * Get pull of characters, available to use in password
 * @param {Object} options - options parameter of generate function.
 * @return {string[]}
 */
const getPool = function (options: Options): string[] {
  let pool = '';
  if (options.letters) {
    if (options.randomCase || (options.uppercase && options.lowercase)) {
      pool += Charset.lowercase + Charset.uppercase;
    } else {
      if (options.uppercase && !options.lowercase) {
        pool += Charset.uppercase;
      } else if (options.lowercase && !options.uppercase) {
        pool += Charset.lowercase;
      } else {
        throw new Error('Case must be selected');
      }
    }
  }
  if (options.numbers) pool += Charset.numbers;
  if (options.symbols) pool += Charset.symbols;
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
export const generatePassword = function (opts: Options): string {  // todo create interface for options
  const options = Object.assign(defaultOptions, opts);

  const bytes = randomBytes(options.length);
  const pool = getPool(options);
  let password = '';
  for (let i = 0; i <= options.length - 1; i += 1) {
    password += pool[bytes[i] % pool.length];
  }

  return password;
};
