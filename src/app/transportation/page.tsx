"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormik, FieldArray, FormikProvider } from "formik";
import CarFootprintForm from "../ui/CarFootprintForm";
import { transportationFootprintSchema } from "../lib/transportation-footprint-lib";

export default function TransportationFootprint() {
  console.log("Render");
  const formik = useFormik({
    initialValues: {
      cars: [{ milesPerYear: 0, milesPerGallon: 0, maintenance: false }],
    },
    validationSchema: transportationFootprintSchema,
    onSubmit: async (values) => {
      // Make API call here
      // const response = await fetch('/api/transportation-footprint', { method: 'POST', body: JSON.stringify(values) });
      // const result = await response.json();
      console.log("Submitted data:", values);
    },
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transport Footprint Calculator
        </Typography>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <FieldArray name="cars" validateOnChange={false}>
              {({ push, remove }) => (
                <>
                  {formik.values.cars.map((car, index) => (
                    <CarFootprintForm
                      key={index}
                      index={index}
                      car={car}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      touched={formik.touched.cars?.[index]}
                      errors={formik.errors.cars?.[index]}
                      remove={remove}
                    />
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => push({ milesPerYear: 0, milesPerGallon: 0, maintenance: false })}
                    sx={{ mt: 2 }}
                  >
                    Add Car
                  </Button>
                </>
              )}
            </FieldArray>
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, ml: 2 }}>
              Calculate
            </Button>
          </form>
        </FormikProvider>
      </Box>
    </Container>
  );
}
