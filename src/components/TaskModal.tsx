import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createTask, updateTask } from "../api/tasks";
import { Task, CreateTask, Status } from "../types/Task";
import { formatDateForInput } from "../utils/helpers";

type FormData = Task | CreateTask;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task: Task | null;
}

const defaultNewTask: CreateTask = {
  title: "",
  description: "",
  dueDate: new Date(),
  status: Status.Todo,
};

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  task,
}) => {
  const [formData, setFormData] = useState<FormData>(task || defaultNewTask);

  useEffect(() => {
    setFormData(task || defaultNewTask);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (task) await updateTask(task.id, formData);
      else await createTask(formData);

      onSuccess();
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;

    let newValue: string | Date | null = value;

    if (id === "dueDate") newValue = new Date(value);

    setFormData((prevData) => ({
      ...prevData,
      [id]: newValue,
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
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={formatDateForInput(formData.dueDate)}
              onChange={handleChange}
              required
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
  width: 500px;
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
    resize: vertical;
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
