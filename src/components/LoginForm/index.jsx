import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
export default function LoginForm({ handleSubmit, isSubmitted }) {
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
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        isSubmitted && resetForm({ values: null });
      }}
    >
      {({ errors, touched, submitCount }) => (
        <Form className="space-y-4">
          <div>
            <Field
              className={`form-input ${
                errors.email && touched.email && submitCount > 0 && "field-error"
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
          <div className="relative">
            <Field
              className={`form-input ${
                errors.password && touched.password && submitCount > 0 && "field-error"
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
            <button
              onClick={togglePasswordVisibility}
              type="button"
              className="absolute right-2 top-2.5"
            >
              {!isPasswordVisible ? (
                <IoMdEyeOff className="w-6 h-6 fill-neutral-500" />
              ) : (
                <IoMdEye className="w-6 h-6 fill-neutral-500" />
              )}
            </button>
          </div>
          <div className="text-end mb-10">
            <Link
              href={"/auth/forgot_password"}
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
