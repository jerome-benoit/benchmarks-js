import { getRandomValues, randomBytes, randomInt } from 'node:crypto'

/**
 * Generates a random floating-point number between min and max.
 * @param {number} max - The maximum value (inclusive).
 * @param {number} min - The minimum value (inclusive).
 * @returns {number} A random floating-point number between min and max.
 */
export function generateRandomFloat (max = Number.MAX_VALUE, min = 0) {
  if (max < min) {
    throw new RangeError('Invalid interval')
  }
  if (max - min === Number.POSITIVE_INFINITY) {
    throw new RangeError('Invalid interval')
  }
  return (randomBytes(4).readUInt32LE() / 0xffffffff) * (max - min) + min
}

/**
 * Generates an array of random numbers.
 * @param {number} size - The size of the array to generate.
 * @param {number} max - The maximum value for generated numbers.
 * @param {(max: number, min?: number) => number} numberGenerator - The function to use for generating numbers.
 * @returns {Array<number>} An array of random numbers.
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
 * Generates a random object with numeric values.
 * @param {number} sizeMax - The maximum size of the object.
 * @param {number} numberMax - The maximum value for generated numbers.
 * @param {(max: number, min?: number) => number} numberGenerator - The function to use for generating numbers.
 * @returns {object} A random object with numeric properties.
 */
export function generateRandomObject (
  sizeMax = 500,
  numberMax = Number.MAX_VALUE,
  numberGenerator = generateRandomFloat
) {
  const size = randomInt(sizeMax)
  const object = {}
  for (let i = 0; i < size; i++) {
    object[i.toString()] = numberGenerator(numberMax)
  }
  return object
}

/**
 * Generate a cryptographically secure random number in the [0,1[ range
 * @returns {number} A secure random number between 0 (inclusive) and 1 (exclusive).
 */
export function secureRandom () {
  return randomBytes(4).readUInt32LE() / 0x100000000
}

/**
 * Generate a cryptographically secure random number in the [0,1[ range
 * @returns {number} A secure random number between 0 (inclusive) and 1 (exclusive).
 */
export function secureRandomWithRandomValues () {
  return getRandomValues(new Uint32Array(1))[0] / 0x100000000
}

/**
 * Asynchronously sleep for a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export async function sleep (ms) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}
