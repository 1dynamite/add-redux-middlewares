import "./App.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { handleCheck, addAsync, handleDelete } from "./features/todosSlice";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

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

function TodoItem({ data }: { data: Todo }) {
  const dispatch = useAppDispatch();

  return (
    <div className="todo-item">
      <input
        className="checkbox"
        type="checkbox"
        checked={data.completed}
        onChange={(e) =>
          dispatch(handleCheck({ id: data.id, checked: e.target.checked }))
        }
      />
      <span className={data.completed ? "todo-text-striked" : "todo-text"}>
        {data.text}
      </span>
      <div className="delete-icon">
        <img
          alt="delete-icon"
          src="/x.png"
          onClick={() => dispatch(handleDelete(data.id))}
        />
      </div>
    </div>
  );
}

function App() {
  const todos = useAppSelector((state) => state.todos.value);

  return (
    <div className="app">
      <header className="header">
        <h1>Todos</h1>
      </header>
      <main>
        <Input />
        <div className="todos">
          {todos.map((item) => (
            <TodoItem key={item.id} data={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
