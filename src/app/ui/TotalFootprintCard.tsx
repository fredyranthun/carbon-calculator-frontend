"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useFootprintStore } from "../lib/store";
import { numberWithCommas } from "../lib/number-lib";

export default function TotalFootprintCard() {
  const housingFootprint = useFootprintStore(
    (state) => state.electricityFootprint + state.fuelOilFootprint + state.propaneFootprint + state.naturalGasFootprint
  );

  const transportationFootprint = useFootprintStore((state) => state.tranportationFootprint);

  const totalFootprint = Math.round(housingFootprint + transportationFootprint);

  const data = [
    { id: 0, value: housingFootprint, label: "Housing" },
    { id: 1, value: transportationFootprint, label: "Transportation" },
  ];

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Total Carbon Footprint: {numberWithCommas(totalFootprint)} lb CO<sub>2</sub> / year
        </Typography>
        {totalFootprint > 0 && (
          <PieChart
            series={[
              {
                data,
              },
            ]}
            sx={{ width: "100%" }}
            height={200}
          />
        )}
      </CardContent>
    </Card>
  );
}
