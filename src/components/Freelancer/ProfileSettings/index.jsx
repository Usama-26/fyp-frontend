import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useAccounts } from "@/context/AccountContext";
import Spinner from "@/components/Spinner";
import { BiPencil } from "react-icons/bi";
import ComboSelectBox from "@/components/Comboboxes/ComboSelectBox";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useServices } from "@/context/ServiceContext";
import { Combobox } from "@headlessui/react";
import { classNames } from "@/utils/generics";
import { HiX } from "react-icons/hi";

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

const languageProficiencies = ["Fluent", "Native", "Conversational"];
export default function FreelancerProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddLangOpen, setIsAddLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "",
    proficiency: languageProficiencies[0],
  });
  const {
    user,
    loadAccount,
    updatedUser,
    isLoading: isUpdating,
    updateUserInfo,
  } = useAccounts();
  const { skills, languages, fetchSkills, fetchLanguages } = useServices();
  const originalValues = {
    bio: user?.data.bio || "",
    skills: user?.data.skills || [],
    hourly_rate: user?.data.hourly_rate || 0,
    languages: user?.data.languages || [],
    profile_title: user?.data.profile_title || "",
    industry: user?.data.industry || "",
    languages: user?.data.languages || "",
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const resetSelectedLanguage = () => {
    setSelectedLanguage({ language: "", proficiency: "" });
    setIsAddLangOpen(false);
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    loadAccount(token);
  }, [updatedUser]);

  useEffect(() => {
    fetchLanguages();
    fetchSkills();
  }, [isEditing]);

  return (
    <div className="relative">
      <Formik
        initialValues={originalValues}
        validationSchema={Yup.object({
          bio: Yup.string().trim().required("Describe yourself first"),
          profile_title: Yup.string().trim().max(100).required("Enter profile title"),
          industry: Yup.string().trim(),
          skills: Yup.array().required("Select at least one skill tag"),
          languages: Yup.array()
            .of(
              Yup.object({
                name: Yup.string().required("Select a Language"),
                proficiency: Yup.string()
                  .required("Proficiency is required")
                  .default("Fluent"),
              })
            )
            .min(1, "Select at least one language"),
          hourly_rate: Yup.number().required("Set your hourly rate"),
        })}
        onSubmit={(values) => {
          updateUserInfo(user.data._id, values);
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
                  {/* Add Languages */}
                  <div>
                    <label className="text-base font-semibold text-neutral-700">
                      Languages
                    </label>
                    {isEditing && (
                      <p className="text-sm text-neutral-500">
                        {"Select the languages you can speak"}
                      </p>
                    )}
                    <div>
                      {isAddLangOpen && (
                        <>
                          {" "}
                          <div className="flex items-center gap-4">
                            {languages && (
                              <div className="w-full">
                                <LanguageSelectBox
                                  items={languages.data}
                                  setValue={(item) => {
                                    setSelectedLanguage(
                                      (prev) => (prev = { ...prev, name: item })
                                    );
                                  }}
                                  placeholder={"Select a Language"}
                                />
                              </div>
                            )}
                            <div>
                              <ComboSelectBox
                                items={languageProficiencies}
                                defaultItem={languageProficiencies[0]}
                                setValue={(item) => {
                                  setSelectedLanguage(
                                    (prev) => (prev = { ...prev, proficiency: item })
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-x-2 text-end mt-2">
                            <button
                              onClick={resetSelectedLanguage}
                              type="button"
                              className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300  text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setFieldValue("languages", [
                                  ...values.languages,
                                  selectedLanguage,
                                ]);
                                resetSelectedLanguage();
                                setIsAddLangOpen(false);
                              }}
                              disabled={
                                !selectedLanguage.name || !selectedLanguage.proficiency
                              }
                              className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                            >
                              Add Language
                            </button>
                          </div>
                        </>
                      )}
                      <ErrorMessage
                        name="languages"
                        component={"p"}
                        className="field-error__message"
                      />
                      <ul className=" space-y-2 mt-2">
                        {values.languages.map((language) => (
                          <li
                            key={language.name}
                            className={
                              "relative group flex justify-between items-center rounded-sm gap-1 text-sm  bg-neutral-100 text-white p-2"
                            }
                          >
                            <span className="text-neutral-700 font-medium">
                              {language.name}
                            </span>
                            <span className="text-neutral-500">
                              {language.proficiency}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setFieldValue(
                                  "languages",
                                  values.languages.filter(
                                    (lang) => lang.name != language.name
                                  )
                                )
                              }
                              className="right-0 hidden group-hover:inline-block absolute p-2 bg-danger-300 "
                            >
                              <HiX className="w-4 h-4 fill-danger-700" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      {!isAddLangOpen && (
                        <div className="text-end mt-2">
                          <button
                            type="button"
                            onClick={() => setIsAddLangOpen(true)}
                            className="text-sm hover:underline font-medium text-primary-500"
                          >
                            Add New Language
                          </button>
                        </div>
                      )}
                    </div>
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
                    {skills && <Field name="skills"></Field>}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="w-full">
                      <label
                        htmlFor="hourly_rate"
                        className="text-base font-semibold text-neutral-700"
                      >
                        Hourly Rate
                      </label>

                      <p className="text-sm text-neutral-500">
                        {"Set Your Hourly Rate (Minimum: 10)"}
                      </p>
                    </div>
                    <Field
                      name="hourly_rate"
                      type="number"
                      className="form-input w-2/12"
                      min={10}
                    />{" "}
                    <span className="font-medium ml-1">$</span>
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

function LanguageSelectBox({ items, isDisabled, defaultItem, setValue, placeholder }) {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(defaultItem || null);

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={(item) => {
        setSelectedItem(item);
        setValue(item);
      }}
      disabled={isDisabled}
    >
      {/* <Combobox.Label className="block text-sm font-medium leading-6 text-neutral-700">
        Assigned to
      </Combobox.Label> */}
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md form-input bg-white py-1.5 pl-3 pr-10 disabled:text-neutral-500 disabled:border-neutral-300 text-neutral-700 shadow-sm sm:text-sm sm:leading-6 outline-none"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.map((item, index) => (
              <Combobox.Option
                key={index}
                value={item.name}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-8 pr-4",
                    active ? "bg-primary-500 text-white" : "text-neutral-700"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {item.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-1.5",
                          active ? "text-white" : "text-primary-500"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
