import { create } from "zustand";
import {
  ElectricityFootprintData,
  calculateElectricityFootprint,
  initialElectricityFootprintData,
} from "./electricity-footprint-lib";
import {
  NaturalGasFootprintData,
  calculateNaturalGasFootprint,
  initialNaturalGasFootprintData,
} from "./natural-gas-footprint-lib";
import { FuelOilFootprintData, calculateFuelOilFootprint, initialFuelOilFootprintData } from "./fuel-oil-footprint-lib";
import { PropaneFootprintData, calculatePropaneFootprint, initialPropaneFootprintData } from "./propane-footprint-lib";
import {
  calculateTransportationFootprint,
  initialTransportationFootprintData,
  TransportationFootprintData,
} from "./transportation-footprint-lib";

interface FootprintState {
  electricityFootprint: number;
  fuelOilFootprint: number;
  propaneFootprint: number;
  naturalGasFootprint: number;
  tranportationFootprint: number;
  electricityFootprintData: ElectricityFootprintData;
  fuelOilFootprintData: FuelOilFootprintData;
  propaneFootprintData: PropaneFootprintData;
  naturalGasFootprintData: NaturalGasFootprintData;
  transportationFootprintData: TransportationFootprintData;
  updateElectricityFootprint: (data: ElectricityFootprintData) => void;
  updateFuelOilFootprint: (data: FuelOilFootprintData) => void;
  updatePropaneFootprint: (data: PropaneFootprintData) => void;
  updateNaturalGasFootprint: (data: NaturalGasFootprintData) => void;
  updateTransportationFootprint: (data: TransportationFootprintData) => void;
}

const initialState = {
  electricityFootprint: 0,
  fuelOilFootprint: 0,
  propaneFootprint: 0,
  naturalGasFootprint: 0,
  tranportationFootprint: 0,
  electricityFootprintData: initialElectricityFootprintData,
  fuelOilFootprintData: initialFuelOilFootprintData,
  propaneFootprintData: initialPropaneFootprintData,
  naturalGasFootprintData: initialNaturalGasFootprintData,
  transportationFootprintData: initialTransportationFootprintData,
};

export const useFootprintStore = create<FootprintState>((set) => ({
  ...initialState,
  updateElectricityFootprint: async (data) => {
    const result = await calculateElectricityFootprint(data);
    set({ electricityFootprint: result });
    set({ electricityFootprintData: data });
  },
  updateFuelOilFootprint: async (data) => {
    const result = await calculateFuelOilFootprint(data);
    set({ fuelOilFootprint: result });
    set({ fuelOilFootprintData: data });
  },
  updatePropaneFootprint: async (data) => {
    const result = await calculatePropaneFootprint(data);
    set({ propaneFootprint: result });
    set({ propaneFootprintData: data });
  },
  updateNaturalGasFootprint: async (data) => {
    const result = await calculateNaturalGasFootprint(data);
    set({ naturalGasFootprint: result });
    set({ naturalGasFootprintData: data });
  },
  updateTransportationFootprint: async (data) => {
    const result = await calculateTransportationFootprint(data);
    set({ tranportationFootprint: result });
    set({ transportationFootprintData: data });
  },
  reset: () => set(initialState),
}));
