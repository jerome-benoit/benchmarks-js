import { bench, group, run } from 'tatami-ng'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size)

/**
 * Finds the minimum value in an array using a loop.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The minimum value in the array.
 */
function loopMin (values) {
  let minimum = Number.POSITIVE_INFINITY
  for (const value of values) {
    if (value < minimum) minimum = value
  }
  return minimum
}

/**
 * Finds the minimum value in an array using reduce with Math.min.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The minimum value in the array.
 */
function reduceMathMin (values) {
  return values.reduce(
    (minimum, num) => Math.min(minimum, num),
    Number.POSITIVE_INFINITY
  )
}

/**
 * Finds the minimum value in an array using reduce with ternary operator.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The minimum value in the array.
 */
function reduceTernaryMin (values) {
  return values.reduce(
    (minimum, num) => (minimum < num ? minimum : num),
    Number.POSITIVE_INFINITY
  )
}

/**
 * Finds the minimum value in an array by sorting.
 * @param {Array<number>} values - The array of numbers to search.
 * @returns {number} The minimum value in the array.
 */
function sortMin (values) {
  return values.sort((a, b) => a - b)[0]
}

group(`Min from ${size} numbers`, () => {
  bench('Math.min', () => {
    Math.min(...testArray)
  })
  bench('loopMin', () => {
    loopMin(testArray)
  })
  bench('reduceTernaryMin', () => {
    reduceTernaryMin(testArray)
  })
  bench('reduceMathMin', () => {
    reduceMathMin(testArray)
  })
  bench('sortMin', () => {
    sortMin(testArray)
  })
})

await run({
  units: true,
})
