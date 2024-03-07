import Benchmark from 'benny'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size)

/**
 *
 * @param values
 * @returns
 */
function loopMin (values) {
  let minimum = Infinity
  for (const value of values) {
    if (value < minimum) minimum = value
  }
  return minimum
}

/**
 *
 * @param values
 * @returns
 */
function reduceTernaryMin (values) {
  return values.reduce(
    (minimum, num) => (minimum < num ? minimum : num),
    Infinity
  )
}

/**
 *
 * @param values
 * @returns
 */
function reduceMathMin (values) {
  return values.reduce((minimum, num) => Math.min(minimum, num), Infinity)
}

/**
 *
 * @param values
 * @returns
 */
function sortMin (values) {
  return values.sort((a, b) => a - b)[0]
}

Benchmark.suite(
  `Min from ${size} numbers`,
  Benchmark.add('Math.min', () => {
    Math.min(...testArray)
  }),
  Benchmark.add('loopMin', () => {
    loopMin(testArray)
  }),
  Benchmark.add('reduceTernaryMin', () => {
    reduceTernaryMin(testArray)
  }),
  Benchmark.add('reduceMath.min', () => {
    reduceMathMin(testArray)
  }),
  Benchmark.add('sortMin', () => {
    sortMin(testArray)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({ file: 'min', format: 'json', details: true }),
  Benchmark.save({ file: 'min', format: 'chart.html', details: true }),
  Benchmark.save({ file: 'min', format: 'table.html', details: true })
).catch(console.error)
