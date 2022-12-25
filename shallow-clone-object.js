/* eslint-disable no-unused-vars */
const Benchmark = require('benny')
const { generateRandomInteger } = require('./benchmark-utils')
const _ = require('lodash')

const size = generateRandomInteger(500)
const testObject = {}
for (let i = 0; i < size; i++) {
  testObject[i.toString()] = i
}

Benchmark.suite(
  `Shallow clone object with ${size} keys`,
  Benchmark.add('Spread', (obj = testObject) => {
    const objClone = { ...obj }
  }),
  Benchmark.add('Object assign', (obj = testObject) => {
    const objClone = Object.assign({}, obj)
  }),
  Benchmark.add('lodash clone', (obj = testObject) => {
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
)
