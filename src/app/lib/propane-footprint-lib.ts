import * as yup from "yup";

export const propaneFootprintSchema = yup.object().shape({
  gallonsPerMonth: yup.number().positive("Propane usage must be greater than 0").required("Propane usage is required"),
});

export interface PropaneFootprintData {
  gallonsPerMonth: number;
}

export const initialPropaneFootprintData: PropaneFootprintData = {
  gallonsPerMonth: 0,
};

export async function calculatePropaneFootprint(data: PropaneFootprintData): Promise<number> {
  try {
    await propaneFootprintSchema.validate(data, { abortEarly: false });
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/propane-footprint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to calculate propane footprint");
    }
    const result = await response.json();
    return result.propaneFootprint;
  } catch (errors) {
    console.error(errors);
    throw errors;
  }
}
