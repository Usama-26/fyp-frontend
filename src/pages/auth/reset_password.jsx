import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Head from "next/head";
import * as Yup from "yup";

import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useAccounts } from "@/context/AccountContext";
import withAuthRouteProtect from "@/helpers/withAuthRouteProtect";

function ResetPassword() {
  const { resetPassword } = useAccounts();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <>
      <Head>
        <title>Reset Password | Workchain</title>
      </Head>
      <NavBar />
      <main>
        <div className="my-10 max-w-sm mx-auto border rounded-lg shadow p-8">
          <div className="text-center mb-6">
            <Logo />
          </div>
          <h3 className="text-xl font-semibold tracking-wider text-center mb-2">
            Set New Password
          </h3>
          <Formik
            initialValues={{
              password: "",
              confirmPass: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string().trim().required("Set New password"),
              confirmPass: Yup.string()
                .trim()
                .required("Re-enter new password for confirmation")
                .test(
                  "passwords-match",
                  `Passwords don't match.`,
                  function (value) {
                    return this.parent.password === value;
                  }
                ),
            })}
            onSubmit={(values, { resetForm }) => {
              resetPassword(values);
              if (isSubmitted) {
                resetForm({ values: null });
              }
            }}
          >
            {({ errors, touched, submitCount }) => (
              <Form className="space-y-4">
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
                      placeholder="Enter New Password"
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
                    placeholder="Confirm New Password"
                  />
                  {submitCount > 0 && (
                    <ErrorMessage
                      name="confirmPass"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
                <button type="submit" className="form-submit-btn">
                  Reset Password
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withAuthRouteProtect(ResetPassword)