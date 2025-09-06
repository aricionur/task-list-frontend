import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import { useEffect, useState } from "react";

import TaskList from "./components/TaskList";
import { getTasks } from "./api/tasks";
import { Task } from "./types/Task";
import TaskModal from "./components/TaskModal";
import { Button } from "./components/common/Buttons";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    fetchTasks();
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <h1>Task Management</h1>

        <Button onClick={openCreateModal} isAnimated>
          Create New Task
        </Button>

        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          onTaskClick={openUpdateModal}
        />

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          task={selectedTask}
          onSuccess={fetchTasks}
        />
      </AppContainer>
    </>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;
