import { Bench } from 'tinybench'

const bench = new Bench({
  name: 'Is undefined',
  time: 100,
})

bench
  .add('=== undefined', (value = undefined) => {
    return value === undefined
  })
  .add("typeof === 'undefined'", (value = undefined) => {
    return typeof value === 'undefined'
  })
  .add('=== void 0', (value = undefined) => {
    // eslint-disable-next-line no-void
    return value === void 0
  })
  .add('Object.is(value, undefined)', (value = undefined) => {
    return Object.is(value, undefined)
  })

await bench.run()

console.table(bench.table())
