import { bench, group, run } from 'mitata'

group('Is undefined', () => {
  bench('=== undefined', (value = undefined) => {
    return value === undefined
  })
  bench("typeof === 'undefined'", (value = undefined) => {
    return typeof value === 'undefined'
  })
})

await run({
  units: true
})
