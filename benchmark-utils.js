function generateRandomInteger (max, min = 0) {
  if (min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  return Math.floor(Math.random() * max + 1)
}

const LIST_FORMATTER = new Intl.ListFormat('en-US', {
  style: 'long',
  type: 'conjunction'
})

module.exports = { generateRandomInteger, LIST_FORMATTER }
