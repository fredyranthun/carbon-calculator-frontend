/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { PropaneFootprintData, propaneFootprintSchema } from "../lib/propane-footprint-lib";

export interface PropaneFootprintFormProps {
  initialValues: PropaneFootprintData;
  onSubmit: (values: PropaneFootprintData) => void;
}

export default function PropaneFootprintForm({ initialValues, onSubmit }: PropaneFootprintFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: propaneFootprintSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await onSubmit(values);
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
          Propane Footprint
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
