import { render, screen, fireEvent } from "@testing-library/react";
import NaturalGasFootprintForm, { NaturalGasFootprintFormProps } from "../src/app/ui/NaturalGasFootprintForm";
import { NaturalGasFootprintData } from "../src/app/lib/natural-gas-footprint-lib";
import userEvent from "@testing-library/user-event";
import { act } from "react";

const initialValues: NaturalGasFootprintData = {
  consumePerMonth: 0,
  unit: "therms",
};

const onSubmit = jest.fn();

const renderComponent = (props: Partial<NaturalGasFootprintFormProps> = {}) => {
  return render(<NaturalGasFootprintForm initialValues={initialValues} onSubmit={onSubmit} {...props} />);
};

describe("NaturalGasFootprintForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with initial values", () => {
    renderComponent();

    expect(screen.getByLabelText(/consumption per month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/unit/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calculate/i })).toBeInTheDocument();
  });

  it("validates the form and shows errors", async () => {
    renderComponent();

    fireEvent.blur(screen.getByLabelText(/consumption per month/i));

    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));
    });

    expect(await screen.findByText(/Natural gas usage must be greater than 0/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits the form with valid data", async () => {
    renderComponent();

    await userEvent.type(screen.getByLabelText(/Consumption per Month/i), "100");
    await act(async () => {
      fireEvent.mouseDown(screen.getByTestId("unit"));
      fireEvent.click(screen.getByText(/therms/i));
      fireEvent.submit(screen.getByRole("button", { name: /calculate/i }));
    });

    expect(onSubmit).toHaveBeenCalledWith({ consumePerMonth: 100, unit: "therms" });
  });
});
