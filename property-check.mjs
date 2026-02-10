import { Bench } from 'tinybench'

import { generateRandomObject } from './benchmark-utils.mjs'

const object = generateRandomObject(500)
const keyCount = Object.keys(object).length
// Pick an existing key
const existingKey = Object.keys(object)[Math.floor(keyCount / 2)]
// Pick a missing key
const missingKey = 'nonexistent_property'

const benchExisting = new Bench({
  name: `Property check (existing key in ${keyCount} keys)`,
  time: 100,
})

benchExisting
  .add('in operator', () => {
    return existingKey in object
  })
  .add('hasOwnProperty()', () => {
    // eslint-disable-next-line no-prototype-builtins
    return object.hasOwnProperty(existingKey)
  })
  .add('Object.hasOwn()', () => {
    return Object.hasOwn(object, existingKey)
  })
  .add('Object.prototype.hasOwnProperty.call()', () => {
    return Object.prototype.hasOwnProperty.call(object, existingKey)
  })
  .add('!== undefined', () => {
    return object[existingKey] !== undefined
  })
  .add('Reflect.has()', () => {
    return Reflect.has(object, existingKey)
  })

await benchExisting.run()

console.table(benchExisting.table())

const benchMissing = new Bench({
  name: `Property check (missing key in ${keyCount} keys)`,
  time: 100,
})

benchMissing
  .add('in operator', () => {
    return missingKey in object
  })
  .add('hasOwnProperty()', () => {
    // eslint-disable-next-line no-prototype-builtins
    return object.hasOwnProperty(missingKey)
  })
  .add('Object.hasOwn()', () => {
    return Object.hasOwn(object, missingKey)
  })
  .add('Object.prototype.hasOwnProperty.call()', () => {
    return Object.prototype.hasOwnProperty.call(object, missingKey)
  })
  .add('!== undefined', () => {
    return object[missingKey] !== undefined
  })
  .add('Reflect.has()', () => {
    return Reflect.has(object, missingKey)
  })

await benchMissing.run()

console.table(benchMissing.table())
