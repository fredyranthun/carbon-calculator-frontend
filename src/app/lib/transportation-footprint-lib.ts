import * as yup from "yup";

export const transportationFootprintSchema = yup.object().shape({
  cars: yup.array().of(
    yup.object().shape({
      milesPerYear: yup.number().required("Miles per year is required").positive("Must be a positive number"),
      milesPerGallon: yup.number().required("Miles per gallon is required").positive("Must be a positive number"),
      maintenance: yup.boolean(),
    })
  ),
});

export interface Car {
  milesPerYear: number;
  milesPerGallon: number;
  maintenance: boolean;
}

export interface TransportationFootprintData {
  cars: Car[];
}

export async function calculateTransportationFootprint(data: TransportationFootprintData): Promise<number> {
  try {
    await transportationFootprintSchema.validate(data, { abortEarly: false });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transportation-footprint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to calculate transportation footprint");
    }
    const result = await response.json();
    return result.transportationFootprint;
  } catch (errors) {
    console.error(errors);
    throw errors;
  }
}
