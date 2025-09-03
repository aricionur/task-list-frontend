// src/components/TaskForm.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { createTask } from "../api/tasks";
import { CreateTaskRequest, Status } from "../types/Task";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #eef1f4;
  margin-bottom: 2rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input,
  select,
  textarea {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #218838;
  }
`;

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.Todo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: CreateTaskRequest = {
      title,
      description,
      dueDate,
      status,
    };

    try {
      await createTask(newTask);
      // Clear form fields after successful creation
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus(Status.Todo);
      onTaskCreated(); // Notify parent component to refresh task list
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <FormField>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormField>
      <FormField>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormField>
      <FormField>
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </FormField>
      <FormField>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </FormField>
      <SubmitButton type="submit">Add Task</SubmitButton>
    </FormContainer>
  );
};

export default TaskForm;
