"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useFootprintStore } from "../lib/store";
import TotalFootprintCard from "../ui/TotalFootprintCard";
import TransportationFootprintForm from "../ui/TransportationFootprintForm";

export default function TransportationFootprint() {
  const updateTransportationFootprint = useFootprintStore((state) => state.updateTransportationFootprint);
  const transportationFootprintData = useFootprintStore((state) => state.transportationFootprintData);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transport Footprint Calculator
        </Typography>
        <TotalFootprintCard />
        <TransportationFootprintForm
          initialValues={transportationFootprintData}
          onSubmit={updateTransportationFootprint}
        />
      </Box>
    </Container>
  );
}
