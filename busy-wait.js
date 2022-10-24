const Benchmark = require('benny')
const { sleep } = require('./benchmark-utils')

const timeout = 2000
const interval = 1000

/**
 * @param timeoutMs
 */
function dummyTimeoutBusyWait (timeoutMs) {
  const timeoutTimestampMs = Date.now() + timeoutMs
  // eslint-disable-next-line no-empty
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

Benchmark.suite(
  'Busy wait',
  Benchmark.add('dummyTimeoutBusyWait', () => {
    dummyTimeoutBusyWait(timeout)
  }),
  Benchmark.add('sleepTimeoutBusyWait', async () => {
    await sleepTimeoutBusyWait(timeout)
  }),
  Benchmark.add('divideAndConquerTimeoutBusyWait', async () => {
    await divideAndConquerTimeoutBusyWait(timeout)
  }),
  Benchmark.add('setIntervalTimeoutBusyWait', () => {
    setIntervalTimeoutBusyWait(timeout)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({ file: 'busy-wait', format: 'json', details: true }),
  Benchmark.save({ file: 'busy-wait', format: 'chart.html', details: true }),
  Benchmark.save({ file: 'busy-wait', format: 'table.html', details: true })
)
