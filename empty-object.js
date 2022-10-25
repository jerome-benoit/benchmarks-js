const Benchmark = require('benny')

const emptyLiteral = {}

Benchmark.suite(
  'Empty object',
  Benchmark.add('Reflect keys', (obj = emptyLiteral) => {
    return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
  }),
  Benchmark.add('Keys iteration ', (obj = emptyLiteral) => {
    if (obj.constructor !== Object) return false
    // Iterates over the keys of an object, if
    // any exist, return false.
    // eslint-disable-next-line no-unreachable-loop
    for (const _ in obj) return false
    return true
  }),
  Benchmark.add('Object keys', (obj = emptyLiteral) => {
    return obj.constructor === Object && !Object.keys(obj).length
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'empty-object',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'empty-object',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'empty-object',
    format: 'table.html',
    details: true
  })
)
