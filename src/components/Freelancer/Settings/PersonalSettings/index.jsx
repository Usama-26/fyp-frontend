import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function PersonalSettings() {
  return (
    <div>
      <h1 className="font-semibold mb-2">Personal Information</h1>
      <Formik
        initialValues={{
          firstName: "Usama",
          lastName: "Afzal",
          country: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().trim().required("First Name is required"),
          lastName: Yup.string().trim().required("Last Name is required"),
        })}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="space-y-4 max-w-md">
              <div className="flex gap-4">
                <div className="w-full">
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
              <div className="w-full">
                <h1 className="font-semibold mb-2">Country</h1>
                <Field
                  className={`form-input ${
                    errors.country && touched.country && "field-error"
                  }`}
                  type="select"
                  as="select"
                  name="country"
                  id="country"
                  placeholder="Country"
                >
                  <option value="pakistan">Pakistan</option>
                  <option value="India">India</option>
                  <option value="china">China</option>
                </Field>
                <ErrorMessage
                  name="country"
                  component={"p"}
                  className="field-error__message"
                />
              </div>
            </div>
            <div className="space-x-2 text-end">
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
