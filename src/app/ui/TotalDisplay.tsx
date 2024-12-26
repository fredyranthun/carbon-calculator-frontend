"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useFootprintStore } from "../lib/store";

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TotalDisplay: React.FC = () => {
  const electricityFootprint = useFootprintStore((state) => state.electricityFootprint);
  const fuelOilFootprint = useFootprintStore((state) => state.fuelOilFootprint);
  const propaneFootprint = useFootprintStore((state) => state.propaneFootprint);
  const naturalGasFootprint = useFootprintStore((state) => state.naturalGasFootprint);

  const totalFootprint = Math.round(electricityFootprint + fuelOilFootprint + propaneFootprint + naturalGasFootprint);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Total Carbon Footprint: {numberWithCommas(totalFootprint)} lb CO2 / year
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TotalDisplay;
