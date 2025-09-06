import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import { getTasks } from "./api/tasks";
import { Task } from "./types/Task";
import TaskModal from "./components/TaskModal"; // Your new merged modal component

const AppContainer = styled.div`
  h1 {
    color: #333;
    text-align: center;
  }
`;

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
    setSelectedTask(null); // Set selected task to null for "create" mode
    setIsModalOpen(true);
  };

  const openUpdateModal = (task: Task) => {
    setSelectedTask(task); // Set the task for "update" mode
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null); // Reset the selected task on close
    fetchTasks(); // Refresh tasks after modal is closed
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <h1>Task Management</h1>
        <button onClick={openCreateModal}>Create New Task</button>
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          onTaskClick={openUpdateModal}
        />
        {/* Render the single TaskModal component */}
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
