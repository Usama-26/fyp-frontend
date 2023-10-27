import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import * as Yup from "yup";

export default function SecuritySettings() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  return (
    <div>
      <h1 className="font-semibold mb-2">Password</h1>
      <Formik
        initialValues={{
          currentPass: "strider26@dev",
          newPass: "",
          confirmNewPass: "",
        }}
        validationSchema={Yup.object({
          currentPass: Yup.string().trim(),
          newPass: Yup.string().trim(),
          confirmNewPass: Yup.string().trim(),
        })}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4 ">
            <div className="flex gap-4">
              <div className="w-full relative">
                <Field
                  className={`form-input ${
                    errors.currentPass && touched.currentPass && "field-error"
                  }`}
                  type={!isPasswordVisible ? "password" : "text"}
                  name="currentPass"
                  id="currentPass"
                  placeholder="Current Password"
                  disabled
                />
                <ErrorMessage
                  name="currentPass"
                  component={"p"}
                  className="field-error__message"
                />
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
              <div className="w-full relative">
                <Field
                  className={`form-input ${
                    errors.newPass && touched.newPass && "field-error"
                  }`}
                  type={!isNewPasswordVisible ? "password" : "text"}
                  name="newPass"
                  id="newPass"
                  placeholder="New Password"
                />
                <ErrorMessage
                  name="newPass"
                  component={"p"}
                  className="field-error__message"
                />
                <button
                  onClick={toggleNewPasswordVisibility}
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-2.5"
                >
                  {!isNewPasswordVisible ? (
                    <IoMdEyeOff className="w-6 h-6 fill-neutral-500" />
                  ) : (
                    <IoMdEye className="w-6 h-6 fill-neutral-500" />
                  )}
                </button>
              </div>
              <div className="w-full relative">
                <Field
                  className={`form-input ${
                    errors.confirmNewPass &&
                    touched.confirmNewPass &&
                    "field-error"
                  }`}
                  type={!isNewPasswordVisible ? "password" : "text"}
                  name="confirmNewPass"
                  id="confirmNewPass"
                  placeholder="Confirm New Password"
                />
                <ErrorMessage
                  name="confirmNewPass"
                  component={"p"}
                  className="field-error__message"
                />
                <button
                  onClick={toggleNewPasswordVisibility}
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-2.5"
                >
                  {!isNewPasswordVisible ? (
                    <IoMdEyeOff className="w-6 h-6 fill-neutral-500" />
                  ) : (
                    <IoMdEye className="w-6 h-6 fill-neutral-500" />
                  )}
                </button>
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
