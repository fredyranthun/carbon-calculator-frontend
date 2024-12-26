import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import ElectricityFootprintForm from "../ui/ElectricityFootprintForm";
import NaturalGasFootprintForm from "../ui/NaturalGasFootprintForm";
import FuelOilFootprintForm from "../ui/FuelOilFootprintForm";
import PropaneFootprintForm from "../ui/PropaneFootprintForm";

const forms = [
  { name: "Electricity", component: ElectricityFootprintForm },
  { name: "Natural Gas", component: NaturalGasFootprintForm },
  { name: "Fuel Oil", component: FuelOilFootprintForm },
  { name: "Propane", component: PropaneFootprintForm },
];

export default function HousingFootprint() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Housing Footprint Calculator
        </Typography>

        <Grid2 container spacing={4}>
          {forms.map((form) => (
            <Grid2 key={form.name} size={{ xs: 12, sm: 6, md: 6 }}>
              <form.component />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
}
