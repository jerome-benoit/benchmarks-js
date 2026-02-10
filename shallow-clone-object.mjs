import _ from 'lodash'
import { Bench } from 'tinybench'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject()

const bench = new Bench({
  name: `Shallow clone object with ${Object.keys(object).length} keys`,
  time: 100,
})

bench.add('Spread', () => {
  return { ...object }
})
bench.add('Object assign', () => {
  return Object.assign({}, object)
})
bench.add('lodash clone', () => {
  _.clone(object)
})

await bench.run()
console.table(bench.table())
