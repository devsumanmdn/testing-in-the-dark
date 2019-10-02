import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import auth from "./auth/authReducer";

const rootReducer = combineReducers({
  auth
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
