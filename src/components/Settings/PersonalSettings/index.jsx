import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import { useAccounts } from "@/context/AccountContext";
import { BiPencil } from "react-icons/bi";
import { useClient } from "@/context/ClientContext";
import Spinner from "@/components/Spinner";
import countries from "@/json/countries";
import ComboSelectBox from "@/components/Comboboxes/ComboSelectBox";
import { CameraIcon, CheckBadgeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function PersonalSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState([]);
  const { user, loadAccount } = useAccounts();
  const {
    updateClientInfo,
    updateClientProfilePhoto,
    updatedUser,
    isLoading: updateLoading,
  } = useClient();

  const handleUpdate = (e) => {
    updateClientProfilePhoto(user.data._id, e.target.files[0]);
    setProfilePhoto(e.target.files[0]);
  };

  const originalValues = {
    firstName: user?.data.firstName,
    lastName: user?.data.lastName,
    email: user?.data.email,
    address: user?.data.address || "",
    country: user?.data.country || "",
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    loadAccount(token);
  }, [updatedUser]);

  return (
    <Formik
      initialValues={originalValues}
      validationSchema={Yup.object({
        firstName: Yup.string().trim().required("First Name is required"),
        lastName: Yup.string().trim().required("Last Name is required"),
        email: Yup.string().trim().required("Email is required"),
        address: Yup.string().trim(),
        country: Yup.string().trim(),
      })}
      onSubmit={(values) => {
        updateClientInfo(user.data._id, values);
        setIsEditing(false);
      }}
    >
      {({ values, errors, touched, resetForm, setFieldValue }) => (
        <div className="relative grid grid-cols-3 mx-auto">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
          {isEditing ? (
            <Form encType="multipart/form-data" className="space-y-4">
              <div className=" space-y-4 max-w-md">
                <div>
                  <label htmlFor="firsName" className="font-medium text-sm">
                    First Name
                  </label>
                  <Field
                    className={`form-input disabled:border-neutral-300 text-sm disabled:bg-transparent disabled:text-neutral-500 ${
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
                  <label htmlFor="lastName" className="font-medium text-sm">
                    Last Name
                  </label>
                  <Field
                    className={`form-input disabled:border-neutral-300 text-sm disabled:bg-transparent disabled:text-neutral-500 ${
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
              <div className=" space-y-4 max-w-md">
                <div>
                  <label htmlFor="email" className="font-medium text-sm">
                    Email Address
                  </label>
                  <Field
                    className={`form-input disabled:border-neutral-300 text-sm disabled:bg-transparent disabled:text-neutral-500 ${
                      errors.email && touched.email && "field-error"
                    }`}
                    type="text"
                    name="email"
                    id="email"
                    disabled={!isEditing ? true : false}
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component={"p"}
                    className="field-error__message"
                  />
                  {user.data.email_verified ? (
                    <span className="text-sm font-medium italic text-success-500">
                      <CheckBadgeIcon className="w-5 h-5 mr-2 inline-block " />
                      <span>Email Verified</span>
                    </span>
                  ) : (
                    <button className="text-sm hover:underline text-primary-500">
                      Verify Email
                    </button>
                  )}
                </div>
                <div>
                  <label htmlFor="address" className="font-medium text-sm">
                    Address
                  </label>
                  <Field
                    className={`form-input disabled:border-neutral-300 text-sm disabled:bg-transparent disabled:text-neutral-500 ${
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
                  <Field name="country">
                    {({ field }) => (
                      <div className="w-full">
                        <label htmlFor="country" className="font-medium text-sm">
                          Country
                        </label>
                        <ComboSelectBox
                          items={countries}
                          isDisabled={!isEditing}
                          defaultItem={field.value}
                          setValue={(item) => setFieldValue("country", item)}
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="country"
                    component="p"
                    className="field-error__message"
                  />
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
                    disabled={updateLoading}
                    className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                  >
                    {updateLoading ? <Spinner /> : "Save Changes"}
                  </button>
                </div>
              )}
            </Form>
          ) : (
            <PersonalInformation data={values} />
          )}
          <div>
            <div className=" text-end">
              <button
                onClick={toggleIsEditing}
                className="rounded-full p-2 bg-neutral-200 hover:bg-primary-400 hover:text-white text-sm font-medium"
              >
                <BiPencil className="w-5 h-5 inline" />
              </button>
            </div>
            <div className=" text-center mt-10">
              <span className="relative group w-40 h-40 rounded-full overflow-hidden inline-block mx-auto">
                {user?.data.profile_photo ? (
                  <Image
                    src={user?.data.profile_photo}
                    width={500}
                    height={500}
                    alt="Profile Photo"
                    className="rounded-full aspect-square object-cover w-40 h-40"
                  />
                ) : (
                  <span className="w-40 h-40 flex justify-center items-center rounded-full text-xl text-center text-white font-semibold bg-primary-500">
                    {user?.data.firstName[0]}
                  </span>
                )}
                {updateLoading && (
                  <span className="absolute top-0 left-0 inline-flex w-full h-full z-10 bg-black/50 items-center justify-center ">
                    <Spinner />
                  </span>
                )}
                <label
                  htmlFor="profile_photo"
                  className="absolute invisible group-hover:visible cursor-pointer bottom-0 py-2 left-0 inline-block w-full text-center bg-black/50"
                >
                  <CameraIcon className="w-8 h-8 fill-white inline-block" />
                </label>
              </span>
              <input
                type="file"
                onChange={handleUpdate}
                accept="image/*"
                className="hidden"
                id="profile_photo"
              />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

function PersonalInformation({ data }) {
  return (
    <div className="mt-6 max-w-xl border-t border-neutral-100">
      <dl className="divide-y divide-neutral-100">
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Full Name</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            {data.firstName} {data.lastName}
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">
            Email Address
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2  sm:mt-0">
            {data.email}
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Address</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            {data.address}
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Country</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            {data.country}
          </dd>
        </div>
      </dl>
    </div>
  );
}
