import { randomInt } from 'node:crypto'
import { bench, group, run } from 'tatami-ng'

import {
  secureRandom,
  secureRandomWithRandomValues,
} from './benchmark-utils.mjs'

const maximum = 281474976710655

/**
 * @param max
 * @param min
 * @returns
 */
function getSecureRandomInteger (max = Number.MAX_SAFE_INTEGER, min = 0) {
  if (max < min || max < 0 || min < 0) {
    throw new RangeError('Invalid interval')
  }
  max = Math.floor(max)
  if (min !== 0) {
    min = Math.ceil(min)
    return Math.floor(secureRandom() * (max - min + 1)) + min
  }
  return Math.floor(secureRandom() * (max + 1))
}

/**
 * @param max
 * @param min
 * @returns
 */
function getSecureRandomIntegerWithRandomValues (
  max = Number.MAX_SAFE_INTEGER,
  min = 0
) {
  if (max < min || max < 0 || min < 0) {
    throw new RangeError('Invalid interval')
  }
  max = Math.floor(max)
  if (min !== 0) {
    min = Math.ceil(min)
    return Math.floor(secureRandomWithRandomValues() * (max - min + 1)) + min
  }
  return Math.floor(secureRandomWithRandomValues() * (max + 1))
}

/**
 * @param max
 * @param min
 * @returns
 */
function getRandomInteger (max = Number.MAX_SAFE_INTEGER, min = 0) {
  if (max < min || max < 0 || min < 0) {
    throw new RangeError('Invalid interval')
  }
  max = Math.floor(max)
  if (min !== 0) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  return Math.floor(Math.random() * (max + 1))
}

group('Random Integer Generator', () => {
  bench('Secure random integer generator', () => {
    getSecureRandomInteger(maximum)
  })
  bench('Secure random with getRandomValues() integer generator', () => {
    getSecureRandomIntegerWithRandomValues(maximum)
  })
  bench('Crypto random integer generator', () => {
    randomInt(maximum)
  })
  bench('Math random integer generator', () => {
    getRandomInteger(maximum)
  })
})

await run({
  units: true,
})
