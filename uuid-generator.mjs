import { randomUUID } from 'node:crypto'
import { Bench } from 'tinybench'
import { v4 as uuid } from 'uuid'

const bench = new Bench({ name: 'UUIDv4 generator', time: 100 })

bench.add('randomUUID', () => {
  randomUUID()
})
bench.add('uuid', () => {
  uuid()
})

await bench.run()
console.table(bench.table())
