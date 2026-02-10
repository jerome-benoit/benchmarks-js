import { Bench } from 'tinybench'

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

const bench = new Bench({
  name: 'JSON stringify',
  time: 100,
})

bench.add('JSON.stringify', () => {
  JSON.stringify(sampleObj)
})

await bench.run()

console.table(bench.table())
