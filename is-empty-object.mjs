import _ from 'lodash'
import { isEmpty as ramdaIsEmpty } from 'ramda'
import { isEmpty as remedaIsEmpty } from 'remeda'
import { Bench } from 'tinybench'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

const bench = new Bench({
  name: `Is empty object with ${Object.keys(object).length} keys`,
  time: 100,
})

bench
  .add('Reflect keys', (obj = object) => {
    return obj?.constructor === Object && Reflect.ownKeys(obj).length === 0
  })
  .add('Keys iteration', (obj = object) => {
    if (obj?.constructor !== Object) return false
    // Iterates over the keys of an object, if
    // any exist, return false.
    // eslint-disable-next-line no-unreachable-loop
    for (const _ in obj) return false
    return true
  })
  .add('Object keys', (obj = object) => {
    return obj?.constructor === Object && Object.keys(obj).length === 0
  })
  .add('lodash isEmpty', (obj = object) => {
    _.isEmpty(obj)
  })
  .add('ramda isEmpty', (obj = object) => {
    ramdaIsEmpty(obj)
  })
  .add('remeda isEmpty', (obj = object) => {
    remedaIsEmpty(obj)
  })

await bench.run()

console.table(bench.table())
