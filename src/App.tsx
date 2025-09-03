import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import TaskForm from "./components/TaskFrom";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import { getTasks } from "./api/tasks";
import { Task } from "./types/Task";

const AppContainer = styled.div`
  h1 {
    color: #333;
    text-align: center;
  }
`;

// for simplicity, I just selected App as parent component.
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <h1>Task Management</h1>
        <TaskForm onTaskCreated={fetchTasks} />
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </AppContainer>
    </>
  );
}

export default App;
