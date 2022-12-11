import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

const generateUniqueId = (() => {
  let id = 0;
  return () => id++;
})();

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const initialState: {
  value: Todo[];
} = { value: [] };

export const counterSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    handleCheck: (
      todos,
      action: PayloadAction<{ id: number; checked: boolean }>
    ) => {
      todos.value.find((item) => item.id === action.payload.id)!.completed =
        action.payload.checked;
    },
    handleDelete: (todos, action: PayloadAction<number>) => {
      todos.value = todos.value.filter((item) => item.id !== action.payload);
    },

    handleAdd: (todos, action: PayloadAction<string>) => {
      todos.value.push({
        id: generateUniqueId(),
        text: action.payload,
        completed: false,
      });
    },
  },
});

export const { handleCheck, handleDelete, handleAdd } = counterSlice.actions;

export const selectTodos = (state: RootState) => state.todos.value;

export default counterSlice.reducer;
