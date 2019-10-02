import axios from "axios";

export const UPDATE_SLOTS_REQUEST = "UPDATE_SLOTS_REQUEST";
export const UPDATE_SLOTS_SUCCESS = "UPDATE_SLOTS_SUCCESS";
export const UPDATE_SLOTS_FAILURE = "UPDATE_SLOTS_FAILURE";

const updateSlotsRequest = () => ({
  type: UPDATE_SLOTS_REQUEST
});

const updateSlotsSuccess = () => ({
  type: UPDATE_SLOTS_SUCCESS
});

const updateSlotsFailure = error => ({
  type: UPDATE_SLOTS_FAILURE,
  payload: { error }
});

export const updateSlots = slots => (dispatch, getState) => {
  const { _id: userId } = getState().auth.user;
  dispatch(updateSlotsRequest());
  axios({
    url: `/api/users/${userId}/slots`,
    method: "post",
    data: { slots }
  })
    .then(() => {
      dispatch(updateSlotsSuccess());
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
      dispatch(updateSlotsFailure(errorMessage));
    });
};
