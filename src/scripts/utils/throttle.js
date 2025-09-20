export const throttle = (func, delay = 250) => {
  let isThrottled = false;
  let savedArgs = null;
  let savedThis = null;

  return function wrap(...args) {
    if (isThrottled) {
      // eslint-disable-next-line no-unused-expressions
      savedArgs = args,
      savedThis = this;
      return;
    }

    func.apply(this, args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (savedThis) {
        wrap.apply(savedThis, savedArgs);
        savedThis = null;
        savedArgs = null;
      }

    }, delay);
  };
};
