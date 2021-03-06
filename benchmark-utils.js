const crypto = require('crypto')

/**
 * Generate a cryptographically secure random number in the [0,1[ range
 *
 * @returns
 */
function secureRandom () {
  return crypto.randomBytes(4).readUInt32LE() / 0x100000000
}

/**
 * @param max
 * @param min
 */
function generateRandomInteger (max, min = 0) {
  if (max < 0) {
    throw new RangeError('Invalid interval')
  }
  max = Math.floor(max)
  if (min) {
    if (max < min || min < 0) {
      throw new RangeError('Invalid interval')
    }
    min = Math.ceil(min)
    return Math.floor(secureRandom() * (max - min + 1)) + min
  }
  return Math.floor(secureRandom() * (max + 1))
}

/**
 * @param ms
 */
async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const LIST_FORMATTER = new Intl.ListFormat('en-US', {
  style: 'long',
  type: 'conjunction'
})

module.exports = { generateRandomInteger, sleep, secureRandom, LIST_FORMATTER }
