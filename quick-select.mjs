import { randomInt } from 'node:crypto'
import { Bench } from 'tinybench'

/**
 * Generates a random tasks map for benchmarking.
 * @param {number} numberOfWorkers - The number of workers.
 * @param {number} maxNumberOfTasksPerWorker - The maximum number of tasks per worker.
 * @returns {Map} A map with worker IDs as keys and task counts as values.
 */
function generateRandomTasksMap (
  numberOfWorkers,
  maxNumberOfTasksPerWorker = 10
) {
  const tasksArray = []
  for (let i = 0; i < numberOfWorkers; i++) {
    const task = [i, randomInt(maxNumberOfTasksPerWorker)]
    tasksArray.push(task)
  }
  return new Map(tasksArray)
}

const tasksMap = generateRandomTasksMap(60, 20)

/**
 * Selects the task with minimum value using array sort.
 * @param {Map} tasksMap - The map of tasks to search.
 * @returns {Array} The task entry with the minimum value.
 */
function arraySortSelect (tasksMap) {
  const tasksArray = Array.from(tasksMap)
  return tasksArray.sort((a, b) => {
    if (a[1] < b[1]) {
      return -1
    } else if (a[1] > b[1]) {
      return 1
    }
    return 0
  })[0]
}

/**
 * Selects the task with minimum value using a loop.
 * @param {Map} tasksMap - The map of tasks to search.
 * @returns {Array|number} The task entry with the minimum value.
 */
function loopSelect (tasksMap) {
  let minKey
  let minValue = Number.POSITIVE_INFINITY
  for (const [key, value] of tasksMap) {
    if (value === 0) {
      return key
    } else if (value < minValue) {
      minKey = key
      minValue = value
    }
  }
  return [minKey, minValue]
}

const defaultComparator = (a, b) => {
  return a < b
}

const defaultPivotIndexSelect = (leftIndex, rightIndex) => {
  return leftIndex + Math.floor((rightIndex - leftIndex) / 2)
}

const randomPivotIndexSelect = (leftIndex, rightIndex) => {
  return randomInt(leftIndex, rightIndex)
}

/**
 * Partitions an array for quickselect algorithm.
 * @template T
 * @param {Array<T>} array - The array to partition.
 * @param {number} leftIndex - The left index of the partition range.
 * @param {number} rightIndex - The right index of the partition range.
 * @param {number} pivotIndex - The index of the pivot element.
 * @param {(a: T, b: T) => boolean} compare - The comparison function.
 * @returns {number} The final position of the pivot element.
 */
function partition (
  array,
  leftIndex,
  rightIndex,
  pivotIndex,
  compare = defaultComparator
) {
  const pivotValue = array[pivotIndex]
  swap(array, pivotIndex, rightIndex)
  let storeIndex = leftIndex
  for (let i = leftIndex; i < rightIndex; i++) {
    if (compare(array[i], pivotValue)) {
      swap(array, storeIndex, i)
      storeIndex++
    }
  }
  swap(array, rightIndex, storeIndex)
  return storeIndex
}

/**
 * Selects task using quickselect with loop implementation.
 * @param {Map} tasksMap - The map of tasks to search.
 * @returns {Array} The task entry with the minimum value.
 */
function quickSelectLoop (tasksMap) {
  const tasksArray = Array.from(tasksMap)

  return selectLoop(tasksArray, 0, 0, tasksArray.length - 1, (a, b) => {
    return a[1] < b[1]
  })
}

/**
 * Selects task using quickselect with loop and random pivot.
 * @param {Map} tasksMap - The map of tasks to search.
 * @returns {Array} The task entry with the minimum value.
 */
function quickSelectLoopRandomPivot (tasksMap) {
  const tasksArray = Array.from(tasksMap)

  return selectLoop(
    tasksArray,
    0,
    0,
    tasksArray.length - 1,
    (a, b) => {
      return a[1] < b[1]
    },
    randomPivotIndexSelect
  )
}

/**
 * Selects task using quickselect with recursion.
 * @param {Map} tasksMap - The map of tasks to search.
 * @returns {Array} The task entry with the minimum value.
 */
