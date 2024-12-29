import { FieldArray, FormikProvider, useFormik } from "formik";
import { TransportationFootprintData, transportationFootprintSchema } from "../lib/transportation-footprint-lib";
import VehicleFootprintForm from "./VehicleFootprintForm";
import { Button } from "@mui/material";

interface TransportationFootprintFormProps {
  initialValues: TransportationFootprintData;
  onSubmit: (values: TransportationFootprintData) => void;
}

export default function TransportationFootprintForm({ initialValues, onSubmit }: TransportationFootprintFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: transportationFootprintSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
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
  );
}
