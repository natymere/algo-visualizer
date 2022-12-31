export interface MergeSortAnimateTask {
  action: 'compare' | 'update';
  index: number;
  val: number;
}

export function mergeSort(
  resultArr: number[],
  start: number,
  end: number,
  tempArr: number[],
  animationTasks: MergeSortAnimateTask[]
) {
  if (start === end) return;
  let mid = Math.floor((start + end) / 2);
  mergeSort(tempArr, start, mid, resultArr, animationTasks);
  mergeSort(tempArr, mid + 1, end, resultArr, animationTasks);
  merge(resultArr, start, mid, end, tempArr, animationTasks);
}

export function merge(
  resultArr: number[],
  start: number,
  mid: number,
  end: number,
  tempArr: number[],
  animationTasks: MergeSortAnimateTask[]
) {
  let i = start;
  let j = mid + 1;
  let p = start;
  while (i <= mid && j <= end) {
    if (tempArr[j] >= tempArr[i]) {
      animationTasks.push({ action: 'update', index: p, val: tempArr[i] });
      resultArr[p] = tempArr[i];
      i++;
    } else {
      animationTasks.push({ action: 'update', index: p, val: tempArr[j] });
      resultArr[p] = tempArr[j];
      j++;
    }
    p++;
  }
  while (i <= mid) {
    animationTasks.push({ action: 'update', index: p, val: tempArr[i] });
    resultArr[p] = tempArr[i];
    i++;
    p++;
  }
  while (j <= end) {
    animationTasks.push({ action: 'update', index: p, val: tempArr[j] });
    resultArr[p] = tempArr[j];
    j++;
    p++;
  }
}

export function mergeSortAnimation(arr: number[]) {
  const complexity = 'Θ(n log(n))';
  const sortName = 'Merge Sort';
  const start = performance.now();
  let animationTasks: MergeSortAnimateTask[] = [];
  let tempArr = [...arr];
  let resultArr = [...arr];
  mergeSort(resultArr, 0, tempArr.length - 1, tempArr, animationTasks);
  const end = performance.now();
  const speed = end - start;
  return { animationTasks, speed, complexity, sortName, timestamp: Date().toLocaleString() };
}
