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
import { naturalGasFootprintSchema } from "../lib/natural-gas-footprint-lib";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function NaturalGasFootprintForm() {
  const updateNaturalGasFootprint = useFootprintStore((state) => state.updateNaturalGasFootprint);
  const formik = useFormik({
    initialValues: { consumePerMonth: 0, unit: "" },
    validationSchema: naturalGasFootprintSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        console.log(values);
        await updateNaturalGasFootprint(values);
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
          Natural Gas Footprint
        </Typography>
        <TextField
          label="Consumption per Month"
          name="consumePerMonth"
          type="number"
          fullWidth
          margin="normal"
          required
          onBlur={formik.handleBlur}
          value={formik.values.consumePerMonth}
          onChange={formik.handleChange}
          error={formik.touched.consumePerMonth && Boolean(formik.errors.consumePerMonth)}
          helperText={formik.touched.consumePerMonth && formik.errors.consumePerMonth}
        />
        <FormControl fullWidth sx={{ marginTop: "12px" }}>
          <InputLabel id="unit-label">Unit</InputLabel>
          <Select
            labelId="unit-label"
            id="unit"
            name="unit"
            value={formik.values.unit}
            label="Unit"
            onChange={formik.handleChange}
            required
          >
            <MenuItem value="therms">Therms</MenuItem>
            <MenuItem value="ccf">Thousand Cubic Feet</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" type="submit" disabled={formik.isSubmitting}>
          Calculate
        </Button>
      </CardActions>
    </Card>
  );
}
