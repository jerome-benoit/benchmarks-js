const Benchmark = require('benchmark')
const { LIST_FORMATTER } = require('./benchmark-utils')

const suite = new Benchmark.Suite()

const number = 30

/**
 * @param num
 */
function fibonacciLoop (num) {
  let a = 1
  let b = 0
  let temp

  while (num >= 0) {
    temp = a
    a = a + b
    b = temp
    num--
  }

  return b
}

/**
 * @param num
 */
function fibonacciRecursion (num) {
  if (num <= 1) return 1

  return fibonacciRecursion(num - 1) + fibonacciRecursion(num - 2)
}

/**
 * @param num
 * @param memo
 */
function fibonacciRecursionMemoization (num, memo) {
  memo = memo || {}

  if (memo[num]) return memo[num]
  if (num <= 1) return 1

  return (memo[num] =
    fibonacciRecursionMemoization(num - 1, memo) +
    fibonacciRecursionMemoization(num - 2, memo))
}

suite
  .add('fibonacciLoop', function () {
    fibonacciLoop(number)
  })
  .add('fibonacciRecursion', function () {
    fibonacciRecursion(number)
  })
  .add('fibonacciRecursionMemoization', function () {
    fibonacciRecursionMemoization(number)
  })
  .on('cycle', function (event) {
    console.log(event.target.toString())
  })
  .on('complete', function () {
    console.log(
      'Fastest is ' + LIST_FORMATTER.format(this.filter('fastest').map('name'))
    )
    // eslint-disable-next-line no-process-exit
    process.exit()
  })
  .run()
