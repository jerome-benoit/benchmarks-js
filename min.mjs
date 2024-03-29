import { bench, group, run } from 'mitata'

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
  units: true
})
