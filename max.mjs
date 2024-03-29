import Benchmark from 'benny'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size)

/**
 *
 * @param values
 * @returns
 */
function loopMax (values) {
  let maximum = -Infinity
  for (const value of values) {
    if (value > maximum) maximum = value
  }
  return maximum
}

/**
 *
 * @param values
 * @returns
 */
function reduceTernaryMax (values) {
  return values.reduce(
    (maximum, num) => (maximum > num ? maximum : num),
    -Infinity
  )
}

/**
 *
 * @param values
 * @returns
 */
function reduceMathMax (values) {
  return values.reduce((maximum, num) => Math.max(maximum, num), -Infinity)
}

/**
 *
 * @param values
 * @returns
 */
function sortMax (values) {
  return values.sort((a, b) => b - a)[0]
}

Benchmark.suite(
  `Max from ${size} numbers`,
  Benchmark.add('Math.max', () => {
    Math.max(...testArray)
  }),
  Benchmark.add('loopMax', () => {
    loopMax(testArray)
  }),
  Benchmark.add('reduceTernaryMax', () => {
    reduceTernaryMax(testArray)
  }),
  Benchmark.add('reduceMath.max', () => {
    reduceMathMax(testArray)
  }),
  Benchmark.add('sortMax', () => {
    sortMax(testArray)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({ file: 'max', format: 'json', details: true }),
  Benchmark.save({ file: 'max', format: 'chart.html', details: true }),
  Benchmark.save({ file: 'max', format: 'table.html', details: true })
).catch(console.error)
