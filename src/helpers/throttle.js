/* eslint-disable prefer-rest-params, babel/no-invalid-this */
/**
 * Throttle
 * @param {function} callback - will fire after delay
 * @param {number} delay - milleseconds
 * @return {function}
 */
export function throttle(callback, delay) {
  let isThrottled = false;
  let args;
  let context;
  /** wrapper */
  function wrapper() {
    if (isThrottled) {
      args = arguments;
      context = this;
      return;
    }
    isThrottled = true;
    callback.apply(this, arguments);
    setTimeout(() => {
      isThrottled = false;
      if (args) {
        wrapper.apply(context, args);
        args = context = null;
      }
    }, delay);
  }
  return wrapper;
}
