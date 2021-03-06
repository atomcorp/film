/**
 * Check name is valid
 * @param {string} name
 * @return {object}
 */
export const validateUsername = (name) => {
  if (name === '' || !name) {
    return {
      isValid: false,
      error: 'Please enter Username',
    };
  } else if (name.length < 5 || name.length > 15) {
    return {
      isValid: false,
      error: 'Username must have 5-15 characters',
    };
  }
  return {isValid: true};
};
