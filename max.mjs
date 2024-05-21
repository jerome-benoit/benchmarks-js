import { bench, group, run } from 'tatami-ng'

import { generateRandomNumberArray } from './benchmark-utils.mjs'

const size = 10000
const testArray = generateRandomNumberArray(size)

/**
 *
 * @param values
 * @returns
 */
function loopMax (values) {
  let maximum = Number.NEGATIVE_INFINITY
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
    Number.NEGATIVE_INFINITY
  )
}

/**
 *
 * @param values
 * @returns
 */
function reduceMathMax (values) {
  return values.reduce(
    (maximum, num) => Math.max(maximum, num),
    Number.NEGATIVE_INFINITY
  )
}

/**
 *
 * @param values
 * @returns
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
  units: true
})
