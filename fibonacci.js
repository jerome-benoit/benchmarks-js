const Benchmark = require('benny')

const number = 30

/**
 * @param num
 * @returns
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
 * @returns
 */
function fibonacciRecursion (num) {
  if (num <= 1) return 1

  return fibonacciRecursion(num - 1) + fibonacciRecursion(num - 2)
}

/**
 * @param num
 * @param memo
 * @returns
 */
function fibonacciRecursionMemoization (num, memo) {
  memo = memo || {}

  if (memo[num]) return memo[num]
  if (num <= 1) return 1

  return (memo[num] =
    fibonacciRecursionMemoization(num - 1, memo) +
    fibonacciRecursionMemoization(num - 2, memo))
}

Benchmark.suite(
  `Fibonacci number ${number}`,
  Benchmark.add('fibonacciLoop', () => {
    fibonacciLoop(number)
  }),
  Benchmark.add('fibonacciRecursion', () => {
    fibonacciRecursion(number)
  }),
  Benchmark.add('fibonacciRecursionMemoization', () => {
    fibonacciRecursionMemoization(number)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({ file: 'fibonacci', format: 'json', details: true }),
  Benchmark.save({ file: 'fibonacci', format: 'chart.html', details: true }),
  Benchmark.save({ file: 'fibonacci', format: 'table.html', details: true })
)
