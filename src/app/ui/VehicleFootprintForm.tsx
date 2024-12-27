/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid2 from "@mui/material/Grid2";
import React from "react";
import { Vehicle } from "../lib/transportation-footprint-lib";

interface Props {
  index: number;
  vehicle: Vehicle;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  touched: any;
  errors: any;
  remove: <X = any>(index: number) => X | undefined;
}

export const VehicleFootprintForm = React.memo(function VehicleFootprintForm({
  index,
  vehicle,
  handleBlur,
  handleChange,
  remove,
  touched,
  errors,
}: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2">
        Vehicle {index + 1}
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 sx={{ xs: 12, sx: 4 }}>
          <TextField
            label="Miles per Year"
            name={`vehicles[${index}].milesPerYear`}
            value={vehicle.milesPerYear}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            error={touched?.milesPerYear && typeof errors === "object" && Boolean(errors?.milesPerYear)}
            helperText={touched?.milesPerYear && typeof errors === "object" && errors?.milesPerYear}
            fullWidth
            margin="normal"
          />
        </Grid2>
        <Grid2 sx={{ xs: 12, sx: 4 }}>
          <TextField
            label="Miles per Gallon"
            name={`vehicles[${index}].milesPerGallon`}
            value={vehicle.milesPerGallon}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            error={touched?.milesPerGallon && typeof errors === "object" && Boolean(errors?.milesPerGallon)}
            helperText={touched?.milesPerGallon && typeof errors === "object" && errors?.milesPerGallon}
            fullWidth
            margin="normal"
          />
        </Grid2>
        <Grid2 sx={{ xs: 12, sx: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                name={`vehicles[${index}].regularMaintenance`}
                checked={vehicle.regularMaintenance}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            }
            label="Maintenance Done"
          />
        </Grid2>
      </Grid2>
      <Button variant="contained" color="secondary" onClick={() => remove(index)} sx={{ mt: 2 }}>
        Remove vehicle
      </Button>
    </Box>
  );
});

export default VehicleFootprintForm;
