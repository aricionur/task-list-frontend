import React, { useState } from "react";
import styled from "styled-components";
import { createTask } from "../api/tasks";
import { CreateTask, Status, UpdateTask } from "../types/Task";

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

const defaultTask: CreateTask = {
  title: "",
  description: "",
  dueDate: "",
  status: Status.Todo,
};

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [task, setTask] = useState<CreateTask>(defaultTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createTask(task);

      // Clear form fields after successful creation
      setTask(defaultTask);

      // Notify parent component to refresh task list
      onTaskCreated();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const updateTask = (data: UpdateTask) => {
    setTask((task) => ({ ...task, ...data }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <FormField>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={task.title}
          onChange={(e) => updateTask({ title: e.target.value })}
          required
        />
      </FormField>
      <FormField>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={task.description}
          onChange={(e) => updateTask({ description: e.target.value })}
        />
      </FormField>
      <FormField>
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={task.dueDate}
          onChange={(e) => updateTask({ dueDate: e.target.value })}
        />
      </FormField>
      <FormField>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={task.status}
          onChange={(e) => updateTask({ status: e.target.value as Status })}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
        </select>
      </FormField>
      <SubmitButton type="submit">Add Task</SubmitButton>
    </FormContainer>
  );
};

export default TaskForm;
