import { bench, group, run } from 'tatami-ng'

const sampleObj = {
  name: 'Sid',
  age: 29,
  engineer: true,
  expertise: ['html', 'css', 'react'],
  address: {
    city: 'New york',
    state: 'NY'
  }
}

group('JSON stringify', () => {
  bench('JSON.stringify', () => {
    JSON.stringify(sampleObj)
  })
})

await run({
  units: true
})