function quickSelectRecursion (tasksMap) {
  const tasksArray = Array.from(tasksMap)

  return selectRecursion(tasksArray, 0, 0, tasksArray.length - 1, (a, b) => {
    return a[1] < b[1]
  })
}

/**
 * Selects task using quickselect with recursion and random pivot.
 * @param {Map} tasksMap - The map of tasks to search.
 * @returns {Array} The task entry with the minimum value.
 */
function quickSelectRecursionRandomPivot (tasksMap) {
  const tasksArray = Array.from(tasksMap)

  return selectRecursion(
    tasksArray,
    0,
    0,
    tasksArray.length - 1,
    (a, b) => {
      return a[1] < b[1]
    },
    randomPivotIndexSelect
  )
}

/**
 * Quickselect algorithm using loop implementation.
 * @template T
 * @param {Array<T>} array - The array to search.
 * @param {number} k - The k-th element to find.
 * @param {number} leftIndex - The left boundary index.
 * @param {number} rightIndex - The right boundary index.
 * @param {(a: T, b: T) => boolean} compare - The comparison function.
 * @param {(leftIndex: number, rightIndex: number) => number} pivotIndexSelect - The pivot selection function.
 * @returns {T} The k-th element.
 */
function selectLoop (
  array,
  k,
  leftIndex,
  rightIndex,
  compare = defaultComparator,
  pivotIndexSelect = defaultPivotIndexSelect
) {
  while (true) {
    if (leftIndex === rightIndex) return array[leftIndex]
    let pivotIndex = pivotIndexSelect(leftIndex, rightIndex)
    pivotIndex = partition(array, leftIndex, rightIndex, pivotIndex, compare)
    if (k === pivotIndex) {
      return array[k]
    } else if (k < pivotIndex) {
      rightIndex = pivotIndex - 1
    } else {
      leftIndex = pivotIndex + 1
    }
  }
}

/**
 * Quickselect algorithm using recursion.
 * @template T
 * @param {Array<T>} array - The array to search.
 * @param {number} k - The k-th element to find.
 * @param {number} leftIndex - The left boundary index.
 * @param {number} rightIndex - The right boundary index.
 * @param {(a: T, b: T) => boolean} compare - The comparison function.
 * @param {(leftIndex: number, rightIndex: number) => number} pivotIndexSelect - The pivot selection function.
 * @returns {T} The k-th element.
 */
function selectRecursion (
  array,
  k,
  leftIndex,
  rightIndex,
  compare = defaultComparator,
  pivotIndexSelect = defaultPivotIndexSelect
) {
  if (leftIndex === rightIndex) return array[leftIndex]
  let pivotIndex = pivotIndexSelect(leftIndex, rightIndex)
  pivotIndex = partition(array, leftIndex, rightIndex, pivotIndex, compare)
  if (k === pivotIndex) {
    return array[k]
  } else if (k < pivotIndex) {
    return selectRecursion(array, k, leftIndex, pivotIndex - 1, compare)
  } else {
    return selectRecursion(array, k, pivotIndex + 1, rightIndex, k, compare)
  }
}

/**
 * Swaps two elements in an array.
 * @param {Array} array - The array containing elements to swap.
 * @param {number} index1 - The index of the first element.
 * @param {number} index2 - The index of the second element.
 * @returns {void}
 */
function swap (array, index1, index2) {
  const tmp = array[index1]
  array[index1] = array[index2]
  array[index2] = tmp
}

const bench = new Bench({ name: 'Quick select', time: 100 })

bench.add('Loop select', () => {
  loopSelect(tasksMap)
})
bench.add('Array sort select', () => {
  arraySortSelect(tasksMap)
})
bench.add('Quick select loop', () => {
  quickSelectLoop(tasksMap)
})
bench.add('Quick select loop with random pivot', () => {
  quickSelectLoopRandomPivot(tasksMap)
})
bench.add('Quick select recursion', () => {
  quickSelectRecursion(tasksMap)
})
bench.add('Quick select recursion with random pivot', () => {
  quickSelectRecursionRandomPivot(tasksMap)
})

await bench.run()
console.table(bench.table())
