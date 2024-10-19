import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";  // Import axios to mock it
import React from "react";
import '@testing-library/jest-dom';
import HomePage from "../pages/HomePage/HomePage";
import expect from "expect";
jest.mock("axios");  // Mock axios to prevent real API calls

describe("HomePage Component", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the initial elements of the HomePage component", () => {
    // Arrange
    render(<HomePage />);

    // Assert - Check if the heading and button are rendered correctly
    expect(screen.getByText("List of heroes:")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  test("shows loading spinner while fetching data", async () => {
    // Arrange
    axios.get.mockResolvedValueOnce({ data: { results: [] } });
    render(<HomePage />);

    // Act
    // Assert the loading spinner is shown when data is being fetched
    await waitFor(() => expect(screen.getByText("Loading...")).toBeInTheDocument());
  });

  test("renders heroes after data fetch", async () => {
    // Arrange - Mock API response
    const heroes = [
      { id: 1, name: "Hero 1" },
      { id: 2, name: "Hero 2" }
    ];
    axios.get.mockResolvedValueOnce({ data: { results: heroes } });

    // Act
    render(<HomePage />);

    // Wait for the heroes to appear in the document
    await waitFor(() => {
      expect(screen.getByText("Hero 1")).toBeInTheDocument();
      expect(screen.getByText("Hero 2")).toBeInTheDocument();
    });

    // Assert
    expect(screen.getAllByText(/Hero/).length).toBe(2);  // Ensure both heroes are rendered
  });

  test("appends more heroes when 'Load More' is clicked", async () => {
    // Arrange
    const firstHeroes = [
      { id: 1, name: "Hero 1" },
      { id: 2, name: "Hero 2" }
    ];
    const newHeroes = [
      { id: 3, name: "Hero 3" },
      { id: 4, name: "Hero 4" }
    ];
    axios.get
        .mockResolvedValueOnce({ data: { results: firstHeroes } })  // First call
        .mockResolvedValueOnce({ data: { results: newHeroes } });  // Second call

    // Act
    render(<HomePage />);
    // Wait for the first set of heroes
    await waitFor(() => {
      expect(screen.getByText("Hero 1")).toBeInTheDocument();
      expect(screen.getByText("Hero 2")).toBeInTheDocument();
    });

    // Click "Load More" button
    fireEvent.click(screen.getByText("Load More"));

    // Wait for the new set of heroes to appear
    await waitFor(() => {
      expect(screen.getByText("Hero 3")).toBeInTheDocument();
      expect(screen.getByText("Hero 4")).toBeInTheDocument();
    });

    // Assert that the total number of heroes rendered is now 4
    expect(screen.getAllByText(/Hero/).length).toBe(4);
  });

  test("does not show 'Load More' button after page 9", async () => {
    // Arrange
    const heroes = [{ id: 1, name: "Hero 1" }];
    axios.get.mockResolvedValueOnce({ data: { results: heroes } });

    // Act
    render(<HomePage />);

    // Click "Load More" 8 times to simulate reaching page 9
    for (let i = 0; i < 8; i++) {
      fireEvent.click(screen.getByText("Load More"));
    }

    // Assert - After reaching page 9, the "Load More" button should not appear
    await waitFor(() => {
      expect(screen.queryByText("Load More")).not.toBeInTheDocument();
    });
  });
});
