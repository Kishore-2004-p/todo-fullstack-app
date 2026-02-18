import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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

    const res = await updateTodo(todo.id, updated);

    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? res.data : t))
    );
  };

  // START EDIT
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    const original = todos.find((t) => t.id === id);

    const updated = {
      title: editTitle,
      description: editDescription,
      completed: original.completed
    };

    const res = await updateTodo(id, updated);

    setTodos((prev) =>
      prev.map((t) => (t.id === id ? res.data : t))
    );

    setEditingId(null);
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
          <li key={todo.id} style={{ marginBottom: 10 }}>
            {editingId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  value={editDescription}
                  onChange={(e) =>
                    setEditDescription(e.target.value)
                  }
                />
                <button onClick={() => saveEdit(todo.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <div
                  onClick={() => toggleComplete(todo)}
                  style={{
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    cursor: "pointer"
                  }}
                >
                  <b>{todo.title}</b> — {todo.description}

                  <div style={{ fontSize: 12, color: "gray" }}>
                    Created:{" "}
                    {todo.createdAt
                      ? new Date(
                          todo.createdAt
                        ).toLocaleString()
                      : ""}
                  </div>
                </div>

                <button onClick={() => startEdit(todo)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
