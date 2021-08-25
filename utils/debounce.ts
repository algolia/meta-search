export function debounce<TParams>(
  fn: (...params: TParams[]) => void,
  time: number
) {
  let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

  return function (...params: TParams[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => fn(...params), time);
  };
}
