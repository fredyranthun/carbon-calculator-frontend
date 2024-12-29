import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PropaneFootprintForm from "@/app/ui/PropaneFootprintForm";
import { useFootprintStore } from "@/app/lib/store";
import { act } from "react";
import userEvent from "@testing-library/user-event";

// Mock the useFootprintStore hook
jest.mock("@/app/lib/store", () => ({
  useFootprintStore: jest.fn(),
}));

const mockUpdatePropaneFootprint = jest.fn();
const mockPropaneFootprintData = { gallonsPerMonth: 0 };

beforeEach(() => {
  (useFootprintStore as unknown as jest.Mock).mockReturnValue({
    updatePropaneFootprint: mockUpdatePropaneFootprint,
    propaneFootprintData: mockPropaneFootprintData,
  });
});

describe("PropaneFootprintForm", () => {
  it("renders the form with initial values", () => {
    render(<PropaneFootprintForm initialValues={mockPropaneFootprintData} onSubmit={mockUpdatePropaneFootprint} />);

    expect(screen.getByLabelText(/Gallons per Month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gallons per Month/i)).toHaveValue(0);
  });

  it("displays validation error when submitting empty form", async () => {
    render(<PropaneFootprintForm initialValues={mockPropaneFootprintData} onSubmit={mockUpdatePropaneFootprint} />);

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Calculate/i }));
    });

    expect(mockUpdatePropaneFootprint).toHaveBeenCalledTimes(0);
  });

  it("calls updatePropaneFootprint with correct values on form submit", async () => {
    render(<PropaneFootprintForm initialValues={mockPropaneFootprintData} onSubmit={mockUpdatePropaneFootprint} />);

    await userEvent.type(screen.getByLabelText(/Gallons per Month/i), "100");

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Calculate/i }));
    });

    expect(mockUpdatePropaneFootprint).toHaveBeenCalledWith({ gallonsPerMonth: 100 });
  });

  it("displays error message when updatePropaneFootprint fails", async () => {
    mockUpdatePropaneFootprint.mockRejectedValueOnce({
      inner: [{ path: "gallonsPerMonth", message: "Error message" }],
    });

    render(<PropaneFootprintForm initialValues={mockPropaneFootprintData} onSubmit={mockUpdatePropaneFootprint} />);

    await userEvent.type(screen.getByLabelText(/Gallons per Month/i), "100");

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Calculate/i }));
    });

    expect(screen.getByText(/Error message/i)).toBeInTheDocument();
  });
});
