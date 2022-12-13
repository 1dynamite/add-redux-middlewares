import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
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

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState();

export const addAsync = createAsyncThunk(
  "todos/handleAdd",
  async (text: string) => {
    const text_ = await new Promise<string>((resolve) =>
      setTimeout(() => resolve(text))
    );

    return text_;
  }
);

export const counterSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    handleCheck: (
      state,
      action: PayloadAction<{ id: number; checked: boolean }>
    ) => {
      state.entities[action.payload.id]!.completed = action.payload.checked;
    },

    handleDelete: (state, action: PayloadAction<number>) => {
      todosAdapter.removeOne(state, action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addAsync.fulfilled, (state, action) => {
      todosAdapter.addOne(state, {
        id: generateUniqueId(),
        text: action.payload,
        completed: false,
      });
    });
  },
});

export const { handleCheck, handleDelete } = counterSlice.actions;

export const { selectIds: selectTodoIds, selectById: selectTodoById } =
  todosAdapter.getSelectors((state: RootState) => state.todos);

export default counterSlice.reducer;
