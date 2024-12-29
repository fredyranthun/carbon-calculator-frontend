import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FuelOilFootprintForm, { FuelOilFootprintFormProps } from "../src/app/ui/FuelOilFootprintForm";
import { FuelOilFootprintData } from "../src/app/lib/fuel-oil-footprint-lib";
import userEvent from "@testing-library/user-event";

const mockOnSubmit = jest.fn();

const initialValues: FuelOilFootprintData = {
  gallonsPerMonth: 0,
};

const renderComponent = (props: Partial<FuelOilFootprintFormProps> = {}) => {
  return render(<FuelOilFootprintForm initialValues={initialValues} onSubmit={mockOnSubmit} {...props} />);
};

describe("FuelOilFootprintForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with initial values", () => {
    renderComponent();
    expect(screen.getByLabelText(/Gallons per Month/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Calculate/i })).toBeInTheDocument();
  });

  it("validates and submits the form", async () => {
    renderComponent();

    const input = screen.getByLabelText(/Gallons per Month/i);
    const submitButton = screen.getByRole("button", { name: /Calculate/i });

    await userEvent.type(input, "100");
    await act(async () => {
      fireEvent.blur(input);
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({ gallonsPerMonth: 100 });
  });
});
