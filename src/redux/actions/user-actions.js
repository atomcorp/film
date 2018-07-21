const INIT_USER = {
  ATTEMPT: 'INIT_USER_ATTEMPT',
  SUCCESS: 'INIT_USER_SUCCESS',
  FAIL: 'INIT_USER_FAIL',
};

const initUserAttempt = ({id, name}) => (
  type: INIT_USER.ATTEMPT,
  id,
  name,
);

