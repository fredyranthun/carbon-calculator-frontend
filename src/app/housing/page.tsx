"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import ElectricityFootprintForm from "../ui/ElectricityFootprintForm";
import NaturalGasFootprintForm from "../ui/NaturalGasFootprintForm";
import FuelOilFootprintForm from "../ui/FuelOilFootprintForm";
import PropaneFootprintForm from "../ui/PropaneFootprintForm";
import TotalFootprintCard from "../ui/TotalFootprintCard";
import { useFootprintStore } from "../lib/store";

export default function HousingFootprint() {
  const updateElectricityFootprint = useFootprintStore((state) => state.updateElectricityFootprint);
  const electricityFootprintData = useFootprintStore((state) => state.electricityFootprintData);
  const updateNaturalGasFootprint = useFootprintStore((state) => state.updateNaturalGasFootprint);
  const naturalGasFootprintData = useFootprintStore((state) => state.naturalGasFootprintData);
  const updatePropaneFootprint = useFootprintStore((state) => state.updatePropaneFootprint);
  const propaneFootprintData = useFootprintStore((state) => state.propaneFootprintData);
  const updateFuelOilFootprint = useFootprintStore((state) => state.updateFuelOilFootprint);
  const fuelOilFootprintData = useFootprintStore((state) => state.fuelOilFootprintData);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Housing Footprint Calculator
        </Typography>

        <TotalFootprintCard />

        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <ElectricityFootprintForm initialValues={electricityFootprintData} onSubmit={updateElectricityFootprint} />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <NaturalGasFootprintForm initialValues={naturalGasFootprintData} onSubmit={updateNaturalGasFootprint} />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <PropaneFootprintForm initialValues={propaneFootprintData} onSubmit={updatePropaneFootprint} />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
            <FuelOilFootprintForm initialValues={fuelOilFootprintData} onSubmit={updateFuelOilFootprint} />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
