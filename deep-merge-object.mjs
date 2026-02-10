import deepMerge from 'deepmerge'
import _ from 'lodash'
import { mergeDeepRight as ramdaMergeDeepRight } from 'ramda'
import { mergeDeep as remedaMergeDeep } from 'remeda'
import { Bench } from 'tinybench'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()
const objectToMerge = generateRandomObject()

const bench = new Bench({
  name: `Deep merge two objects: object with ${
    Object.keys(object).length
  } keys, object with ${Object.keys(objectToMerge).length} keys`,
  time: 100,
})

bench
  .add('lodash merge', (obj = object) => {
    _.merge(obj, objectToMerge)
  })
  .add('deepmerge', (obj = object) => {
    deepMerge(obj, objectToMerge)
  })
  .add('ramda mergeDeepRight', (obj = object) => {
    ramdaMergeDeepRight(obj, objectToMerge)
  })
  .add('remeda mergeDeep', (obj = object) => {
    remedaMergeDeep(obj, objectToMerge)
  })

await bench.run()

console.table(bench.table())
