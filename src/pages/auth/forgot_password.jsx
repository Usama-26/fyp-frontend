import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import Footer from "@/components/Footer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAccounts } from "@/context/AccountContext";

export default function ResetPassword() {
  const { resetPassword } = useAccounts();

  return (
    <>
      <Head>
        <title>Forgot Password | Workchain</title>
      </Head>
      <NavBar />
      <main>
        <div className="my-10 max-w-sm mx-auto border rounded-lg shadow p-8">
          <div className="text-center mb-6">
            <Logo />
          </div>
          <h3 className="text-xl font-semibold tracking-wider text-center mb-2">
            Forgot Password
          </h3>
          <p className="text-sm mb-4 italic text-neutral-500">
            {
              "Provide your email address and we'll send a password reset link to that email address."
            }
          </p>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .trim()
                .email("Invalid Email")
                .required("Email not provided"),
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
                <div className="w-full">
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
                    placeholder="Enter you email"
                  />
                  {submitCount > 0 && (
                    <ErrorMessage
                      name="email"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
                <button type="submit" className="form-submit-btn">
                  Reset
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
