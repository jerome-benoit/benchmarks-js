import { Bench } from 'tinybench'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject(500)
const keyCount = Object.keys(object).length

const bench = new Bench({
  name: `Object iteration with ${keyCount} keys`,
  time: 100,
})

bench
  .add('for...in', () => {
    let sum = 0
    for (const key in object) {
      sum += object[key]
    }
    return sum
  })
  .add('for...in (hasOwnProperty)', () => {
    let sum = 0
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        sum += object[key]
      }
    }
    return sum
  })
  .add('Object.keys() + for', () => {
    let sum = 0
    const keys = Object.keys(object)
    for (let i = 0; i < keys.length; i++) {
      sum += object[keys[i]]
    }
    return sum
  })
  .add('Object.keys() + forEach', () => {
    let sum = 0
    Object.keys(object).forEach(key => {
      sum += object[key]
    })
    return sum
  })
  .add('Object.values() + for...of', () => {
    let sum = 0
    for (const value of Object.values(object)) {
      sum += value
    }
    return sum
  })
  .add('Object.entries() + for...of', () => {
    let sum = 0
    for (const [, value] of Object.entries(object)) {
      sum += value
    }
    return sum
  })

await bench.run()

console.table(bench.table())
