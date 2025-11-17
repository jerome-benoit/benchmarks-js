import { bench, group, run } from 'tatami-ng'

import { sleep } from './benchmark-utils.mjs'

const timeout = 2000
const interval = 1000

/**
 * Busy wait implementation using divide and conquer strategy with sleep intervals.
 * @param {number} timeoutMs - The total timeout in milliseconds.
 * @param {number} intervalMs - The interval between checks in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the timeout.
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
 * Dummy busy wait implementation using performance.now() in a tight loop.
 * @param {number} timeoutMs - The timeout in milliseconds.
 * @returns {void}
 */
function dummyTimeoutBusyWait (timeoutMs) {
  const timeoutTimestampMs = performance.now() + timeoutMs
  // eslint-disable-next-line no-empty
  do {} while (performance.now() < timeoutTimestampMs)
}

/**
 * Busy wait implementation using setInterval.
 * @param {number} timeoutMs - The total timeout in milliseconds.
 * @param {number} intervalMs - The interval between checks in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the timeout.
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
 * Busy wait implementation using repeated sleep calls.
 * @param {number} timeoutMs - The total timeout in milliseconds.
 * @param {number} intervalMs - The interval between sleep calls in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the timeout.
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
