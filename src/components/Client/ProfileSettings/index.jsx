import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAccounts } from "@/context/AccountContext";

import Spinner from "@/components/Spinner";
import { BiPencil } from "react-icons/bi";
import ComboboxMultiple from "@/components/Comboboxes/ComboboxMultiple";
import ComboSelectBox from "@/components/Comboboxes/ComboSelectBox";
import sampleSkills from "@/json/sample-skills.json";
import { LinkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useServices } from "@/context/ServiceContext";
import ProgressBar from "@/components/ProgressBar";

const scopes = [
  { label: "I am an Individual", value: "individual" },
  { label: "I own a company", value: "company" },
];

const profileSchema = Yup.object({
  bio: Yup.string().trim().required("Bio is required."),
  client_scope: Yup.string().trim().default("individual"),
  industry: Yup.string().trim().required("Industry is required"),
  preferred_skills: Yup.array()
    .of(Yup.string())
    .min(3, "Select at least 3 skills")
    .max(10, "You can select upto 10 skills")
    .required("Select 3 to 10 skills"),
  company_name: Yup.string().test({
    name: "requiredForCompany",
    test: function (value) {
      const clientScope = this.resolve(Yup.ref("client_scope"));
      // If client_scope is 'company', then company_name is required
      return !(clientScope === "company" && !value);
    },
    message: "Company name is required",
  }),
  company_website_link: Yup.string().trim().url("Invalid Url"),
});

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    user,
    loadAccount,
    updateUserInfo,
    updatedUser,
    isLoading: isUpdating,
  } = useAccounts();
  const [industries, setIndustries] = useState([]);
  const { categories, fetchSkills, fetchLanguages } = useServices();

  const originalValues = {
    bio: user?.data.bio || "",
    client_scope: user?.data.client_scope || "",
    industry: user?.data.industry || "",
    preferred_skills: user?.data.preferred_skills || [],
    company_name: user?.data.company_name || "",
    company_website_link: user?.data.company_website_link || "",
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    loadAccount(token);
  }, [updatedUser]);

  useEffect(() => {
    if (categories) {
      const { data } = categories;
      if (Array.isArray(data)) {
        const namesArray = data.map((category) => category.name);
        setIndustries(namesArray);
      }
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      fetchSkills();
      fetchLanguages();
    }
  }, [isEditing]);

  return (
    <div className="relative">
      <Formik
        initialValues={originalValues}
        validationSchema={profileSchema}
        onSubmit={(values) => {
          updateUserInfo(user.data._id, values);
          setIsEditing(false);
        }}
      >
        {({ values, errors, touched, resetForm, setFieldValue }) => (
          <div className="grid grid-cols-3 gap-x-10">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-neutral-700">
                Profile Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Introduce yourself to the people.
              </p>

              <ProgressBar progress={user?.data?.profile_completion || 0} />
            </div>
            <Form className="col-span-2">
              <button
                onClick={toggleIsEditing}
                type="button"
                className="absolute top-0 right-0 rounded-full p-2 bg-neutral-200 hover:bg-primary-400 hover:text-white text-sm font-medium"
              >
                <BiPencil className="w-5 h-5 inline" />
              </button>
              {isEditing ? (
                <div className=" space-y-6 max-w-lg">
                  <div>
                    <label htmlFor="bio" className="font-medium text-sm">
                      Bio
                    </label>
                    <Field
                      className={`form-input resize-none ${
                        errors.bio && touched.bio && "field-error"
                      }`}
                      rows="8"
                      name="bio"
                      id="bio"
                      as="textarea"
                      maxLength="2000"
                      placeholder="Tell us about yourself"
                    />
                    <span className="text-sm float-right">{values.bio.length}/2000</span>
                    <ErrorMessage
                      name="bio"
                      component={"p"}
                      className="field-error__message"
                    />
                  </div>
                  <div>
                    <label className="text-base font-semibold text-neutral-700">
                      Client Scope
                    </label>
                    <fieldset className="mt-2">
                      <legend className="sr-only">Client Scope</legend>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                        {scopes.map((scope) => (
                          <div key={scope.value} className="flex items-center">
                            <Field
                              id={scope.value}
                              name="client_scope"
                              type="radio"
                              value={scope.value}
                              className="h-4 w-4 "
                            />
                            <label
                              htmlFor={scope.value}
                              className="ml-3 block text-sm font-medium leading-6 text-neutral-700"
                            >
                              {scope.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>

                  {values.client_scope === "company" && (
                    <div className="flex gap-4">
                      <div>
                        <label htmlFor="company_name" className="font-medium text-sm">
                          Company Name
                        </label>
                        <Field
                          className={`form-input ${
                            errors.company_name && touched.company_name && "field-error"
                          }`}
                          rows="4"
                          name="company_name"
                          id="company_name"
                          placeholder="e.g. Sand Piper Inc."
                        />
                        <ErrorMessage
                          name="company_name"
                          component={"p"}
                          className="field-error__message"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company_website_link"
                          className="font-medium text-sm"
                        >
                          Company Website (optional)
                        </label>
                        <Field
                          className={`form-input ${
                            errors.company_website_link &&
                            touched.company_website_link &&
                            "field-error"
                          }`}
                          name="company_website_link"
                          id="company_website_link"
                          placeholder="e.g https://www.sandpiper.com"
                        />
                        <ErrorMessage
                          name="company_website_link"
                          component={"p"}
                          className="field-error__message"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-base font-semibold text-neutral-700">
                      Industry
                    </label>
                    <p className="text-sm text-neutral-500">
                      {"Select an industry you're working in"}
                    </p>
                    {industries.length > 0 && (
                      <ComboSelectBox
                        items={industries}
                        defaultItem={values.industry}
                        setValue={(item) => setFieldValue("industry", item)}
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-base font-semibold text-neutral-700">
                      Preferred Skills
                    </label>
                    {isEditing && (
                      <p className="text-sm text-neutral-500">
                        {"Choose skills you're looking for (select 3 to 10 skills)"}
                      </p>
                    )}
                    <Field name="preferred_skills">
                      {({ field }) => (
                        <ComboboxMultiple
                          {...field}
                          items={sampleSkills.skills}
                          setValue={(items) => setFieldValue("preferred_skills", items)}
                          defaultItems={values.preferred_skills}
                          isEditing={isEditing}
                          isDisabled={values.preferred_skills.length >= 10}
                          placeholder="Select Skills"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="preferred_skills"
                      component={"p"}
                      className="field-error__message"
                    />
                  </div>
                </div>
              ) : (
                <ProfileInformation data={values} />
              )}
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
                    disabled={isUpdating}
                    className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                  >
                    {isUpdating ? <Spinner /> : "Update"}
                  </button>
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

function ProfileInformation({ data }) {
  return (
    <div className="mt-6 max-w-2xl border-t border-neutral-100">
      <dl className="divide-y divide-neutral-100">
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Bio</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-3 sm:mt-0 max-h-72 overflow-auto">
            {data.bio}
          </dd>
        </div>
        {data.company_name && (
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-700">Company</dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-3  sm:mt-0">
              {data.company_name}
              {data.company_website_link && (
                <Link href={data.company_website_link} target="_blank">
                  <LinkIcon className="ml-2 w-4 h-4 fill-neutral-400 hover:fill-neutral-600 inline" />
                </Link>
              )}
            </dd>
          </div>
        )}
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Industry</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-3 sm:mt-0">
            {data.industry}
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">
            Preferred Skills
          </dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-3 sm:mt-0">
            <ul className="flex flex-wrap gap-2">
              {data.preferred_skills.map((item) => (
                <li
                  key={item}
                  className={
                    "inline-flex items-center gap-1 text-xs rounded-lg bg-neutral-500 text-white font-medium py-1.5 px-2"
                  }
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}
