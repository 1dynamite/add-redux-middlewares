import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import todosReducer from "../features/todosSlice";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";

// this is the saga middleware
const sagaMiddleware = createSagaMiddleware();

// this is custom logger middleware
const logger: Middleware<{}, RootState> = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

const rootReducer = combineReducers({
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    // add the two middlewares on top of the default middlwares
    getDefaultMiddleware().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
