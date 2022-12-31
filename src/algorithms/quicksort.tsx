export interface QuickSortAnimateTask {
  action: 'compare' | 'swap';
  indexA: number;
  indexB: number;
}

/**
 *
 * @param {number[]} arr
 */
export function quicksort(arr: number[], animationTasks: QuickSortAnimateTask[]) {
  sort(arr, 0, arr.length - 1, animationTasks);
}

/**
 *
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 */
function sort(arr: number[], left: number, right: number, animationTasks: QuickSortAnimateTask[]) {
  if (left >= right) {
    return;
  }

  let pivot = arr[Math.floor((left + right) / 2)];
  let index = partition(arr, left, right, pivot, animationTasks);
  sort(arr, left, index - 1, animationTasks);
  sort(arr, index, right, animationTasks);
}

/**
 * sort the array with the selected pivot and
 * returns the dividing point between the left and right side
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 * @param {*} pivot
 * @returns {number}
 */
function partition(
  arr: number[],
  left: number,
  right: number,
  pivot: number,
  animationTasks: QuickSortAnimateTask[]
) {
  while (left <= right) {
    while (arr[left] < pivot) {
      left++;
    }

    while (arr[right] > pivot) {
      right--;
    }

    if (left <= right) {
      // swap values
      animationTasks.push({ action: 'swap', indexA: left, indexB: right });
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  }
  return left;
}

export function quickSortAnimation(arr: number[]) {
  const complexity = 'Θ(n log(n))';
  const sortName = 'Quick Sort';
  const start = performance.now();
  let animationTasks: QuickSortAnimateTask[] = [];
  let newArr = [...arr];
  quicksort(newArr, animationTasks);
  const end = performance.now();
  const speed = end - start;
  return { animationTasks, speed, complexity, sortName, timestamp: Date().toLocaleString() };
}
