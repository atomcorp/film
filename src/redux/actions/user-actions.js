// import {database} from '../../firebase/firebase';

// export const INIT_USER = {
//   ATTEMPT: 'INIT_USER_ATTEMPT',
//   SUCCESS: 'INIT_USER_SUCCESS',
//   FAIL: 'INIT_USER_FAIL',
// };

// const initUserAttempt = () => ({
//   type: INIT_USER.ATTEMPT,
// });

// const initUserSuccess = ({id, email, name}) => ({
//   type: INIT_USER.SUCCESS,
//   id,
//   email,
//   name,
// });

// const initUserFail = ({message}) => ({
//   type: INIT_USER.FAIL,
//   message,
// });

// export const initUser = ({id, name, email}) => {
//   return (dispatch, getState) => {
//     dispatch(initUserAttempt());
//     database
//       .ref(`users/${id}`)
//       .set({
//         id,
//         name,
//         email,
//       })
//       .then(() => {
//         dispatch(initUserSuccess({id, name, email}));
//       })
//       .catch((error) => {
//         dispatch(initUserFail({message: error.message}));
//       });
//   };
// };
