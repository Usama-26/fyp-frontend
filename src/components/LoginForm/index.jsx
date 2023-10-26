import { IoMdEye } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
export default function LoginForm({ setFormData }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().trim().email().required("Email is required"),
        password: Yup.string().trim().required("Password is required"),
      })}
      onSubmit={(values) => {
        setFormData(values);
      }}
    >
      {({ errors, touched, submitCount }) => (
        <Form className="space-y-4">
          <Field
            className={`form-input ${
              errors.lastName &&
              touched.lastName &&
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
          <div className="relative">
            <Field
              className={`form-input ${
                errors.lastName &&
                touched.lastName &&
                submitCount > 0 &&
                "field-error"
              }`}
              type="password"
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
            <button
              onClick={togglePasswordVisibility}
              tabIndex={-1}
              type="button"
              className="absolute right-2 top-2.5"
            >
              <IoMdEye className="w-6 h-6 fill-neutral-500" />
            </button>
          </div>
          <div className="text-end mb-10">
            <Link
              href={"/auth/reset_password"}
              className="text-sm italic text-neutral-500 hover:text-primary-500 hover:underline underline-offset-2"
            >
              Forgot password ?
            </Link>
          </div>
          <button type="submit" className="form-submit-btn">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}
