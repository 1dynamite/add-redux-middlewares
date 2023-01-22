import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  createAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState();

const addTodoSucceeded = createAction<PayloadAction<Todo>>(
  "todos/handleAddSucceeded"
);

export const counterSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    handleCheck: (
      state,
      action: PayloadAction<{ id: string; checked: boolean }>
    ) => {
      state.entities[action.payload.id]!.completed = action.payload.checked;
    },

    handleDelete: (state, action: PayloadAction<string>) => {
      todosAdapter.removeOne(state, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addTodoSucceeded, (state, action) => {
      todosAdapter.addOne(state, action.payload);
    });
  },
});

export const { handleCheck, handleDelete } = counterSlice.actions;

export const { selectIds: selectTodoIds, selectById: selectTodoById } =
  todosAdapter.getSelectors((state: RootState) => state.todos);

export default counterSlice.reducer;
