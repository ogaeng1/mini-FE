import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import user from "../modules/userSlice"

const reducer = combineReducers({
  user
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
