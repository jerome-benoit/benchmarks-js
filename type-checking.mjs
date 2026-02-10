import { Bench } from 'tinybench'

const testValues = {
  array: [1, 2, 3],
  boolean: true,
  null: null,
  number: 42,
  object: { a: 1 },
  string: 'hello',
  undefined,
}

const bench = new Bench({
  name: 'Type checking',
  time: 100,
})

// Test with array (common case for type checking)
const testArray = testValues.array

bench
  .add('typeof', () => {
    return typeof testArray
  })
  .add('instanceof', () => {
    return testArray instanceof Array
  })
  .add('Array.isArray()', () => {
    return Array.isArray(testArray)
  })
  .add('Object.prototype.toString.call()', () => {
    return Object.prototype.toString.call(testArray) === '[object Array]'
  })
  .add('constructor.name', () => {
    return testArray.constructor.name === 'Array'
  })

await bench.run()

console.table(bench.table())
