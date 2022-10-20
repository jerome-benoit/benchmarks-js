const Benchmark = require('benchmark')
const { LIST_FORMATTER, secureRandom } = require('./benchmark-utils')

const suite = new Benchmark.Suite()

const maximum = 1000

/**
 * @param max
 * @param min
 * @returns
 */
function getSecureRandomInteger (max, min = 0) {
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
function getRandomInteger (max, min = 0) {
  max = Math.floor(max)
  if (min) {
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  return Math.floor(Math.random() * (max + 1))
}

suite
  .add('Secure random integer generator', function () {
    getSecureRandomInteger(maximum)
  })
  .add('Random integer generator', function () {
    getRandomInteger(maximum)
  })
  .on('cycle', function (event) {
    console.log(event.target.toString())
  })
  .on('complete', function () {
    console.log(
      'Fastest is ' + LIST_FORMATTER.format(this.filter('fastest').map('name'))
    )
    // eslint-disable-next-line n/no-process-exit
    process.exit()
  })
  .run()
