import { bench, group, run } from 'tatami-ng'

const sampleObj = {
  address: {
    city: 'New york',
    state: 'NY',
  },
  age: 29,
  engineer: true,
  expertise: ['html', 'css', 'react'],
  name: 'Sid',
}

group('JSON stringify', () => {
  bench('JSON.stringify', () => {
    JSON.stringify(sampleObj)
  })
})

await run({
  units: true,
})
