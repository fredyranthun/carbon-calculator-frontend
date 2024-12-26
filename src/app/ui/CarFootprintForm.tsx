/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid2 from "@mui/material/Grid2";
import React from "react";
import { Car } from "../lib/transportation-footprint-lib";

interface Props {
  index: number;
  car: Car;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  touched: any;
  errors: any;
  remove: <X = any>(index: number) => X | undefined;
}

export const CarFootprintForm = React.memo(function CarFootprintForm({
  index,
  car,
  handleBlur,
  handleChange,
  remove,
  touched,
  errors,
}: Props) {
  console.log("Rnder CarFootprintForm", index);
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2">
        Car {index + 1}
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 sx={{ xs: 12, sx: 4 }}>
          <TextField
            label="Miles per Year"
            name={`cars[${index}].milesPerYear`}
            value={car.milesPerYear}
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
            name={`cars[${index}].milesPerGallon`}
            value={car.milesPerGallon}
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
                name={`cars[${index}].maintenance`}
                checked={car.maintenance}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            }
            label="Maintenance Done"
          />
        </Grid2>
      </Grid2>
      <Button variant="contained" color="secondary" onClick={() => remove(index)} sx={{ mt: 2 }}>
        Remove Car
      </Button>
    </Box>
  );
});

export default CarFootprintForm;
