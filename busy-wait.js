const Benchmark = require('benchmark')
const { LIST_FORMATTER, sleep } = require('./benchmark-utils')

const suite = new Benchmark.Suite()

const timeout = 2000
const interval = 1000

/**
 * @param timeoutMs
 */
function dummyTimeoutBusyWait (timeoutMs) {
  const timeoutTimestampMs = Date.now() + timeoutMs
  do {} while (Date.now() < timeoutTimestampMs)
}

/**
 * @param timeoutMs
 */
async function sleepTimeoutBusyWait (timeoutMs) {
  const timeoutTimestampMs = Date.now() + timeoutMs
  do {
    await sleep(interval)
  } while (Date.now() < timeoutTimestampMs)
}

/**
 * @param timeoutMs
 * @param intervalMs
 */
async function divideAndConquerTimeoutBusyWait (
  timeoutMs,
  intervalMs = interval
) {
  const tries = Math.round(timeoutMs / intervalMs)
  let count = 0
  do {
    count++
    await sleep(intervalMs)
  } while (count <= tries)
}

/**
 * @param timeoutMs
 * @param intervalMs
 */
function setIntervalTimeoutBusyWait (timeoutMs, intervalMs = interval) {
  const tries = Math.round(timeoutMs / intervalMs)
  let count = 0
  const triesSetInterval = setInterval(() => {
    count++
    if (count === tries) {
      clearInterval(triesSetInterval)
    }
  }, intervalMs)
}

suite
  .add('dummyTimeoutBusyWait', function () {
    dummyTimeoutBusyWait(timeout)
  })
  .add('sleepTimeoutBusyWait', async function () {
    sleepTimeoutBusyWait(timeout)
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
