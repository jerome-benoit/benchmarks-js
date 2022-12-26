const crypto = require('crypto')

/**
 * Generate a cryptographically secure random number in the [0,1[ range
 *
 * @returns
 */
function secureRandom () {
  return crypto.randomBytes(4).readUInt32LE() / 0x100000000
}

/**
 * @param max
 * @param min
 * @returns
 */
function generateRandomInteger (max = Number.MAX_SAFE_INTEGER, min = 0) {
  if (max < min || max < 0 || min < 0) {
    throw new RangeError('Invalid interval')
  }
  max = Math.floor(max)
  if (min != null && min !== 0) {
    min = Math.ceil(min)
    return Math.floor(secureRandom() * (max - min + 1)) + min
  }
  return Math.floor(secureRandom() * (max + 1))
}

/**
 *
 * @param max
 * @param min
 * @param negative
 * @returns
 */
function generateRandomFloat (max = Number.MAX_VALUE, min = 0, negative = true) {
  if (max < min || max < 0 || min < 0) {
    throw new RangeError('Invalid interval')
  }
  const randomPositiveFloat = crypto.randomBytes(4).readUInt32LE() / 0xffffffff
  const sign = negative && randomPositiveFloat < 0.5 ? -1 : 1
  return sign * (randomPositiveFloat * (max - min) + min)
}

/**
 *
 * @param size
 * @param max
 * @param numberGenerator
 * @returns
 */
function generateRandomNumberArray (
  size,
  max = Number.MAX_VALUE,
  numberGenerator = generateRandomFloat
) {
  const array = []
  for (let i = 0; i < size; i++) {
    array.push(numberGenerator(max))
  }
  return array
}

/**
 *
 * @param sizeMax
 * @param numberMax
 * @param numberGenerator
 * @returns
 */
function generateRandomObject (
  sizeMax = 500,
  numberMax = Number.MAX_VALUE,
  numberGenerator = generateRandomFloat
) {
  const size = generateRandomInteger(sizeMax)
  const object = {}
  for (let i = 0; i < size; i++) {
    object[i.toString()] = numberGenerator(numberMax)
  }
  return { object, size }
}

/**
 * @param ms
 * @returns
 */
async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  generateRandomInteger,
  generateRandomFloat,
  generateRandomNumberArray,
  generateRandomObject,
  sleep,
  secureRandom
}
