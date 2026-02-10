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

await bench.run()

console.table(bench.table())
