import Benchmark from 'benny'

Benchmark.suite(
  'Is undefined',
  Benchmark.add('=== undefined', (value = undefined) => {
    return value === undefined
  }),
  Benchmark.add("typeof === 'undefined'", (value = undefined) => {
    return typeof value === 'undefined'
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'is-undefined',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'is-undefined',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'is-undefined',
    format: 'table.html',
    details: true
  })
).catch(err => {
  console.error(err)
})
