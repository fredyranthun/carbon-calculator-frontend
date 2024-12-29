/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Slider from "@mui/material/Slider";
import { useFormik } from "formik";
import { ElectricityFootprintData, electricityFootprintSchema } from "../lib/electricity-footprint-lib";

export interface ElectricityFootprintFormProps {
  initialValues: ElectricityFootprintData;
  onSubmit: (values: ElectricityFootprintData) => void;
}

export default function ElectricityFootprintForm({ initialValues, onSubmit }: ElectricityFootprintFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: electricityFootprintSchema,
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
          Electricity Footprint
        </Typography>
        <TextField
          label="Zip Code"
          name="zipCode"
          fullWidth
          margin="normal"
          required
          onBlur={formik.handleBlur}
          value={formik.values.zipCode}
          onChange={formik.handleChange}
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
          helperText={formik.touched.zipCode && formik.errors.zipCode}
        />
        <TextField
          label="Electricity Usage (kWh) per month"
          name="kwhPerMonth"
          fullWidth
          margin="normal"
          type="number"
          required
          value={formik.values.kwhPerMonth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.kwhPerMonth && Boolean(formik.errors.kwhPerMonth)}
          helperText={formik.touched.kwhPerMonth && formik.errors.kwhPerMonth}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <Typography id="green-energy-slider">Percentage of Green energy usage</Typography>
          <Tooltip title="The percentage of energy coming green sources from your electricity bill.">
            <HelpIcon />
          </Tooltip>
        </Box>
        <Box sx={{ width: "95%", margin: "0 auto" }}>
          <Slider
            name="greenPowerFraction"
            value={formik.values.greenPowerFraction}
            onChange={(event, value) => formik.setFieldValue("greenPowerFraction", value)}
            valueLabelDisplay="auto"
            aria-labelledby="green-energy-slider"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
          Calculate
        </Button>
      </CardActions>
    </Card>
  );
}
