const Benchmark = require('benny')
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid')
const { uuid } = require('uuidv4')

Benchmark.suite(
  'UUIDv4 generator',
  Benchmark.add('crypto randomUUID', () => {
    crypto.randomUUID()
  }),
  Benchmark.add('uuid', () => {
    uuidv4()
  }),
  Benchmark.add('uuidv4', () => {
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
