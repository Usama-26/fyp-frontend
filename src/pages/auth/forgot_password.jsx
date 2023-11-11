import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import Footer from "@/components/Footer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAccounts } from "@/context/AccountContext";
import withAuthRouteProtect from "@/helpers/withAuthRouteProtect";

function ForgotPassword() {
  const { forgotPassword, isLoading, error, emailSuccessMessage } = useAccounts();

  return (
    <>
      <Head>
        <title>Forgot Password | Workchain</title>
      </Head>
      <NavBar />
      <main>
        <div className="relative my-10 max-w-sm mx-auto border rounded-lg shadow">
          {error && (
            <div className="w-full absolute top-0 bg-danger-200 rounded-t-md py-2 px-2">
              <p className="text-sm text-danger-700">{error}</p>
            </div>
          )}
          {emailSuccessMessage && (
            <div className="w-full absolute top-0 bg-success-200 rounded-t-md py-2 px-2">
              <p className="text-sm text-success-700">{emailSuccessMessage}</p>
            </div>
          )}
          <div className="p-8 pt-12">
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
                forgotPassword(values);
                if (emailSuccessMessage) {
                  resetForm({ values: null });
                }
              }}
            >
              {({ errors, touched, submitCount }) => (
                <Form className="space-y-4">
                  <div className="w-full">
                    <Field
                      className={`form-input ${
                        errors.email && touched.email && submitCount > 0 && "field-error"
                      }`}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter you email address"
                    />
                    {submitCount > 0 && (
                      <ErrorMessage
                        name="email"
                        component={"p"}
                        className="field-error__message"
                      />
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="form-submit-btn disabled:bg-neutral-100   disabled:text-neutral-500 "
                  >
                    {isLoading ? "Loading..." : "Send Email"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default withAuthRouteProtect(ForgotPassword);
