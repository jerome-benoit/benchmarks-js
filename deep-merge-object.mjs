/* eslint-disable no-unused-vars */
import Benchmark from 'benny'
import _ from 'lodash'
import merge from 'just-merge'
import deepMerge from 'deepmerge'
import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()
const objectToMerge = generateRandomObject()

Benchmark.suite(
  `Deep merge two objects: object with ${
    Object.keys(object).length
  } keys, object with ${Object.keys(objectToMerge).length} keys`,
  Benchmark.add('lodash merge', (obj = object) => {
    const objMerged = _.merge(obj, objectToMerge)
  }),
  Benchmark.add('just-merge', (obj = object) => {
    const objMerged = merge(obj, objectToMerge)
  }),
  Benchmark.add('deep-clone', (obj = object) => {
    const objMerged = deepMerge(obj, objectToMerge)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'deep-merge-object',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'deep-merge-object',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'deep-merge-object',
    format: 'table.html',
    details: true
  })
).catch(err => {
  console.error(err)
})
