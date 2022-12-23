/* eslint-disable no-unused-vars */
const Benchmark = require('benny')
const { generateRandomInteger } = require('./benchmark-utils')
const _ = require('lodash')
const clone = require('just-clone')

const size = generateRandomInteger(500)
const testObject = {}
for (let i = 0; i < size; i++) {
  testObject[i.toString()] = i
}

Benchmark.suite(
  `Clone object with ${size} keys`,
  Benchmark.add('structuredClone', (obj = testObject) => {
    const objClone = structuredClone(obj)
  }),
  Benchmark.add('Spread', (obj = testObject) => {
    const objClone = { ...obj }
  }),
  Benchmark.add('Object assign', (obj = testObject) => {
    const objClone = Object.assign({}, obj)
  }),
  Benchmark.add('JSON stringify/parse', (obj = testObject) => {
    const objClone = JSON.parse(JSON.stringify(obj))
  }),
  Benchmark.add('lodash clone', (obj = testObject) => {
    const objClone = _.clone(obj)
  }),
  Benchmark.add('lodash deep clone', (obj = testObject) => {
    const objClone = _.cloneDeep(obj)
  }),
  Benchmark.add('just-clone', (obj = testObject) => {
    const objClone = clone(obj)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'clone-object',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'clone-object',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'clone-object',
    format: 'table.html',
    details: true
  })
)
