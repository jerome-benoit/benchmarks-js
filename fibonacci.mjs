import Benchmark from 'benny'

const number = 30

/**
 * @param num
 * @returns
 */
function fibonacciLoop (num) {
  const fib = []
  fib[0] = 0
  fib[1] = 1
  for (let i = 2; i <= num; i++) {
    fib[i] = fib[i - 2] + fib[i - 1]
  }
  return fib[num]
}

/**
 *
 * @param num
 * @returns
 */
function fibonacciLoopWhile (num) {
  let current = 1
  let previous = 0
  while (--num) {
    const temp = current
    current += previous
    previous = temp
  }
  return current
}

/**
 * @param num
 * @returns
 */
function fibonacciRecursion (num) {
  if (num <= 1) return num
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
  if (num <= 1) return num

  return (memo[num] =
    fibonacciRecursionMemoization(num - 1, memo) +
    fibonacciRecursionMemoization(num - 2, memo))
}

Benchmark.suite(
  `Fibonacci number ${number}`,
  Benchmark.add('fibonacciLoop', () => {
    fibonacciLoop(number)
  }),
  Benchmark.add('fibonacciLoopWhile', () => {
    fibonacciLoopWhile(number)
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
).catch(err => {
  console.error(err)
})
