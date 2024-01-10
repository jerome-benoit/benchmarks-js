import { randomInt } from 'node:crypto'
import Benchmark from 'benny'
import {
  secureRandom,
  secureRandomWithRandomValues
} from './benchmark-utils.mjs'

const maximum = 281474976710654

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

Benchmark.suite(
  'Random Integer Generator',
  Benchmark.add('Secure random integer generator', () => {
    getSecureRandomInteger(maximum)
  }),
  Benchmark.add(
    'Secure random with getRandomValues() integer generator',
    () => {
      getSecureRandomIntegerWithRandomValues(maximum)
    }
  ),
  Benchmark.add('Crypto random integer generator', (max = maximum, min = 0) => {
    max = Math.floor(max)
    if (min !== 0) {
      min = Math.ceil(min)
      return Math.floor(randomInt(min, max + 1))
    }
    return Math.floor(randomInt(max + 1))
  }),
  Benchmark.add('Math random integer generator', () => {
    getRandomInteger(maximum)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'random-integer-generator',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'random-integer-generator',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'random-integer-generator',
    format: 'table.html',
    details: true
  })
).catch(console.error)
