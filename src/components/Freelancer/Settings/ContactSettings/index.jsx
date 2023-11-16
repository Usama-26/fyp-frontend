import Spinner from "@/components/Spinner";
import { useAccounts } from "@/context/AccountContext";
import { useClient } from "@/context/ClientContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiPencil } from "react-icons/bi";
import countries from "@/json/countries";
import * as Yup from "yup";
import Select from "react-select";
export default function ContactSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loadAccount } = useAccounts();

  const { updateClientInfo, updatedUser, isLoading: updateLoading } = useClient();

  const originalValues = {
    email: user?.data.email,
    address: user?.data.address || "",
    country: user?.data.country || "",
  };

  // const fetchCountries = async () => {
  //   try {
  //     const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    loadAccount(token);
  }, [updatedUser]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold mb-2">Contact Info</h1>
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
          email: Yup.string().trim().required("Email is required"),
          address: Yup.string().trim().required("Address is required"),
          country: Yup.string().trim().required("Country is required"),
        })}
        onSubmit={(values) => {
          updateClientInfo(user.data._id, values);
          setIsEditing(false);
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="flex">
              <div className="basis-1/2 space-y-4 max-w-md">
                <div>
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <Field
                    className={`form-input disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 ${
                      errors.email && touched.email && "field-error"
                    }`}
                    type="text"
                    name="email"
                    id="email"
                    disabled={!isEditing ? true : false}
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="email"
                    component={"p"}
                    className="field-error__message"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="font-medium">
                    Address
                  </label>
                  <Field
                    className={`form-input disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 ${
                      errors.address && touched.address && "field-error"
                    }`}
                    type="text"
                    name="address"
                    id="address"
                    disabled={!isEditing ? true : false}
                    placeholder="Enter Address"
                  />
                  <ErrorMessage
                    name="address"
                    component={"p"}
                    className="field-error__message"
                  />
                </div>
                <div className="w-full">
                  <Field name="skills">
                    {({ field }) => (
                      <div className="w-full">
                        <label htmlFor="country" className="font-medium">
                          Country
                        </label>
                        <Select
                          {...field}
                          options={countries}
                          classNames={"form-input"}
                          value={selectedService}
                          isMulti={true}
                          placeholder="Refine your result"
                          onChange={(selected) => {
                            setSelectedSkills(selected);
                            setFieldValue("skills", selected.value);
                          }}
                        />
                        <ErrorMessage
                          name="service"
                          component="p"
                          className="field-error__message"
                        />
                      </div>
                    )}
                  </Field>
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
                  disabled={values === originalValues ? true : false}
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
