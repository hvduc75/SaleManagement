import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from './types';

export const UserLoginRequest = () => {
    return {
      type: USER_LOGIN_REQUEST,
    };
  };
  
  export const UserLoginSuccess = (data) => {
    return {
      type: USER_LOGIN_SUCCESS,
      payload: data,
    };
  };
  
  export const UserLoginError = () => {
    return {
      type: USER_LOGIN_ERROR,
    };
  };

// export const doLogout = (data) => {
//     return {
//         type: USER_LOGOUT_SUCCESS,
//         payload: data,
//     };
// };
