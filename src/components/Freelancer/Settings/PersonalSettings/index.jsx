import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import { useAccounts } from "@/context/AccountContext";
import { BiPencil } from "react-icons/bi";
import { useClient } from "@/context/ClientContext";
import Spinner from "@/components/Spinner";

export default function PersonalSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loadAccount } = useAccounts();
  const { updateClientInfo, updatedUser, isLoading: updateLoading } = useClient();

  const originalValues = {
    firstName: user?.data.firstName,
    lastName: user?.data.lastName,
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    loadAccount(token);
  }, [updatedUser]);

  return (
    <div className="relative">
      <div className="flex justify-between">
        <h1 className="font-semibold mb-2">Personal Information</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-full p-2 bg-neutral-200 hover:bg-primary-400 hover:text-white text-sm font-medium"
        >
          <BiPencil className="w-5 h-5 inline" />
        </button>
      </div>
      <Formik
        initialValues={originalValues}
        validationSchema={Yup.object({
          firstName: Yup.string().trim().required("First Name is required"),
          lastName: Yup.string().trim().required("Last Name is required"),
        })}
        onSubmit={(values) => {
          updateClientInfo(user.data._id, values);
          setIsEditing(false);
        }}
      >
        {({ values, errors, touched, resetForm }) => (
          <Form>
            <div className="flex">
              <div className="basis-1/2 space-y-4 max-w-md">
                <div>
                  <Field
                    className={`form-input disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 ${
                      errors.firstName && touched.firstName && "field-error"
                    }`}
                    type="text"
                    name="firstName"
                    id="firstName"
                    disabled={!isEditing ? true : false}
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component={"p"}
                    className="field-error__message"
                  />
                </div>
                <div>
                  <Field
                    className={`form-input disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 ${
                      errors.lastName && touched.lastName && "field-error"
                    }`}
                    type="text"
                    name="lastName"
                    id="lastName"
                    disabled={!isEditing ? true : false}
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component={"p"}
                    className="field-error__message"
                  />
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="space-x-2 text-end">
                <button
                  onClick={() => {
                    resetForm({ values: originalValues });
                    setIsEditing(false);
                  }}
                  className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300  text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading || values === originalValues ? true : false}
                  className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                >
                  {updateLoading ? <Spinner /> : "Update"}
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
