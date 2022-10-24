const Benchmark = require('benny')
const { secureRandom } = require('./benchmark-utils')

const maximum = Number.MAX_SAFE_INTEGER

/**
 * @param max
 * @param min
 * @returns
 */
function getSecureRandomInteger (max = Number.MAX_SAFE_INTEGER, min = 0) {
  max = Math.floor(max)
  if (min) {
    min = Math.ceil(min)
    return Math.floor(secureRandom() * (max - min + 1)) + min
  }
  return Math.floor(secureRandom() * (max + 1))
}

/**
 * @param max
 * @param min
 * @returns
 */
function getRandomInteger (max = Number.MAX_SAFE_INTEGER, min = 0) {
  max = Math.floor(max)
  if (min) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  return Math.floor(Math.random() * (max + 1))
}

Benchmark.suite(
  'Random Integer Generator',
  Benchmark.add('Secure random integer generator', function () {
    getSecureRandomInteger(maximum)
  }),
  Benchmark.add('Random integer generator', function () {
    getRandomInteger(maximum)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'random-integer-generator',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'random-integer-generator',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'random-integer-generator',
    format: 'table.html',
    details: true
  })
)
