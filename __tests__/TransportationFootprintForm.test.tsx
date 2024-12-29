import { render, screen, fireEvent } from "@testing-library/react";
import { Formik } from "formik";
import TransportationFootprintForm from "../src/app/ui/TransportationFootprintForm";
import { TransportationFootprintData } from "../src/app/lib/transportation-footprint-lib";
import { act } from "react";

const initialValues: TransportationFootprintData = {
  vehicles: [{ milesPerYear: 12000, milesPerGallon: 25, regularMaintenance: true }],
};

const onSubmit = jest.fn();

describe("TransportationFootprintForm", () => {
  it("renders the form with initial values", () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TransportationFootprintForm initialValues={initialValues} onSubmit={onSubmit} />
      </Formik>
    );

    expect(screen.getByDisplayValue("12000")).toBeInTheDocument();
    expect(screen.getByDisplayValue("25")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("adds a new vehicle when 'Add Vehicle' button is clicked", async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TransportationFootprintForm initialValues={initialValues} onSubmit={onSubmit} />
      </Formik>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Add Vehicle"));
    });

    expect(screen.getAllByLabelText(/Miles per year/i)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Miles per Gallon/i)).toHaveLength(2);
  });

  it("submits the form with correct values", async () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <TransportationFootprintForm initialValues={initialValues} onSubmit={onSubmit} />
      </Formik>
    );
    await act(async () => {
      fireEvent.change(screen.getByDisplayValue("12000"), { target: { value: "15000" } });
      fireEvent.change(screen.getByDisplayValue("25"), { target: { value: "30" } });
      fireEvent.click(screen.getByRole("checkbox"));
      fireEvent.click(screen.getByText("Calculate"));
    });
    expect(onSubmit).toHaveBeenCalledWith({
      vehicles: [{ milesPerYear: 15000, milesPerGallon: 30, regularMaintenance: false }],
    });
  });
});
