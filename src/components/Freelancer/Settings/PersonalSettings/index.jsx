import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";

import * as Yup from "yup";
import { Listbox, Transition } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { useAccounts } from "@/context/AccountContext";
import Image from "next/image";
import { HiChevronUp } from "react-icons/hi";
import { HiChevronUpDown } from "react-icons/hi2";

export default function PersonalSettings() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const { user } = useAccounts();

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,flags"
      );
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <h1 className="font-semibold mb-2">Personal Information</h1>
      <Formik
        initialValues={{
          firstName: user?.data.firstName,
          lastName: user?.data.lastName,
          country: user?.data.country,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().trim().required("First Name is required"),
          lastName: Yup.string().trim().required("Last Name is required"),
        })}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <div className="space-y-4 max-w-md">
              <div className="flex gap-4">
                <div className="w-full">
                  <Field
                    className={`form-input ${
                      errors.firstName && touched.firstName && "field-error"
                    }`}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component={"p"}
                    className="field-error__message"
                  />
                </div>
                <div className="w-full">
                  <Field
                    className={`form-input ${
                      errors.lastName && touched.lastName && "field-error"
                    }`}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component={"p"}
                    className="field-error__message"
                  />
                </div>
              </div>
              <div className="w-full relative">
                <h1 className="font-semibold mb-2">Country</h1>
                <Field name="country" id="country">
                  {({ field }) => (
                    <Listbox
                      value={selectedCountry}
                      onChange={(value) => {
                        setFieldValue("country", value.name.common);
                        setSelectedCountry(value);
                      }}
                    >
                      {({ open }) => (
                        <>
                          <Listbox.Button
                            className={`w-full p-2 rounded-md border text-left focus:ring-2 focus:border-primary-500 ${
                              open ? "border-primary-500 ring-2" : "border-neutral-500"
                            } font-medium placeholder:text-neutral-400 outline-none text-sm`}
                          >
                            <div className="flex gap-2 justify-between items-center">
                              <span>
                                <Image
                                  src={selectedCountry.flags.svg}
                                  width={20}
                                  height={20}
                                  alt={selectedCountry.flags.alt}
                                  className="inline mr-2"
                                />
                                <span>{selectedCountry.name.common}</span>
                              </span>
                              <HiChevronUpDown className="w-4 h-4" />
                            </div>
                          </Listbox.Button>

                          <Listbox.Options
                            className={
                              "w-full h-48 overflow-auto rounded-md shadow-custom-md shadow-neutral-300 mt-2 absolute bg-white divide-y"
                            }
                          >
                            {countries?.map((country, index) => (
                              <Listbox.Option
                                key={index}
                                value={country}
                                className={
                                  " text-sm cursor-pointer hover:bg-primary-100 p-2 capitalize"
                                }
                              >
                                <Image
                                  src={country.flags.svg}
                                  width={20}
                                  height={20}
                                  alt={country.flags.alt}
                                  className="inline mr-2"
                                />
                                <span>{country.name.common}</span>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </>
                      )}
                    </Listbox>
                  )}
                </Field>
                <ErrorMessage
                  name="country"
                  component={"p"}
                  className="field-error__message"
                />
              </div>
            </div>
            <div className="space-x-2 text-end">
              <button
                type="submit"
                className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300  text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-medium px-2 py-1.5 rounded bg-primary-500 hover:bg-primary-700 text-white text-sm"
              >
                Update
              </button>
            </div>
            <p>{JSON.stringify(values)}</p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
