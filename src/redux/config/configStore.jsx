import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import mainSlice from "../modules/mainSlice";

const reducer = combineReducers({
  main: mainSlice,
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
