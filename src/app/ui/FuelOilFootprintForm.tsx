/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useFootprintStore } from "../lib/store";
import { useFormik } from "formik";

export default function FuelOilFootprintForm() {
  const updateFuelOilFootprint = useFootprintStore((state) => state.updateFuelOilFootprint);
  const fuelOilFootprintData = useFootprintStore((state) => state.fuelOilFootprintData);

  const formik = useFormik({
    initialValues: fuelOilFootprintData,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await updateFuelOilFootprint(values);
      } catch (errors: any) {
        setErrors(
          errors.inner.reduce((acc: any, error: any) => {
            acc[error.path] = error.message;
            return acc;
          }, {})
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card component="form" sx={{ height: "100%" }} onSubmit={formik.handleSubmit}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Fuel Oil Footprint
        </Typography>
        <TextField
          label="Gallons per Month"
          name="gallonsPerMonth"
          fullWidth
          margin="normal"
          type="number"
          required
          onBlur={formik.handleBlur}
          value={formik.values.gallonsPerMonth}
          onChange={formik.handleChange}
          error={formik.touched.gallonsPerMonth && Boolean(formik.errors.gallonsPerMonth)}
          helperText={formik.touched.gallonsPerMonth && formik.errors.gallonsPerMonth}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
          Calculate
        </Button>
      </CardActions>
    </Card>
  );
}
