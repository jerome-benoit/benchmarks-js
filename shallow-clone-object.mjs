/* eslint-disable no-unused-vars */
import Benchmark from 'benny'
import _ from 'lodash'
import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

Benchmark.suite(
  `Shallow clone object with ${Object.keys(object).length} keys`,
  Benchmark.add('Spread', (obj = object) => {
    const objClone = { ...obj }
  }),
  Benchmark.add('Object assign', (obj = object) => {
    const objClone = Object.assign({}, obj)
  }),
  Benchmark.add('lodash clone', (obj = object) => {
    const objClone = _.clone(obj)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'shallow-clone-object',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'shallow-clone-object',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'shallow-clone-object',
    format: 'table.html',
    details: true
  })
).catch(err => {
  console.error(err)
})
