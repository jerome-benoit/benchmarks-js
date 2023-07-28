/* eslint-disable no-unused-vars */
import Benchmark from 'benny'
import _ from 'lodash'
import clone from 'just-clone'
import deepClone from 'deep-clone'
import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

Benchmark.suite(
  `Deep clone object with ${Object.keys(object).length} keys`,
  Benchmark.add('JSON stringify/parse', (obj = object) => {
    const objClone = JSON.parse(JSON.stringify(obj))
  }),
  Benchmark.add('structuredClone', (obj = object) => {
    const objClone = structuredClone(obj)
  }),
  Benchmark.add('lodash cloneDeep', (obj = object) => {
    const objClone = _.cloneDeep(obj)
  }),
  Benchmark.add('just-clone', (obj = object) => {
    const objClone = clone(obj)
  }),
  Benchmark.add('deep-clone', (obj = object) => {
    const objClone = deepClone(obj)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'deep-clone-object',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'deep-clone-object',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'deep-clone-object',
    format: 'table.html',
    details: true
  })
).catch(err => {
  console.error(err)
})
