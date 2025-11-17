import { bench, group, run } from 'tatami-ng'

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

group(`Max from ${size} numbers`, () => {
  bench('Math.max', () => {
    Math.max(...testArray)
  })
  bench('loopMax', () => {
    loopMax(testArray)
  })
  bench('reduceTernaryMax', () => {
    reduceTernaryMax(testArray)
  })
  bench('reduceMathMax', () => {
    reduceMathMax(testArray)
  })
  bench('sortMax', () => {
    sortMax(testArray)
  })
})

await run({
  units: true,
})
