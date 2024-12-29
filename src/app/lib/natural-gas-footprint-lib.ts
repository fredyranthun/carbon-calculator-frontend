import * as yup from "yup";

export const naturalGasFootprintSchema = yup.object().shape({
  consumePerMonth: yup
    .number()
    .positive("Natural gas usage must be greater than 0")
    .required("Natural gas usage is required"),
  unit: yup
    .string()
    .required("Unit is required")
    .matches(/therms|ccf/, "Unit must be either 'therms' or 'ccf'"),
});

export interface NaturalGasFootprintData {
  consumePerMonth: number;
  unit: string;
}

export const initialNaturalGasFootprintData: NaturalGasFootprintData = {
  consumePerMonth: 0,
  unit: "",
};

export async function calculateNaturalGasFootprint(data: NaturalGasFootprintData): Promise<number> {
  try {
    await naturalGasFootprintSchema.validate(data, { abortEarly: false });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/natural-gas-footprint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to calculate natural gas footprint");
    }
    const result = await response.json();
    return result.naturalGasFootprint;
  } catch (errors) {
    console.error(errors);
    throw errors;
  }
}
