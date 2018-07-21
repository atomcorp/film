export const addToLocalStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const clearFromLocalStorage = (key) => localStorage.removeItem(key);
