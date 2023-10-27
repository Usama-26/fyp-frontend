import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
export default function ContactSettings() {
  return (
    <div>
      <h1 className="font-semibold mb-2">Contact Info</h1>
      <Formik
        initialValues={{
          email: "m.usamaali999@gmail.com",
          address: "Warburton, Punjab",
          country: "Pakistan",
        }}
        validationSchema={Yup.object({
          email: Yup.string().trim().required("Email is required"),
          address: Yup.string().trim().required("Address is required"),
        })}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="space-y-4 max-w-md">
              <div className="w-full">
                <h6 className="text-sm">Email</h6>
                <Field
                  className={`form-input ${
                    errors.email && touched.email && "field-error"
                  }`}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="email"
                  component={"p"}
                  className="field-error__message"
                />
              </div>
              <div className="w-full">
                <h6 className="text-sm">Address</h6>
                <Field
                  className={`form-input ${
                    errors.address && touched.address && "field-error"
                  }`}
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="address"
                  component={"p"}
                  className="field-error__message"
                />
              </div>
              <div className="w-full">
                <h6 className="text-sm">Country</h6>
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
