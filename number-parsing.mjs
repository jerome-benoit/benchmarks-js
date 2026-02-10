import { Bench } from 'tinybench'

const intString = '12345'
const floatString = '123.456'

const benchInt = new Bench({
  name: 'Integer parsing',
  time: 100,
})

benchInt
  .add('parseInt()', () => {
    return parseInt(intString, 10)
  })
  .add('Number()', () => {
    return Number(intString)
  })
  .add('+ (unary plus)', () => {
    return +intString
  })
  .add('~~ (double bitwise NOT)', () => {
    return ~~intString
  })
  .add('| 0 (bitwise OR)', () => {
    return intString | 0
  })
  .add('>> 0 (bitwise shift)', () => {
    return intString >> 0
  })

await benchInt.run()

console.table(benchInt.table())

const benchFloat = new Bench({
  name: 'Float parsing',
  time: 100,
})

benchFloat
  .add('parseFloat()', () => {
    return parseFloat(floatString)
  })
  .add('Number()', () => {
    return Number(floatString)
  })
  .add('+ (unary plus)', () => {
    return +floatString
  })

await benchFloat.run()

console.table(benchFloat.table())
