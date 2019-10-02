import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import auth from "./auth/authReducer";
import slots from "./slots/slotsReducer";

const rootReducer = combineReducers({
  auth,
  slots
});

const makeStore = (initialState = {}) => {
  const composeEnhancers = composeWithDevTools({ realtime: true, trace: true });
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default makeStore;
