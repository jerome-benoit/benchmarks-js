/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { assoc } from 'rambda'
import { bench, group, run } from 'tatami-ng'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

group(`Shallow clone object with ${Object.keys(object).length} keys`, () => {
  bench('Spread', () => {
    return { ...object }
  })
  bench('Object assign', () => {
    return Object.assign({}, object)
  })
  bench('lodash clone', () => {
    _.clone(object)
  })
  bench('rambda assoc', () => {
    assoc(object)
  })
})

await run({
  units: true
})
