const Benchmark = require('benchmark')
const { LIST_FORMATTER, sleep } = require('./benchmark-utils')

const suite = new Benchmark.Suite()

const timeout = 2000

/**
 * @param timeoutMs
 */
function dummyTimeoutBusyWait (timeoutMs) {
  const timeoutTimestampMs = Date.now() + timeoutMs
  do {} while (Date.now() < timeoutTimestampMs)
}

/**
 * @param timeoutMs
 * @param delayMs
 */
async function divideAndConquerTimeoutBusyWait (timeoutMs, delayMs = 200) {
  const tries = Math.round(timeoutMs / delayMs)
  let count = 0
  do {
    count++
    await sleep(delayMs)
  } while (count <= tries)
}

/**
 * @param timeoutMs
 * @param delayMs
 */
function setIntervalTimeoutBusyWait (timeoutMs, delayMs = 200) {
  const tries = Math.round(timeoutMs / delayMs)
  let count = 0
  const triesSetInterval = setInterval(() => {
    count++
    if (count === tries) {
      clearInterval(triesSetInterval)
    }
  }, delayMs)
}

suite
  .add('dummyTimeoutBusyWait', function () {
    dummyTimeoutBusyWait(timeout)
  })
  .add('divideAndConquerTimeoutBusyWait', async function () {
    await divideAndConquerTimeoutBusyWait(timeout)
  })
  .add('setIntervalTimeoutBusyWait', function () {
    setIntervalTimeoutBusyWait(timeout)
  })
  .on('cycle', function (event) {
    console.log(event.target.toString())
  })
  .on('complete', function () {
    console.log(
      'Fastest is ' + LIST_FORMATTER.format(this.filter('fastest').map('name'))
    )
    // eslint-disable-next-line no-process-exit
    process.exit()
  })
  .run()
