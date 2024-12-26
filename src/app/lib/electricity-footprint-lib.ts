import * as yup from "yup";

export const electricityFootprintSchema = yup.object().shape({
  zipCode: yup
    .string()
    .matches(/^\d{5}$/, "Invalid zip code")
    .required("Zip code is required"),
  kwhPerMonth: yup
    .number()
    .min(0, "Electricity usage must be greater than 0")
    .required("Electricity usage is required"),
  greenPowerFraction: yup
    .number()
    .min(0, "Green power fraction must be between 0 and 100")
    .max(100, "Green power fraction must be between 0 and 100")
    .required("Green power fraction is required"),
});

export interface ElectricityFootprintData {
  zipCode: string;
  kwhPerMonth: number;
  greenPowerFraction: number;
}

export async function calculateElectricityFootprint(data: ElectricityFootprintData): Promise<number> {
  try {
    await electricityFootprintSchema.validate(data, { abortEarly: false });
    data.greenPowerFraction = data.greenPowerFraction / 100;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/electricity-footprint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to calculate electricity footprint");
    }
    const result = await response.json();
    return result.electricityFootprint;
  } catch (errors) {
    console.error(errors);
    throw errors;
  }
}
