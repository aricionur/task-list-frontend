import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../App";
import * as api from "../../api/tasks";

jest.mock("../../api/tasks");

const mockTasks = [
  { id: 1, title: "Test Task", description: "desc", status: "Todo" },
];

describe("App Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.getTasks as jest.Mock).mockResolvedValue(mockTasks);
  });

  it("renders heading", async () => {
    // Arrange
    render(<App />);

    // Act
    const heading = await screen.findByText(/Task Management/i);

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it("fetches tasks on mount", async () => {
    // Arrange
    render(<App />);

    // Act
    await waitFor(() => expect(api.getTasks).toHaveBeenCalledTimes(1));

    // Assert
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
  });

  it("opens modal when clicking create button", async () => {
    // Arrange
    render(<App />);

    // Act
    const createButton = screen.getByRole("button", {
      name: /Create New Task/i,
    });
    fireEvent.click(createButton);

    // Assert
    // Use a heading role query to target the modal title specifically
    const modalTitle = await screen.findByRole("heading", {
      name: /Create New Task/i,
    });
    expect(modalTitle).toBeInTheDocument();
  });
});
