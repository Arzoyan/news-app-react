const memoize = <T extends (...args: any[]) => any>(fn: T) => {
  const cache: { [key: string]: ReturnType<T> } = {};

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

const getNextFibonacci = (num: number): number => {
  let first = 1,
    second = 1;
  for (let i = 3; i <= num; i++) {
    const result = first + second;
    first = second;
    second = result;
  }
  return second;
};

const isPrime = (num: number): boolean => {
  if (num <= 0) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export const memorizedFibonacci = memoize(getNextFibonacci);
export const memorizedIsPrime = memoize(isPrime);
