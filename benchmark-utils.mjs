import { getRandomValues, randomBytes, randomInt } from 'node:crypto'

/**
 * Generate a cryptographically secure random number in the [0,1[ range
 * @returns
 */
export function secureRandom () {
  return randomBytes(4).readUInt32LE() / 0x100000000
}

/**
 * Generate a cryptographically secure random number in the [0,1[ range
 * @returns
 */
export function secureRandomWithRandomValues () {
  return getRandomValues(new Uint32Array(1))[0] / 0x100000000
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
  if (max - min === Number.POSITIVE_INFINITY) {
    throw new RangeError('Invalid interval')
  }
  return (randomBytes(4).readUInt32LE() / 0xffffffff) * (max - min) + min
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
  const size = randomInt(sizeMax)
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
  return await new Promise(resolve => setTimeout(resolve, ms))
}
