import { create } from "zustand";
import { ElectricityFootprintData, calculateElectricityFootprint } from "./electricity-footprint-lib";
import { NaturalGasFootprintData, calculateNaturalGasFootprint } from "./natural-gas-footprint-lib";
import { FuelOilFootprintData, calculateFuelOilFootprint } from "./fuel-oil-footprint-lib";
import { PropaneFootprintData, calculatePropaneFootprint } from "./propane-footprint-lib";

interface FootprintState {
  electricityFootprint: number;
  fuelOilFootprint: number;
  propaneFootprint: number;
  naturalGasFootprint: number;
  updateElectricityFootprint: (data: ElectricityFootprintData) => void;
  updateFuelOilFootprint: (data: FuelOilFootprintData) => void;
  updatePropaneFootprint: (data: PropaneFootprintData) => void;
  updateNaturalGasFootprint: (data: NaturalGasFootprintData) => void;
}

const initialState = {
  electricityFootprint: 0,
  fuelOilFootprint: 0,
  propaneFootprint: 0,
  naturalGasFootprint: 0,
};

export const useFootprintStore = create<FootprintState>((set) => ({
  ...initialState,
  updateElectricityFootprint: async (data) => {
    const result = await calculateElectricityFootprint(data);
    set({ electricityFootprint: result });
  },
  updateFuelOilFootprint: async (data) => {
    const result = await calculateFuelOilFootprint(data);
    set({ fuelOilFootprint: result });
  },
  updatePropaneFootprint: async (data) => {
    const result = await calculatePropaneFootprint(data);
    set({ propaneFootprint: result });
  },
  updateNaturalGasFootprint: async (data) => {
    const result = await calculateNaturalGasFootprint(data);
    set({ naturalGasFootprint: result });
  },
  reset: () => set(initialState),
}));
