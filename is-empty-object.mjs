import Benchmark from 'benny'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

Benchmark.suite(
  `Is empty object with ${Object.keys(object).length} keys`,
  Benchmark.add('Reflect keys', (obj = object) => {
    return obj?.constructor === Object && Reflect.ownKeys(obj).length === 0
  }),
  Benchmark.add('Keys iteration', (obj = object) => {
    if (obj?.constructor !== Object) return false
    // Iterates over the keys of an object, if
    // any exist, return false.
    // eslint-disable-next-line no-unreachable-loop
    for (const _ in obj) return false
    return true
  }),
  Benchmark.add('Object keys', (obj = object) => {
    return obj?.constructor === Object && Object.keys(obj).length === 0
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'is-empty-object',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'is-empty-object',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'is-empty-object',
    format: 'table.html',
    details: true
  })
).catch(console.error)
