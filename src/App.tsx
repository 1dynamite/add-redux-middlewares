import "./App.css";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const generateUniqueId = (() => {
  let id = 0;
  return () => id++;
})();

function Input({
  onAddItem: handleAddItem,
}: {
  onAddItem: (text: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      handleAddItem(value);
    }
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

function TodoItem({
  data,
  onCheck,
  onDelete: handleDelete,
}: {
  data: Todo;
  onCheck: (id: number, checked: boolean) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="todo-item">
      <input
        className="checkbox"
        type="checkbox"
        checked={data.completed}
        onChange={(e) => onCheck(data.id, e.target.checked)}
      />
      <span className={data.completed ? "todo-text-striked" : "todo-text"}>
        {data.text}
      </span>
      <div className="delete-icon">
        <img
          alt="delete-icon"
          src="/x.png"
          onClick={() => handleDelete(data.id)}
        />
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleCheck = (id: number, checked: boolean) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, completed: checked } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleAdd = (text: string) => {
    setTodos([...todos, { id: generateUniqueId(), text, completed: false }]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Todos</h1>
      </header>
      <main>
        <Input onAddItem={handleAdd} />
        <div className="todos">
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              data={item}
              onCheck={handleCheck}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
