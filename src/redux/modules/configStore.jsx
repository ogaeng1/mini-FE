import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import user from "./userSlice";
import post from "./postSlice";

const reducer = combineReducers({
  user,
  post
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
