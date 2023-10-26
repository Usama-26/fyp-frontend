import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import * as Yup from "yup";

const signupSchema = Yup.object({
  firstName: Yup.string().trim().required("First Name is required"),
  lastName: Yup.string().trim().required("Last Name is required"),
  email: Yup.string().trim().email().required("Email is required"),
  password: Yup.string().trim().required("Set a password"),
  confirmPass: Yup.string()
    .trim()
    .required("Re-enter your password for confirmation")
    .test("passwords-match", `Passwords don't match.`, function (value) {
      return this.parent.password === value;
    }),
});

export function SignupForm({ setFormData }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPass: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values) => {
        setFormData(values);
      }}
    >
      {({ errors, touched, submitCount }) => (
        <Form className="space-y-4">
          <div className="flex md:flex-row flex-col space-between gap-4">
            <div className="w-full">
              <Field
                className={`form-input ${
                  errors.firstName &&
                  touched.firstName &&
                  submitCount > 0 &&
                  "field-error"
                }`}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
              {submitCount > 0 && (
                <ErrorMessage
                  name="firstName"
                  component={"p"}
                  className="field-error__message"
                />
              )}
            </div>
            <div className="w-full">
              <Field
                className={`form-input ${
                  errors.lastName &&
                  touched.lastName &&
                  submitCount > 0 &&
                  "field-error"
                }`}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
              {submitCount > 0 && (
                <ErrorMessage
                  name="lastName"
                  component={"p"}
                  className="field-error__message"
                />
              )}
            </div>
          </div>
          <div>
            <Field
              className={`form-input ${
                errors.email &&
                touched.email &&
                submitCount > 0 &&
                "field-error"
              }`}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            {submitCount > 0 && (
              <ErrorMessage
                name="email"
                component={"p"}
                className="field-error__message"
              />
            )}
          </div>
          <div className="flex md:flex-row flex-col space-between gap-4">
            <div className="relative w-full">
              <div>
                <Field
                  className={`form-input ${
                    errors.password &&
                    touched.password &&
                    submitCount > 0 &&
                    "field-error"
                  }`}
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                {submitCount > 0 && (
                  <ErrorMessage
                    name="password"
                    component={"p"}
                    className="field-error__message"
                  />
                )}
              </div>
              <button
                onClick={togglePasswordVisibility}
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-2.5"
              >
                {!isPasswordVisible ? (
                  <IoMdEyeOff className="w-6 h-6 fill-neutral-500" />
                ) : (
                  <IoMdEye className="w-6 h-6 fill-neutral-500" />
                )}
              </button>
            </div>
            <div className="w-full">
              <Field
                className={`form-input ${
                  errors.confirmPass &&
                  touched.confirmPass &&
                  submitCount > 0 &&
                  "field-error"
                }`}
                type={isPasswordVisible ? "text" : "password"}
                name="confirmPass"
                id="confirmPass"
                placeholder="Confirm Password"
              />
              {submitCount > 0 && (
                <ErrorMessage
                  name="confirmPass"
                  component={"p"}
                  className="field-error__message"
                />
              )}
            </div>
          </div>
          <button type="submit" className="form-submit-btn">
            Join
          </button>
        </Form>
      )}
    </Formik>
  );
}
