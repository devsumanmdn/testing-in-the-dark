import axios from "axios";

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "./authActionTypes";

const loginRequest = () => ({
  type: LOGIN_REQUEST
});
const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: { user }
});
const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
});

export const login = ({ email, password }) => dispatch => {
  dispatch(loginRequest());
  return axios({
    url: "/api/users/login",
    method: "post",
    data: {
      email,
      password
    }
  })
    .then(({ data }) => {
      dispatch(loginSuccess(data));
    })
    .catch(error => {
      let errorMessage = error.message;
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        errorMessage = error.response.data.error;
      }
      dispatch(loginFailure(errorMessage));
    });
};

const signupRequest = () => ({
  type: SIGNUP_REQUEST
});
const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: { user }
});

const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: { error }
});

export const signup = userData => dispatch => {
  dispatch(signupRequest());
  return axios({
    url: "/api/users",
    method: "post",
    data: userData
  })
    .then(() => {
      dispatch(signupSuccess(userData));
    })
    .catch(error => {
      let errorMessage = error.message;
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        errorMessage = error.response.data.error;
      }
      dispatch(signupFailure(errorMessage));
    });
};

export const logout = () => ({
  type: LOGOUT
});

// const logoutRequest = () => ({
//   type: LOGOUT_REQUEST
// });
// const logoutSuccess = user => ({
//   type: LOGOUT_SUCCESS,
//   payload: { user }
// });

// const logoutFailure = error => ({
//   type: LOGOUT_FAILURE,
//   payload: { error }
// });

// export const logout = userData => dispatch => {
//   dispatch(logoutRequest());
//   return axios({
//     url: '/api/logout',
//     method: 'post',
//     data: userData
//   })
//     .then(() => {
//       dispatch(logoutSuccess(userData));
//     })
//     .catch(error => {
//       let errorMessage = error.message;
//       if (
//         error &&
//         error.response &&
//         error.response.data &&
//         error.response.data.error
//       ) {
//         errorMessage = error.response.data.error;
//       }
//       dispatch(logoutFailure(errorMessage));
//     });
// };
