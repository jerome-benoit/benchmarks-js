import deepClone from 'deep-clone'
import clone from 'just-clone'
import _ from 'lodash'
import { clone as ramdaClone } from 'ramda'
import { clone as remedaClone } from 'remeda'
import { Bench } from 'tinybench'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

const bench = new Bench({
  name: `Deep clone object (${JSON.stringify(object)})`,
  time: 100,
})

bench
  .add('JSON stringify/parse', (obj = object) => {
    JSON.parse(JSON.stringify(obj))
  })
  .add('structuredClone', (obj = object) => {
    structuredClone(obj)
  })
  .add('lodash cloneDeep', (obj = object) => {
    _.cloneDeep(obj)
  })
  .add('just-clone', (obj = object) => {
    clone(obj)
  })
  .add('deep-clone', (obj = object) => {
    deepClone(obj)
  })
  .add('ramda clone', (obj = object) => {
    ramdaClone(obj)
  })
  .add('remeda clone', (obj = object) => {
    remedaClone(obj)
  })

await bench.run()

console.table(bench.table())
