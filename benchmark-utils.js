/**
 * @param max
 * @param min
 */
function generateRandomInteger (max, min = 0) {
  if (min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  return Math.floor(Math.random() * max + 1)
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

module.exports = { generateRandomInteger, sleep, LIST_FORMATTER }
