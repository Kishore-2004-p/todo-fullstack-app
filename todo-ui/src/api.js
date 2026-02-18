import axios from "axios";

const API = "https://todo-fullstack-app-15nq.onrender.com/api/todos";

export const getTodos = () => axios.get(API);
export const createTodo = (todo) => axios.post(API, todo);
export const updateTodo = (id, todo) => axios.put(`${API}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${API}/${id}`);
