export const staggerRequests = (timeToStagger) => {
  let timer;
  const startTimer = (callback) => {
    timer = window.setTimeout(() => {
      callback();
    }, timeToStagger);
  };
  return (callback) => {
    if (timer) {
      timer = window.clearTimeout(timer);
    }
    startTimer(callback);
  };
};
