import hashObject from 'hash-object'
import { hasher } from 'node-object-hash'
import hash from 'object-hash'
import { bench, group, run } from 'tatami-ng'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

group(`Hash object with ${Object.keys(object).length} keys`, () => {
  bench('hash-object', (obj = object) => {
    return hashObject(obj, { algorithm: 'sha256' })
  })
  bench('node-object-hash', (obj = object) => {
    return hasher({ alg: 'sha256' }).hash(obj)
  })
  bench('object-hash', (obj = object) => {
    return hash(obj, { algorithm: 'sha256' })
  })
})

await run({
  units: true
})
