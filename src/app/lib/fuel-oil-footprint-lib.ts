import * as yup from "yup";

export const fuelOilFootprintSchema = yup.object().shape({
  gallonsPerMonth: yup.number().min(0, "Fuel oil usage must be greater than 0").required("Fuel oil usage is required"),
});

export interface FuelOilFootprintData {
  gallonsPerMonth: number;
}

export const initialFuelOilFootprintData: FuelOilFootprintData = {
  gallonsPerMonth: 0,
};

export async function calculateFuelOilFootprint(data: FuelOilFootprintData): Promise<number> {
  try {
    await fuelOilFootprintSchema.validate(data, { abortEarly: false });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fuel-oil-footprint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to calculate fuel oil footprint");
    }
    const result = await response.json();
    return result.fuelOilFootprint;
  } catch (errors) {
    console.error(errors);
    throw errors;
  }
}
