import { styled } from "styled-components";
import { deleteTask, updateTask } from "../api/tasks";
import { Status, Task } from "../types/Task";

interface Props {
  tasks: Task[];
  fetchTasks: () => void;
}

export default function TaskList({ tasks, fetchTasks }: Props) {
  const handleUpdateStatus = async (id: number, status: Status) => {
    await updateTask(id, { status });
    fetchTasks();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <TaskListContainer>
      <h1>Task List</h1>

      {tasks.map((task) => (
        <TaskCard key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due Date: {task.dueDate}</p>
          <Button onClick={() => handleUpdateStatus(task.id, Status.Done)}>
            Mark as Done
          </Button>
          <Button
            onClick={() => handleUpdateStatus(task.id, Status.InProgress)}
          >
            Mark as In Progress
          </Button>
          <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
        </TaskCard>
      ))}
    </TaskListContainer>
  );
}

const TaskListContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

const TaskCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;
