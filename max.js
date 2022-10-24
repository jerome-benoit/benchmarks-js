const Benchmark = require('benny')
const { generateRandomNumberArray } = require('./benchmark-utils')

const testArray = generateRandomNumberArray(10000)

/**
 *
 * @param values
 */
function loopMax (values) {
  let max = -Infinity
  for (const value of values) {
    if (value > max) max = value
  }
  return max
}

/**
 *
 * @param values
 */
function reduceTernaryMax (values) {
  return values.reduce((a, b) => (a > b ? a : b), -Infinity)
}

/**
 *
 * @param values
 */
function reduceMathMax (values) {
  return values.reduce((a, b) => Math.max(a, b), -Infinity)
}

/**
 *
 * @param values
 */
function sortMax (values) {
  return values.sort((a, b) => b - a)[0]
}

Benchmark.suite(
  'max',
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
)
