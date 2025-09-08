import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "../../../components/TaskList";
import * as api from "../../../api/tasks";
import { Task, Status } from "../../../types/Task";

jest.mock("../../../api/tasks");

describe("TaskList", () => {
  let fetchTasks: jest.Mock;
  let onTaskClick: jest.Mock;

  const tasks: Task[] = [
    { id: 1, title: "Task A", description: "Desc", status: Status.Todo },
  ];

  beforeEach(() => {
    fetchTasks = jest.fn();
    onTaskClick = jest.fn();
    jest.clearAllMocks();
  });

  it("renders all task rows", () => {
    // Arrange & Act
    render(
      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        onTaskClick={onTaskClick}
      />
    );

    // Assert
    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description!)).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
    });
  });

  it("calls onTaskClick when clicking a row", () => {
    // Arrange
    render(
      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        onTaskClick={onTaskClick}
      />
    );
    const taskRow = screen.getByText("Task A");

    // Act
    fireEvent.click(taskRow);

    // Assert
    expect(onTaskClick).toHaveBeenCalledTimes(1);
    expect(onTaskClick).toHaveBeenCalledWith(tasks[0]);
  });

  it("calls fetchTasks after deleting a task", async () => {
    // Arrange
    (api.deleteTask as jest.Mock).mockResolvedValue({});
    render(
      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        onTaskClick={onTaskClick}
      />
    );
    const deleteButton = screen.getByText("Delete");

    // Act
    fireEvent.click(deleteButton);

    // Assert
    await waitFor(() => expect(fetchTasks).toHaveBeenCalledTimes(1));
  });
});
