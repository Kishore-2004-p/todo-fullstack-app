import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  // ADD
  const handleAdd = async () => {
    if (!title.trim()) return;

    const newTodo = {
      title,
      description,
      completed: false
    };

    const res = await createTodo(newTodo);

    setTodos((prev) => [...prev, res.data]);
    setTitle("");
    setDescription("");
  };

  // DELETE
  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (todo) => {
    const updated = { ...todo, completed: !todo.completed };

    await updateTodo(todo.id, updated);

    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? updated : t))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo App</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleComplete(todo)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {todo.title} — {todo.description}
            </span>

            <button onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
