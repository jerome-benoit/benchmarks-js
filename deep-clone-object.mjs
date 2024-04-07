/* eslint-disable no-unused-vars */
import deepClone from 'deep-clone'
import clone from 'just-clone'
import _ from 'lodash'
import { clone as rambdaClone } from 'rambda'
import { bench, group, run } from 'tatami-ng'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

group(`Deep clone object with ${Object.keys(object).length} keys`, () => {
  bench('JSON stringify/parse', (obj = object) => {
    const objCloned = JSON.parse(JSON.stringify(obj))
  })
  bench('structuredClone', (obj = object) => {
    const objCloned = structuredClone(obj)
  })
  bench('lodash cloneDeep', (obj = object) => {
    const objCloned = _.cloneDeep(obj)
  })
  bench('rambda clone', (obj = object) => {
    const objCloned = rambdaClone(obj)
  })
  bench('just-clone', (obj = object) => {
    const objCloned = clone(obj)
  })
  bench('deep-clone', (obj = object) => {
    const objCloned = deepClone(obj)
  })
})

await run({
  units: true
})
