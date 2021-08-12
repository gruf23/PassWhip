# passWhip ![nodejs workflow](https://github.com/gruf23/PassWhip/actions/workflows/nodejs.yml/badge.svg)
[![NPM](https://nodei.co/npm/passwhip.png)](https://nodei.co/npm/passwhip/)

## Motivation
Existing password generating packets are using the `Math.random()`, which doesn't provide a proper level of entropy,
or it can be applied only in nodejs **or** browser environment.

## Usage
### Installation
`npm i --save passwhip`
### Include the module
```javascript
import { generatePassword } from 'passWhip';
```

Package is also available to use as [UMD Module](https://github.com/umdjs/umd), UMD bundle, ESM, and bundled ESM (check out a `lib` directory)

### Call it
```javascript
// for CJS or es2015 module call 
generatePassword({
  numbers: true
}); // j>z8zquMh!

// if you're use an UMD module
passWhip.generatePassword({
  symbols: true
}); // r<X2vbQ+Tl
```

### Available options

| Name                     | Description                                                 | Default<br /> value |
| ------------------------ | ----------------------------------------------------------- | ------------------- |
| length                   | Integer. Length of password.                                | 12                  |
| letters                  | Boolean. Put letters in password.                           | true                |
| numbers                  | Boolean. Put numbers in password.                           | true                |
| symbols                  | Boolean. Put symbols in password.                           | true                |
| randomCase               | Boolean. Letters in random case.                            | true                |
| uppercase                | Boolean. Letters in upper case.                             | false               |
| lowercase                | Boolean. Letters in lower case.                             | false               |
| exclude                  | String[]. Characters to be excluded from password.          | []                  |
| excludeSimilarCharacters | Boolean. Exclude visually similar characters from password. | false               |
