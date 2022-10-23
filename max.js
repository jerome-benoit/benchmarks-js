const Benchmark = require('benny')

const testArray = [
  83, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62,
  99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28,
  83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93,
  17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32,
  45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32, 56, 67,
  77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23, 56, 32,
  56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828, 234, 23,
  56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27, 29, 2828,
  234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28, 93, 27,
  29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99, 36, 28,
  93, 27, 29, 2828, 234, 23, 56, 32, 56, 67, 77, 32, 45, 93, 17, 28, 83, 62, 99,
  36, 28
]

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
  Benchmark.add('reduceMathMax', () => {
    reduceMathMax(testArray)
  }),
  Benchmark.add('sortMax', () => {
    sortMax(testArray)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({ file: 'max', format: 'chart.html' }),
  Benchmark.save({ file: 'max', format: 'table.html' })
)
