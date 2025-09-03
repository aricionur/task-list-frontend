// src/api/tasks.ts
import axios from "axios";
import { Task, CreateTask, UpdateTask } from "../types/Task";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get("/task");
  return response.data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await apiClient.get(`/task/${id}`);
  return response.data;
};

export const createTask = async (task: CreateTask): Promise<Task> => {
  const response = await apiClient.post("/task", task);
  return response.data;
};

export const updateTask = async (
  id: number,
  task: UpdateTask
): Promise<Task> => {
  const response = await apiClient.put(`/task/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`/task/${id}`);
};
