import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { addTodo as addTodoApi } from "../api/api";

function* addTodo(action: PayloadAction<string>): any {
  try {
    const todo = yield call(addTodoApi, action.payload);
    yield put({ type: "todos/handleAddSucceeded", payload: todo });
  } catch (e: any) {
    yield put({ type: "todos/handleAddFailed", message: e.message });
  }
}

export default function* mySaga() {
  yield takeEvery("todos/handleAdd", addTodo);
}
