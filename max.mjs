import * as R from 'ramda'
import { Bench } from 'tinybench'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size)

/**
 * Finds the maximum value in an array using a loop.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The maximum value in the array.
 */
function loopMax (values) {
  let maximum = Number.NEGATIVE_INFINITY
  for (const value of values) {
    if (value > maximum) maximum = value
  }
  return maximum
}

/**
 * Finds the maximum value in an array using reduce with Math.max.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The maximum value in the array.
 */
function reduceMathMax (values) {
  return values.reduce(
    (maximum, num) => Math.max(maximum, num),
    Number.NEGATIVE_INFINITY
  )
}

/**
 * Finds the maximum value in an array using reduce with ternary operator.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The maximum value in the array.
 */
function reduceTernaryMax (values) {
  return values.reduce(
    (maximum, num) => (maximum > num ? maximum : num),
    Number.NEGATIVE_INFINITY
  )
}

/**
 * Finds the maximum value in an array by sorting.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The maximum value in the array.
 */
function sortMax (values) {
  return values.sort((a, b) => b - a)[0]
}

const bench = new Bench({
  name: `Max from ${size} numbers`,
  time: 100,
})

bench
  .add('Math.max', () => {
    Math.max(...testArray)
  })
  .add('loopMax', () => {
    loopMax(testArray)
  })
  .add('reduceTernaryMax', () => {
    reduceTernaryMax(testArray)
  })
  .add('reduceMathMax', () => {
    reduceMathMax(testArray)
  })
  .add('sortMax', () => {
    sortMax(testArray)
  })
  .add('ramda reduce max', () => {
    R.reduce(R.max, Number.NEGATIVE_INFINITY, testArray)
  })

await bench.run()

console.table(bench.table())
