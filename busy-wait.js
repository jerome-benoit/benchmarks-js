const Benchmark = require('benny')
const { sleep } = require('./benchmark-utils')

const timeout = 2000
const interval = 1000

/**
 * @param timeoutMs
 */
function dummyTimeoutBusyWait (timeoutMs) {
  const timeoutTimestampMs = performance.now() + timeoutMs
  // eslint-disable-next-line no-empty
  do {} while (performance.now() < timeoutTimestampMs)
}

/**
 * @param timeoutMs
 * @param intervalMs
 */
async function sleepTimeoutBusyWait (timeoutMs, intervalMs = interval) {
  const timeoutTimestampMs = performance.now() + timeoutMs
  do {
    await sleep(intervalMs)
  } while (performance.now() < timeoutTimestampMs)
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
async function setIntervalTimeoutBusyWait (timeoutMs, intervalMs = interval) {
  return new Promise(resolve => {
    const tries = Math.round(timeoutMs / intervalMs)
    let count = 0
    const triesSetInterval = setInterval(() => {
      count++
      if (count === tries) {
        clearInterval(triesSetInterval)
        return resolve()
      }
    }, intervalMs)
  })
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
  Benchmark.add('setIntervalTimeoutBusyWait', async () => {
    await setIntervalTimeoutBusyWait(timeout)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({ file: 'busy-wait', format: 'json', details: true }),
  Benchmark.save({ file: 'busy-wait', format: 'chart.html', details: true }),
  Benchmark.save({ file: 'busy-wait', format: 'table.html', details: true })
)
