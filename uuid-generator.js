const Benchmark = require('benny')
const crypto = require('crypto')
const { v4: uuid } = require('uuid')

Benchmark.suite(
  'UUIDv4 generator',
  Benchmark.add('crypto randomUUID', () => {
    crypto.randomUUID()
  }),
  Benchmark.add('uuid', () => {
    uuid()
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'uuid-generator',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'uuid-generator',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'uuid-generator',
    format: 'table.html',
    details: true
  })
)
