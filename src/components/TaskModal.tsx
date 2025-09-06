import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createTask, updateTask } from "../api/tasks";
import { Task, CreateTask, Status } from "../types/Task";

// Helper type for the form data, can be a full task or a new one
type FormData = Task | CreateTask;

// Define props for the TaskModal component
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task: Task | null; // This prop determines if we're creating or updating
}

// Define a default state for a new task
const defaultNewTask: CreateTask = {
  title: "",
  description: "",
  dueDate: "",
  status: Status.Todo,
};

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  task,
}) => {
  // Use state for the form data, initialized with the provided task or a new, empty task
  const [formData, setFormData] = useState<FormData>(task || defaultNewTask);

  // This effect syncs the form data with the 'task' prop whenever it changes.
  // This is crucial for switching between "create" (task is null) and "update" (task is an object).
  useEffect(() => {
    setFormData(task || defaultNewTask);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (task) {
        // If 'task' exists, we are in "update" mode
        await updateTask(task.id, formData);
      } else {
        // If 'task' is null, we are in "create" mode
        await createTask(formData);
      }
      onSuccess(); // Call success handler to refresh the list
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      onClose(); // Close the modal regardless of success or failure
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <FormContainer onSubmit={handleSubmit}>
          <h2>{task ? "Update Task" : "Create New Task"}</h2>
          <FormField>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description || ""} // Use a default empty string for optional fields
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={formData.dueDate || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <label htmlFor="status">Status</label>
            <select id="status" value={formData.status} onChange={handleChange}>
              {Object.values(Status).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </FormField>
          <SubmitButton type="submit">
            {task ? "Save Changes" : "Add Task"}
          </SubmitButton>
        </FormContainer>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default TaskModal;

/** Styles */

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

// Styled components for the form itself, taken from your TaskForm
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
