import axios from "axios";
const url = "http://localhost:5000/todo";

export const getTodo = () => axios.get(url);
export const createTodo = (data) => axios.post(url, data);
export const updateTodo = (id, data) => axios.patch(`${url}/${id}`, data);
export const switchTick = (id, data) =>
  axios.patch(`${url}/${id}/switchTick`, data);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);
