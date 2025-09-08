import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as api from "../../../api/tasks";
import TaskModal from "../../../components/TaskModal";
import { Status } from "../../../types/Task";

// jest.mock("../api/tasks");
jest.mock("../../../api//tasks.ts");

describe("TaskModal", () => {
  let onClose: jest.Mock;
  let onSuccess: jest.Mock;

  beforeEach(() => {
    onClose = jest.fn();
    onSuccess = jest.fn();
    jest.clearAllMocks();
  });

  it("does not render when closed", () => {
    // Arrange
    const props = {
      isOpen: false,
      onClose,
      onSuccess,
      task: null,
    };

    // Act
    render(<TaskModal {...props} />);

    // Assert
    expect(screen.queryByText(/Create New Task/i)).not.toBeInTheDocument();
  });

  it("calls createTask on submit for a new task", async () => {
    // Arrange
    const newTaskTitle = "New Task";
    (api.createTask as jest.Mock).mockResolvedValue({ id: 1 });

    const props = {
      isOpen: true,
      onClose,
      onSuccess,
      task: null,
    };

    render(<TaskModal {...props} />);

    const titleInput = screen.getByLabelText(/Title/i);
    const submitButton = screen.getByText(/Add Task/i);

    // Act
    fireEvent.change(titleInput, { target: { value: newTaskTitle } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() =>
      expect(api.createTask).toHaveBeenCalledWith(
        expect.objectContaining({ title: newTaskTitle })
      )
    );
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("pre-fills the form when task is provided and calls updateTask on submit", async () => {
    // Arrange
    const existingTask = { id: 1, title: "Existing Task", status: Status.Todo };
    (api.updateTask as jest.Mock).mockResolvedValue(existingTask);

    const props = {
      isOpen: true,
      onClose,
      onSuccess,
      task: existingTask,
    };

    render(<TaskModal {...props} />);

    const titleInput = screen.getByLabelText(/Title/i);
    const submitButton = screen.getByText(/Save Changes/i);

    // Act
    fireEvent.change(titleInput, { target: { value: "Updated Task" } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() =>
      expect(api.updateTask).toHaveBeenCalledWith(
        existingTask.id,
        expect.objectContaining({ title: "Updated Task" })
      )
    );
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
