import * as yup from "yup";

export const transportationFootprintSchema = yup.object().shape({
  vehicles: yup.array().of(
    yup.object().shape({
      milesPerYear: yup.number().required("Miles per year is required").positive("Must be a positive number"),
      milesPerGallon: yup.number().required("Miles per gallon is required").positive("Must be a positive number"),
      regularMaintenance: yup.boolean(),
    })
  ),
});

export interface Vehicle {
  milesPerYear: number;
  milesPerGallon: number;
  regularMaintenance: boolean;
}

export interface TransportationFootprintData {
  vehicles: Vehicle[];
}

export const initialTransportationFootprintData: TransportationFootprintData = {
  vehicles: [
    {
      milesPerYear: 0,
      milesPerGallon: 0,
      regularMaintenance: false,
    },
  ],
};

export async function calculateTransportationFootprint(data: TransportationFootprintData): Promise<number> {
  try {
    await transportationFootprintSchema.validate(data, { abortEarly: false });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles-footprint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to calculate transportation footprint");
    }
    const result = await response.json();
    return result.vehicleFootprint;
  } catch (errors) {
    console.error(errors);
    throw errors;
  }
}
