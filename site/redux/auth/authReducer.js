import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "./authActionTypes";

const initialState = {
  user: null,
  loggedIn: false,
  loggingIn: false,
  loggingInError: "",
  signingUp: false,
  signingUpError: ""
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        signingUp: true,
        signingUpError: ""
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload.user,
        signingUp: false,
        loggedIn: true
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signingUp: false,
        signingUpError: payload.error
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loggingInError: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loggingIn: false,
        loggedIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggingInError: payload.error
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    default:
      return state;
  }
};
