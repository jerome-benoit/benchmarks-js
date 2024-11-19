import { bench, group, run } from 'tatami-ng'

import { sleep } from './benchmark-utils.mjs'

const timeout = 2000
const interval = 1000

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
async function setIntervalTimeoutBusyWait (timeoutMs, intervalMs = interval) {
  await new Promise(resolve => {
    const tries = Math.round(timeoutMs / intervalMs)
    let count = 0
    const triesSetInterval = setInterval(() => {
      count++
      if (count === tries) {
        clearInterval(triesSetInterval)
        resolve()
      }
    }, intervalMs)
  })
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

group('Busy wait', () => {
  bench('dummyTimeoutBusyWait', () => {
    dummyTimeoutBusyWait(timeout)
  })
  bench('sleepTimeoutBusyWait', async () => {
    await sleepTimeoutBusyWait(timeout)
  })
  bench('divideAndConquerTimeoutBusyWait', async () => {
    await divideAndConquerTimeoutBusyWait(timeout)
  })
  bench('setIntervalTimeoutBusyWait', async () => {
    await setIntervalTimeoutBusyWait(timeout)
  })
})

await run({
  units: true,
})
