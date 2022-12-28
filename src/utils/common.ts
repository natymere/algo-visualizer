export function debounce<T extends Function>(cb: T, wait = 20) {
  let h = 0;
  return function (...args: any) {
    window.clearTimeout(h);
    h = window.setTimeout(() => cb(...args), wait);
  };
}
