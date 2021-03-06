import {
  UPDATE_SLOTS_REQUEST,
  UPDATE_SLOTS_SUCCESS,
  UPDATE_SLOTS_FAILURE
} from "./slotsActions";

import { SIGNUP_SUCCESS, LOGIN_SUCCESS } from "../auth/authActionTypes";

const initialState = {
  bookedSlots: [],
  ownSlots: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ownSlots: payload.user.slots || [],
        bookedSlots: payload.user.bookedSlots || []
      };
    default:
      return state;
  }
};
