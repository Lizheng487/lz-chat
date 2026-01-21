// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  return function (this: any, ...args: Parameters<T>) {
    const nowTime = Date.now();
    if (nowTime - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = nowTime;
    }
  };
}
// 深拷贝
export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => cloneDeep(item)) as T;
  }
  const clone = Object.assign({}, obj);
  for (const key in clone) {
    if (Object.prototype.hasOwnProperty.call(clone, key)) {
      clone[key] = cloneDeep(clone[key]);
    }
  }
  return clone;
}
export function simpleCloneDeep<T>(obj: T): T {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    console.error("simpleCloneDeep failed:", error);
    return obj;
  }
}
