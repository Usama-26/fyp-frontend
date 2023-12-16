import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAccounts } from "@/context/AccountContext";
import { useClient } from "@/context/ClientContext";
import Spinner from "@/components/Spinner";
import { BiPencil } from "react-icons/bi";
import ComboboxMultiple from "@/components/Comboboxes/ComboboxMultiple";
import ComboSelectBox from "@/components/Comboboxes/ComboSelectBox";
import sampleSkills from "@/json/sample-skills.json";
import { LinkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useThirdPartyServices } from "@/context/ThirdPartyContext";

const industries = [
  "Technology and IT",
  "Design and Creative",
  "Writing and Content",
  "Marketing and Advertising",
  "Business and Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Real Estate",
  "Travel and Hospitality",
  "Legal",
  "Manufacturing and Engineering",
  "Consulting",
  "Fashion and Beauty",
  "Energy and Environment",
  "Art and Entertainment",
  "Telecommunications",
  "Nonprofit and Social Services",
  "Food and Beverage",
  "Fitness and Wellness",
];
export default function FreelancerProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    fetchUniversities,
    universities,
    error,
    isLoading: thirdPartyLoading,
  } = useThirdPartyServices();

  const { user, loadAccount } = useAccounts();
  const {
    updateClientInfo,
    updatedUser,
    updateInfoSuccess,
    isLoading: updateLoading,
  } = useClient();

  const originalValues = {
    bio: user?.data.bio || "",
    skills: user?.data.skills || [],
    hourly_rate: user?.data.hourly_rate || 0,
    languages: user?.data.languages || [],
    profile_title: user?.data.profile_title || "",
    industry: user?.data.industry || "",
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    loadAccount(token);
  }, [updatedUser]);

  useEffect(() => {
    fetchUniversities("turkey");
  }, []);

  return (
    <div className="relative">
      <Formik
        initialValues={originalValues}
        validationSchema={Yup.object({
          bio: Yup.string().trim().required("Describe yourself first"),
          profile_title: Yup.string().trim().max(100).required("Enter profile title"),
          industry: Yup.string().trim(),
          skills: Yup.array().required("Select at least one skill tag"),
          languages: Yup.array().of(
            Yup.object({
              name: Yup.string().required("Select a Language"),
              proficiency: Yup.string()
                .required("Proficiency is required")
                .default("Beginner"),
            })
          ),
          hourly_rate: Yup.number().required("Set your hourly rate"),
        })}
        onSubmit={(values) => {
          updateClientInfo(user.data._id, values);
          setIsEditing(false);
        }}
      >
        {({ values, errors, touched, resetForm, setFieldValue }) => (
          <div className="grid grid-cols-3 ">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-neutral-700">
                Profile Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Introduce yourself to the people.
              </p>
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
                <div className=" space-y-4 max-w-lg">
                  <div>
                    <label htmlFor="profile_title" className="font-medium text-sm">
                      Profile Title
                    </label>
                    <Field
                      className={`form-input resize-none ${
                        errors.profile_title && touched.profile_title && "field-error"
                      }`}
                      rows="8"
                      name="profile_title"
                      id="profile_title"
                      maxLength="100"
                      placeholder="e.g. UI | UX Developer"
                    />
                    <span className="text-sm float-right">{values.bio.length}/100</span>
                    <ErrorMessage
                      name="profile_title"
                      component={"p"}
                      className="field-error__message"
                    />
                  </div>
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
                      Industry
                    </label>
                    {isEditing && (
                      <p className="text-sm text-neutral-500">
                        {"Select an industry you're working in"}
                      </p>
                    )}
                    <ComboSelectBox
                      items={industries}
                      defaultItem={values.industry}
                      setValue={(item) => setFieldValue("industry", item)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="skills"
                      className="text-base font-semibold text-neutral-700"
                    >
                      Skills
                    </label>
                    {isEditing && (
                      <p className="text-sm text-neutral-500">
                        {"Select your skills and expertise"}
                      </p>
                    )}
                    <Field name="skills">
                      {({ field }) => (
                        <ComboboxMultiple
                          items={sampleSkills.skills}
                          setValue={(items) => setFieldValue("skills", items)}
                          defaultItems={values.skills}
                          placeholder="Select Skills"
                        />
                      )}
                    </Field>
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
                    disabled={updateLoading}
                    className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                  >
                    {updateLoading ? <Spinner /> : "Update"}
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
    <div className="mt-6 max-w-xl border-t border-neutral-100">
      <dl className="divide-y divide-neutral-100">
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Title</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            Frontend Developer
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Bio</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi suscipit
            adipisci mollitia molestiae hic doloribus reiciendis possimus quasi tenetur,
            esse sed. A odit dicta dolore, commodi ullam similique voluptates enim,
            officia maxime animi eligendi optio totam perspiciatis pariatur. Eaque quam
            quos sed! Hic totam inventore soluta accusamus delectus, architecto maxime.
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Industry</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            Programming & Development
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Skills</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <ul className="flex flex-wrap gap-2">
              <li
                className={
                  "inline-flex items-center gap-1 text-xs rounded-lg bg-neutral-500 text-white font-medium py-1.5 px-2"
                }
              >
                <span>Skill</span>
              </li>
            </ul>
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Languages</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <ul className="divide-y">
              <li
                className={
                  "flex justify-between items-center rounded-sm gap-1 text-sm  bg-neutral-50 text-white py-2 px-2"
                }
              >
                <span className="text-neutral-700 font-medium">English</span>
                <span className="text-neutral-500">Fluent</span>
              </li>
              <li
                className={
                  "flex justify-between items-center rounded-sm gap-1 text-sm  bg-neutral-50 text-white py-4 px-2"
                }
              >
                <span className="text-neutral-700 font-medium">Urdu</span>
                <span className="text-neutral-500">Native</span>
              </li>
              <li
                className={
                  "flex justify-between items-center rounded-sm gap-1 text-sm  bg-neutral-50 text-white py-2 px-2"
                }
              >
                <span className="text-neutral-700 font-medium">Punjabi</span>
                <span className="text-neutral-500">Native</span>
              </li>
            </ul>
          </dd>
        </div>
        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-neutral-700">Hourly Rate</dt>
          <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
            <h5 className="text-neutral-700 font-medium text-2xl mb-2">$25</h5>
          </dd>
        </div>
      </dl>
    </div>
  );
}
