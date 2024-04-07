/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { assoc } from 'rambda'
import { bench, group, run } from 'tatami-ng'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

group(`Shallow clone object with ${Object.keys(object).length} keys`, () => {
  bench('Spread', () => {
    const objClone = { ...object }
  })
  bench('Object assign', () => {
    const objClone = Object.assign({}, object)
  })
  bench('lodash clone', () => {
    const objClone = _.clone(object)
  })
  bench('rambda assoc', () => {
    const objClone = assoc(object)
  })
})

await run({
  units: true
})
