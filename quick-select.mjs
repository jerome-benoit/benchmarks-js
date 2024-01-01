import { randomInt } from 'node:crypto'
import Benchmark from 'benny'

/**
 * @param numberOfWorkers
 * @param maxNumberOfTasksPerWorker
 * @returns
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
 * @param tasksMap
 * @returns
 */
function loopSelect (tasksMap) {
  let minKey
  let minValue = Infinity
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

/**
 * @param tasksMap
 * @returns
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
 * @param array
 * @param index1
 * @param index2
 */
function swap (array, index1, index2) {
  const tmp = array[index1]
  array[index1] = array[index2]
  array[index2] = tmp
}

/**
 * @param array
 * @param leftIndex
 * @param rightIndex
 * @param pivotIndex
 * @param compare
 * @returns
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
 * @param array
 * @param k
 * @param leftIndex
 * @param rightIndex
 * @param compare
 * @param pivotIndexSelect
 * @returns
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
 * @param array
 * @param k
 * @param leftIndex
 * @param rightIndex
 * @param compare
 * @param pivotIndexSelect
 * @returns
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
 * @param tasksMap
 * @returns
 */
function quickSelectLoop (tasksMap) {
  const tasksArray = Array.from(tasksMap)

  return selectLoop(tasksArray, 0, 0, tasksArray.length - 1, (a, b) => {
    return a[1] < b[1]
  })
}

/**
 * @param tasksMap
 * @returns
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
 * @param tasksMap
 * @returns
 */
function quickSelectRecursion (tasksMap) {
  const tasksArray = Array.from(tasksMap)

  return selectRecursion(tasksArray, 0, 0, tasksArray.length - 1, (a, b) => {
    return a[1] < b[1]
  })
}

/**
 * @param tasksMap
 * @returns
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

Benchmark.suite(
  'Quick select',
  Benchmark.add('Loop select', () => {
    loopSelect(tasksMap)
  }),
  Benchmark.add('Array sort select', () => {
    arraySortSelect(tasksMap)
  }),
  Benchmark.add('Quick select loop', () => {
    quickSelectLoop(tasksMap)
  }),
  Benchmark.add('Quick select loop with random pivot', () => {
    quickSelectLoopRandomPivot(tasksMap)
  }),
  Benchmark.add('Quick select recursion', () => {
    quickSelectRecursion(tasksMap)
  }),
  Benchmark.add('Quick select recursion with random pivot', () => {
    quickSelectRecursionRandomPivot(tasksMap)
  }),
  Benchmark.cycle(),
  Benchmark.complete(),
  Benchmark.save({
    file: 'quick-select',
    format: 'json',
    details: true
  }),
  Benchmark.save({
    file: 'quick-select',
    format: 'chart.html',
    details: true
  }),
  Benchmark.save({
    file: 'quick-select',
    format: 'table.html',
    details: true
  })
).catch(console.error)
