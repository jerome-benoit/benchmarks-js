import _ from 'lodash'
import { bench, group, run } from 'mitata'
import { isEmpty } from 'rambda'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

group(`Is empty object with ${Object.keys(object).length} keys`, () => {
  bench('Reflect keys', (obj = object) => {
    return obj?.constructor === Object && Reflect.ownKeys(obj).length === 0
  })
  bench('Keys iteration', (obj = object) => {
    if (obj?.constructor !== Object) return false
    // Iterates over the keys of an object, if
    // any exist, return false.
    // eslint-disable-next-line no-unreachable-loop
    for (const _ in obj) return false
    return true
  })
  bench('Object keys', (obj = object) => {
    return obj?.constructor === Object && Object.keys(obj).length === 0
  })
  bench('lodash isEmpty', (obj = object) => {
    return _.isEmpty(obj)
  })
  bench('rambda isEmpty', (obj = object) => {
    return isEmpty(obj)
  })
})

await run({
  units: true
})
