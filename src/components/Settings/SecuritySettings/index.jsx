import SimpleNotification from "@/components/Notifications/simple";
import Spinner from "@/components/Spinner";
import { useAccounts } from "@/context/AccountContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import * as Yup from "yup";

export default function SecuritySettings() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const { user, updatePassword, successMessage, error, isLoading, clearMessage } =
    useAccounts();

  const initialValues = {
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  };
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  useEffect(() => {
    if (successMessage) {
      setIsEditing(false);
      setTimeout(() => {
        clearMessage();
      }, 5000);
    }
  }, [successMessage]);

  return (
    <div className="relative ">
      {successMessage && (
        <SimpleNotification
          heading={successMessage}
          message={"Your password has been updated successfully."}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          currentPass: Yup.string().trim().required("Current password is required."),
          newPass: Yup.string().trim().required("New Password is required"),
          confirmNewPass: Yup.string()
            .trim()
            .required("Re-enter your password for confirmation")
            .test("passwords-match", `Passwords don't match.`, function (value) {
              return this.parent.newPass === value;
            }),
        })}
        onSubmit={(values) => {
          updatePassword(user.data._id, { ...values, confirmNewPass: undefined });
        }}
      >
        {({ errors, touched, submitCount, resetForm }) => (
          <div className="relative grid grid-cols-3 gap-4 mx-auto">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Security
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Manage your passwords and other security related settings here.
              </p>
            </div>
            {isEditing ? (
              <Form className="space-y-4 mt-6">
                <div>
                  <div className="w-full relative">
                    <label htmlFor="currentPass" className="font-medium text-sm">
                      Current Password
                    </label>
                    <Field
                      className={`form-input text-sm ${
                        errors.currentPass &&
                        touched.currentPass &&
                        submitCount > 0 &&
                        "field-error"
                      }`}
                      type={!isPasswordVisible ? "password" : "text"}
                      name="currentPass"
                      id="currentPass"
                      placeholder="Current Password"
                    />

                    <button
                      onClick={togglePasswordVisibility}
                      type="button"
                      tabIndex={-1}
                      className="absolute right-2 bottom-2"
                    >
                      {!isPasswordVisible ? (
                        <IoMdEyeOff className="w-6 h-6 fill-neutral-500" />
                      ) : (
                        <IoMdEye className="w-6 h-6 fill-neutral-500" />
                      )}
                    </button>
                  </div>
                  {submitCount > 0 && (
                    <ErrorMessage
                      name="currentPass"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                  {error && <p className="field-error__message">{error}</p>}
                </div>
                <div>
                  <div className="w-full relative">
                    <label htmlFor="newPass" className="text-sm font-medium">
                      New Password
                    </label>
                    <Field
                      className={`form-input text-sm ${
                        errors.newPass &&
                        touched.newPass &&
                        submitCount > 0 &&
                        "field-error"
                      }`}
                      type={!isNewPasswordVisible ? "password" : "text"}
                      name="newPass"
                      id="newPass"
                      placeholder="New Password"
                    />

                    <button
                      onClick={toggleNewPasswordVisibility}
                      type="button"
                      tabIndex={-1}
                      className="absolute right-2 bottom-2"
                    >
                      {!isNewPasswordVisible ? (
                        <IoMdEyeOff className="w-6 h-6 fill-neutral-500" />
                      ) : (
                        <IoMdEye className="w-6 h-6 fill-neutral-500" />
                      )}
                    </button>
                  </div>
                  {submitCount > 0 && (
                    <ErrorMessage
                      name="newPass"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
                <div>
                  <div className="w-full relative">
                    <label htmlFor="confirmNewPass" className="text-sm font-medium">
                      Confirm New Password
                    </label>
                    <Field
                      className={`form-input text-sm ${
                        errors.confirmNewPass &&
                        touched.confirmNewPass &&
                        submitCount > 0 &&
                        "field-error"
                      }`}
                      type={!isNewPasswordVisible ? "password" : "text"}
                      name="confirmNewPass"
                      id="confirmNewPass"
                      placeholder="Confirm New Password"
                    />

                    <button
                      onClick={toggleNewPasswordVisibility}
                      type="button"
                      tabIndex={-1}
                      className="absolute right-2 bottom-2"
                    >
                      {!isNewPasswordVisible ? (
                        <IoMdEyeOff className="w-6 h-6 fill-neutral-500" />
                      ) : (
                        <IoMdEye className="w-6 h-6 fill-neutral-500" />
                      )}
                    </button>
                  </div>
                  {submitCount > 0 && (
                    <ErrorMessage
                      name="confirmNewPass"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>

                {isEditing && (
                  <div className="space-x-2 text-end">
                    <button
                      onClick={() => {
                        resetForm({ values: initialValues });
                        setIsEditing(false);
                      }}
                      type="button"
                      className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300  text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                    >
                      {isLoading ? <Spinner /> : "Update Password"}
                    </button>
                  </div>
                )}
              </Form>
            ) : (
              <div className="relative">
                <button
                  onClick={toggleIsEditing}
                  type="button"
                  className="mt-4 w-full flex justify-between items-center py-4 px-2 border-y hover:bg-gray-50 hover:text-primary-700 cursor-pointer"
                >
                  <h4 className="font-medium">Change Password</h4>
                  <BiPencil className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </Formik>
    </div>
  );
}
