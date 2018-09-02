const tryAction = (action) => ({
  ATTEMPT: `${action}_ATTEMPT`,
  SUCCESS: `${action}_SUCCESS`,
  FAIL: `${action}_FAIL`,
});

export default tryAction;
