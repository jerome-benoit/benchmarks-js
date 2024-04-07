import { randomUUID } from 'node:crypto'

import { bench, group, run } from 'tatami-ng'
import { v4 as uuid } from 'uuid'

group('UUIDv4 generator', () => {
  bench('randomUUID', () => {
    randomUUID()
  })
  bench('uuid', () => {
    uuid()
  })
})

await run({
  units: true
})
