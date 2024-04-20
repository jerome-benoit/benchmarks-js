/* eslint-disable no-unused-vars */
import deepMerge from 'deepmerge'
import _ from 'lodash'
import { mergeDeepRight } from 'rambda'
import { bench, group, run } from 'tatami-ng'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()
const objectToMerge = generateRandomObject()

group(
  `Deep merge two objects: object with ${
    Object.keys(object).length
  } keys, object with ${Object.keys(objectToMerge).length} keys`,
  () => {
    bench('lodash merge', (obj = object) => {
      _.merge(obj, objectToMerge)
    })
    bench('rambda mergeDeepRight', (obj = object) => {
      mergeDeepRight(obj, objectToMerge)
    })
    bench('deepmerge', (obj = object) => {
      deepMerge(obj, objectToMerge)
    })
  }
)

await run({
  units: true
})
