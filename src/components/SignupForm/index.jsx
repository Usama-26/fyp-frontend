import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import * as Yup from "yup";
export function SignupForm({setFormData}) {
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
      validationSchema={Yup.object({
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
      })}
      onSubmit={(values) => {
        setFormData(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div className="flex md:flex-row flex-col space-between gap-4">
            <div className="w-full">
              <Field
                className={`form-input ${
                  errors.firstName &&
                  touched.firstName &&
                  "border-red-500 ring-red-200"
                }`}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
              <ErrorMessage
                name="firstName"
                component={"p"}
                className="text-xs text-danger-600"
              />
            </div>
            <div className="w-full">
              <Field
                className={`form-input ${
                  errors.lastName &&
                  touched.lastName &&
                  "border-red-500 ring-red-200"
                }`}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
              <ErrorMessage
                name="lastName"
                component={"p"}
                className="text-xs text-danger-600"
              />
            </div>
          </div>
          <div>
            <Field
              className={`form-input ${
                errors.email && touched.email && "border-red-500 ring-red-200"
              }`}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component={"p"}
              className="text-xs text-danger-600"
            />
          </div>
          <div className="flex md:flex-row flex-col space-between gap-4">
            <div className="relative w-full">
              <div>
                <Field
                  className={`form-input ${
                    errors.password &&
                    touched.password &&
                    "border-red-500 ring-red-200"
                  }`}
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component={"p"}
                  className="text-xs text-danger-600"
                />
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
                  "border-red-500 ring-red-200"
                }`}
                type={isPasswordVisible ? "text" : "password"}
                name="confirmPass"
                id="confirmPass"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPass"
                component={"p"}
                className="text-xs text-danger-600"
              />
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
