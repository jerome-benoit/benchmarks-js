import { Bench } from 'tinybench'

const number = 30

/**
 * Calculates the Fibonacci number at position num using a loop with array.
 * @param {number} num - The position in the Fibonacci sequence.
 * @returns {number} The Fibonacci number at the specified position.
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
 * Calculates the Fibonacci number at position num using a while loop.
 * @param {number} num - The position in the Fibonacci sequence.
 * @returns {number} The Fibonacci number at the specified position.
 */
function fibonacciLoopWhile (num) {
  let current = 1
  let previous = 0
  while (--num) {
    const tmp = current
    current += previous
    previous = tmp
  }
  return current
}

/**
 * Calculates the Fibonacci number at position num using recursion.
 * @param {number} num - The position in the Fibonacci sequence.
 * @returns {number} The Fibonacci number at the specified position.
 */
function fibonacciRecursion (num) {
  if (num <= 1) return num
  return fibonacciRecursion(num - 1) + fibonacciRecursion(num - 2)
}

/**
 * Calculates the Fibonacci number at position num using recursion with memoization.
 * @param {number} num - The position in the Fibonacci sequence.
 * @param {{[key: number]: number}} [memo] - The memoization object to cache results.
 * @returns {number} The Fibonacci number at the specified position.
 */
function fibonacciRecursionMemoization (num, memo) {
  memo = memo || {}

  if (memo[num]) return memo[num]
  if (num <= 1) return num

  return (memo[num] =
    fibonacciRecursionMemoization(num - 1, memo) +
    fibonacciRecursionMemoization(num - 2, memo))
}

const bench = new Bench({
  name: `Fibonacci number ${number}`,
  time: 100,
})

bench
  .add('fibonacciLoop', () => {
    fibonacciLoop(number)
  })
  .add('fibonacciLoopWhile', () => {
    fibonacciLoopWhile(number)
  })
  .add('fibonacciRecursion', () => {
    fibonacciRecursion(number)
  })
  .add('fibonacciRecursionMemoization', () => {
    fibonacciRecursionMemoization(number)
  })

await bench.run()

console.table(bench.table())
