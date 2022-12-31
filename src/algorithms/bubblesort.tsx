export interface BubbleSortAnimateTask {
  action: 'compare' | 'swap';
  indexA: number;
  indexB: number;
}

export function bubbleSort(arr: number[], animationTasks: BubbleSortAnimateTask[]) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // compare two adjacent numbers
      animationTasks.push({ action: 'compare', indexA: j, indexB: j + 1 });
      if (arr[j] > arr[j + 1]) {
        // swap values
        animationTasks.push({ action: 'swap', indexA: j, indexB: j + 1 });
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

export function bubbleSortAnimation(arr: number[]) {
  const complexity = 'O(n^2)';
  const sortName = 'Bubble Sort';
  const start = performance.now();
  let animationTasks: BubbleSortAnimateTask[] = [];
  let newArr = [...arr];
  bubbleSort(newArr, animationTasks);
  const end = performance.now();
  const speed = end - start;
  return { animationTasks, speed, complexity, sortName, timestamp: Date().toLocaleString() };
}
