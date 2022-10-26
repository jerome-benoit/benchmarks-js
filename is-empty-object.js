const Benchmark = require('benny')
const { generateRandomInteger } = require('./benchmark-utils')

const size = generateRandomInteger(100000)
const testObject = {}
for (let i = 0; i < size; i++) {
  testObject[i.toString()] = i
}

Benchmark.suite(
  `Is empty object with ${size} keys`,
  Benchmark.add('Reflect keys', (obj = testObject) => {
    return Reflect.ownKeys(obj).length === 0 && obj?.constructor === Object
  }),
  Benchmark.add('Keys iteration', (obj = testObject) => {
    if (obj?.constructor !== Object) return false
    // Iterates over the keys of an object, if
    // any exist, return false.
    // eslint-disable-next-line no-unreachable-loop
    for (const _ in obj) return false
    return true
  }),
  Benchmark.add('Object keys', (obj = testObject) => {
    return obj?.constructor === Object && !Object.keys(obj).length
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
)
