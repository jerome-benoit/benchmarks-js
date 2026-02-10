import hashObject from 'hash-object'
import { hasher } from 'node-object-hash'
import hash from 'object-hash'
import { Bench } from 'tinybench'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

const bench = new Bench({
  name: `Hash object with ${Object.keys(object).length} keys`,
  time: 100,
})

bench
  .add('hash-object', (obj = object) => {
    return hashObject(obj, { algorithm: 'sha256' })
  })
  .add('node-object-hash', (obj = object) => {
    return hasher({ alg: 'sha256' }).hash(obj)
  })
  .add('object-hash', (obj = object) => {
    return hash(obj, { algorithm: 'sha256' })
  })

await bench.run()

console.table(bench.table())
