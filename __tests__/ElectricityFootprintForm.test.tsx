import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ElectricityFootprintForm, { ElectricityFootprintFormProps } from "../src/app/ui/ElectricityFootprintForm";
import { ElectricityFootprintData } from "../src/app/lib/electricity-footprint-lib";

const initialValues: ElectricityFootprintData = {
  zipCode: "",
  kwhPerMonth: 0,
  greenPowerFraction: 0,
};

const mockOnSubmit = jest.fn();

const renderComponent = (props: Partial<ElectricityFootprintFormProps> = {}) => {
  return render(<ElectricityFootprintForm initialValues={initialValues} onSubmit={mockOnSubmit} {...props} />);
};

describe("ElectricityFootprintForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields correctly", () => {
    renderComponent();

    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Electricity Usage \(kWh\) per month/i)).toBeInTheDocument();
    expect(screen.getByText(/Percentage of Green energy usage/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Calculate/i })).toBeInTheDocument();
  });

  it("validates the form fields and shows errors", async () => {
    renderComponent();

    await act(async () => {
      fireEvent.blur(screen.getByLabelText(/Zip Code/i));
      fireEvent.blur(screen.getByLabelText(/Electricity Usage \(kWh\) per month/i));
    });

    expect(await screen.findByText(/Zip Code is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Electricity usage must be greater than 0/i)).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    renderComponent();

    await userEvent.type(screen.getByLabelText(/Zip Code/i), "12345");
    await userEvent.type(screen.getByLabelText(/Electricity Usage \(kWh\) per month/i), "100");

    await act(async () => {
      fireEvent.change(screen.getByRole("slider"), { target: { value: 50 } });
      fireEvent.submit(screen.getByRole("button", { name: /Calculate/i }));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      zipCode: "12345",
      kwhPerMonth: 100,
      greenPowerFraction: 50,
    });
  });

  it("displays error messages when submission fails", async () => {
    const mockOnSubmitWithError = jest.fn().mockRejectedValue({
      inner: [
        { path: "zipCode", message: "Invalid Zip Code" },
        { path: "kwhPerMonth", message: "Invalid kWh value" },
      ],
    });

    renderComponent({ onSubmit: mockOnSubmitWithError });

    await userEvent.type(screen.getByLabelText(/Zip Code/i), "12345");
    await userEvent.type(screen.getByLabelText(/Electricity Usage \(kWh\) per month/i), "100");

    await act(async () => {
      fireEvent.change(screen.getByRole("slider"), { target: { value: 50 } });
      fireEvent.submit(screen.getByRole("button", { name: /Calculate/i }));
    });

    expect(await screen.findByText(/Invalid Zip Code/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid kWh value/i)).toBeInTheDocument();
  });
});
