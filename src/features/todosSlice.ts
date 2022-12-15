import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { addTodo, editTodo, removeTodo } from "../api/api";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState();

export const addAsync = createAsyncThunk(
  "todos/handleAdd",
  async (text: string) => await addTodo(text)
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
    builder.addCase(addAsync.fulfilled, (state, action) => {
      todosAdapter.addOne(state, action.payload);
    });
  },
});

export const { handleCheck, handleDelete } = counterSlice.actions;

export const { selectIds: selectTodoIds, selectById: selectTodoById } =
  todosAdapter.getSelectors((state: RootState) => state.todos);

export default counterSlice.reducer;
