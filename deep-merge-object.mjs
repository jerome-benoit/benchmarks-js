import deepMerge from 'deepmerge'
import _ from 'lodash'
import { merge as rambdaMerge } from 'rambda'
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
  .add('rambda merge', (obj = object) => {
    rambdaMerge(obj, objectToMerge)
  })
  .add('deepmerge', (obj = object) => {
    deepMerge(obj, objectToMerge)
  })

await bench.run()

console.table(bench.table())
