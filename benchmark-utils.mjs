import crypto from 'crypto'

/**
 * Generate a cryptographically secure random number in the [0,1[ range
 * @returns
 */
export function secureRandom () {
  return crypto.randomBytes(4).readUInt32LE() / 0x100000000
}

/**
 * Generate a cryptographically secure random number in the [0,1[ range
 * @returns
 */
export function secureRandomWithRandomValues () {
  return crypto.getRandomValues(new Uint32Array(1))[0] / 0x100000000
}

/**
 * @param max
 * @param min
 * @returns
 */
export function generateRandomInteger (max = Number.MAX_SAFE_INTEGER, min = 0) {
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
 * @returns
 */
export function generateRandomFloat (max = Number.MAX_VALUE, min = 0) {
  if (max < min) {
    throw new RangeError('Invalid interval')
  }
  if (max - min === Infinity) {
    throw new RangeError('Invalid interval')
  }
  return (crypto.randomBytes(4).readUInt32LE() / 0xffffffff) * (max - min) + min
}

/**
 *
 * @param size
 * @param max
 * @param numberGenerator
 * @returns
 */
export function generateRandomNumberArray (
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
export function generateRandomObject (
  sizeMax = 500,
  numberMax = Number.MAX_VALUE,
  numberGenerator = generateRandomFloat
) {
  const size = generateRandomInteger(sizeMax)
  const object = {}
  for (let i = 0; i < size; i++) {
    object[i.toString()] = numberGenerator(numberMax)
  }
  return object
}

/**
 * @param ms
 * @returns
 */
export async function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
