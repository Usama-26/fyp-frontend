import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useAccounts } from "@/context/AccountContext";

export default function PersonalSettings() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const { user } = useAccounts();

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,flags"
      );
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <h1 className="font-semibold mb-2">Personal Information</h1>
      <Formik
        initialValues={{
          firstName: user?.data.firstName,
          lastName: user?.data.lastName,
          country: user?.data.country,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().trim().required("First Name is required"),
          lastName: Yup.string().trim().required("Last Name is required"),
        })}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <div className="space-y-4 max-w-md">
              <div className="flex gap-4">
                <Field
                  className={`form-input ${
                    errors.firstName && touched.firstName && "field-error"
                  }`}
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="firstName"
                  component={"p"}
                  className="field-error__message"
                />
              </div>
              <div className="w-full">
                <Field
                  className={`form-input ${
                    errors.lastName && touched.lastName && "field-error"
                  }`}
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="lastName"
                  component={"p"}
                  className="field-error__message"
                />
              </div>
            </div>

            <div className="space-x-2 text-end">
              <button
                type="submit"
                className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300  text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-medium px-2 py-1.5 rounded bg-primary-500 hover:bg-primary-700 text-white text-sm"
              >
                Update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
