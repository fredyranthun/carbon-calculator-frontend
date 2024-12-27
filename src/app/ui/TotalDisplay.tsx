"use client";
import Typography from "@mui/material/Typography";
import { useFootprintStore } from "../lib/store";
import { numberWithCommas } from "../lib/number-lib";

const TotalDisplay: React.FC = () => {
  const totalFootprint = useFootprintStore((state) =>
    Math.round(
      state.electricityFootprint +
        state.fuelOilFootprint +
        state.propaneFootprint +
        state.naturalGasFootprint +
        state.tranportationFootprint
    )
  );

  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Total Carbon Footprint: {numberWithCommas(totalFootprint)} lb CO2 / year
    </Typography>
  );
};

export default TotalDisplay;
