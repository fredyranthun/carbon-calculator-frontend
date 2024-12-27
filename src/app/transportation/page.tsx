"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormik, FieldArray, FormikProvider } from "formik";
import VehicleFootprintForm from "../ui/VehicleFootprintForm";
import { transportationFootprintSchema } from "../lib/transportation-footprint-lib";
import { useFootprintStore } from "../lib/store";
import TotalFootprintCard from "../ui/TotalFootprintCard";

export default function TransportationFootprint() {
  const updateTransportationFootprint = useFootprintStore((state) => state.updateTransportationFootprint);
  const transportationFootprintData = useFootprintStore((state) => state.transportationFootprintData);
  const formik = useFormik({
    initialValues: transportationFootprintData,
    validationSchema: transportationFootprintSchema,
    onSubmit: async (values) => {
      try {
        await updateTransportationFootprint(values);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transport Footprint Calculator
        </Typography>
        <TotalFootprintCard />
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <FieldArray name="vehicles" validateOnChange={false}>
              {({ push, remove }) => (
                <>
                  {formik.values.vehicles.map((vehicle, index) => (
                    <VehicleFootprintForm
                      key={index}
                      index={index}
                      vehicle={vehicle}
                      handleChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      touched={formik.touched.vehicles?.[index]}
                      errors={formik.errors.vehicles?.[index]}
                      remove={remove}
                    />
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => push({ milesPerYear: 0, milesPerGallon: 0, regularMaintenance: false })}
                    sx={{ mt: 2 }}
                  >
                    Add Vehicle
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
