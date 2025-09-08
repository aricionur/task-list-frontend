import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("App Smoke Test", () => {
  it("renders without crashing", async () => {
    // Arrange & Act
    render(<App />);

    // Assert
    const heading = await screen.findByText(/Task Management/i);
    expect(heading).toBeInTheDocument();
  });
});
