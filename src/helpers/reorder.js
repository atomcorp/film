/**
 * Reorder array
 * https://stackoverflow.com/a/39271175/2368141
 * @param {array} arr
 * @param {number} from
 * @param {number} to
 * @return {array}
 */
function reorderArray(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

export default reorderArray;
