import "./App.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  handleCheck,
  addAsync,
  handleDelete,
  selectTodoIds,
  selectTodoById,
} from "./features/todosSlice";
import { EntityId } from "@reduxjs/toolkit";

function Input() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") dispatch(addAsync(value));
  };

  return (
    <div className="input-container">
      <input
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

function Example() {
  return <div>hey</div>;
}

function TodoItem(props: { id: EntityId }) {
  const todo = useAppSelector((state) => selectTodoById(state, props.id))!;
  const dispatch = useAppDispatch();

  return (
    <div className="todo-item">
      <input
        className="checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={(e) =>
          dispatch(handleCheck({ id: todo.id, checked: e.target.checked }))
        }
      />
      <span className={todo.completed ? "todo-text-striked" : "todo-text"}>
        {todo.text} <Example />
      </span>
      <div className="delete-icon">
        <img
          alt="delete-icon"
          src="/x.png"
          onClick={() => dispatch(handleDelete(todo.id))}
        />
      </div>
    </div>
  );
}

function App() {
  const todos = useAppSelector(selectTodoIds);

  return (
    <div className="app">
      <header className="header">
        <h1>Todos</h1>
      </header>
      <main>
        <Input />
        <div className="todos">
          {todos.map((item) => (
            <TodoItem key={item} id={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
