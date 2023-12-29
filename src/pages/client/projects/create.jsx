import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import Head from "next/head";
import * as Yup from "yup";
import WebLayout from "@/layouts/WebLayout";
import withRouteProtect from "@/helpers/withRouteProtect";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useProjects } from "@/context/ProjectContext";
import FileDropzone from "@/components/FIleDropzone";
import { useServices } from "@/context/ServiceContext";
import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowDownTrayIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  PaperClipIcon,
} from "@heroicons/react/20/solid";
import { classNames, isEmpty } from "@/utils/generics";
import sampleSkills from "@/json/sample-skills";
import ComboboxMultiple from "@/components/Comboboxes/ComboboxMultiple";
import axios from "axios";
import { BsChevronDown } from "react-icons/bs";
import Datepicker from "react-tailwindcss-datepicker";
import { BiFile } from "react-icons/bi";
import { SiPayloadcms } from "react-icons/si";
import Spinner from "@/components/Spinner";

const projectSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(20, "Title should be of atleast 20 characters")
    .max(100, "Title can't exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .trim()
    .min(50, "Write a more clear description of atleast 50 characters long")
    .max(2000, "Description can't exceed 2000 characters")
    .required("Add project description"),
  category: Yup.string().trim().required("Please Select A Category"),
  service: Yup.string().trim().required("Please Select An Option"),
  pricing_type: Yup.string().trim().required("Choose a pricing type"),
  deadline: Yup.date().required("Set Project Deadline"),
  tags: Yup.array()
    .min(3, "Select atleast 3 skills")
    .max(10, "You can only choose upto 5 skills")
    .of(Yup.string()),
  budget: Yup.number()
    .min(10, "Select a minimum budget of 10 $")
    .max(1000, "Maximum budget can be 1000 $")
    .required("Please enter your budget"),
  attachments: Yup.array(),
});

const pricingTypes = [
  {
    value: "fixed",
    label: "Fixed Budget",
  },
  {
    value: "hourly",
    label: "Hourly Rate",
  },
];

function CreateProject() {
  const [inEthereum, setInEthereum] = useState(0);
  const [formStep, setFormStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const [selectedService, setSelectedService] = useState({});
  const [deliveryDate, setDeliveryDate] = useState({});
  const [selectedPricingType, setSelectedPricingType] = useState(pricingTypes[0]);
  const { categories } = useServices();
  const { postProject, isLoading: isPosting } = useProjects();
  const router = useRouter();

  const projectInitialValues = {
    title: "",
    description: "",
    category: "",
    sub_category: "",
    service: "",
    scope: "small",
    tags: [],
    pricing_type: "fixed",
    budget: 0,
    deadline: "",
    attachments: [],
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [formStep]);
  return (
    <>
      <Head>
        <title>Post a Project | ChainWork</title>
      </Head>
      <WebLayout>
        <section>
          <div className="max-w-7xl mx-auto m-4 rounded-md">
            <Formik
              initialValues={projectInitialValues}
              validationSchema={projectSchema}
              onSubmit={(values) => {
                postProject(values);
              }}
            >
              {({ values, errors, touched, isValid, setFieldValue, submitCount }) => (
                <Form encType="multipart/form-data">
                  {formStep === 0 ? (
                    <div className="rounded-md shadow-custom-md shadow-neutral-300 divide-y ">
                      {/* Basic Info Section */}
                      <div className="flex justify-between p-8">
                        <SectionInfo
                          heading={"Let's begin with filling up basic information"}
                          description={"Tell us what you got in your mind"}
                        />
                        <div className="basis-6/12 space-y-5">
                          <div className="w-full">
                            <label htmlFor="title" className="block font-medium">
                              Project Title
                            </label>
                            <Field
                              className={`form-input ${
                                errors.title &&
                                touched.title &&
                                submitCount > 0 &&
                                "field-error"
                              }`}
                              type="text"
                              name="title"
                              id="title"
                              maxLength={100}
                              placeholder="Enter Project Title"
                            />
                            <span className="text-sm float-right">
                              {values.title.length}/100
                            </span>

                            {errors.title && touched.title && submitCount > 0 ? (
                              <ErrorMessage
                                name="title"
                                component={"p"}
                                className="field-error__message"
                              />
                            ) : (
                              <p className="text-sm italic text-neutral-500">
                                {
                                  "Example: Create a website for my personal portfolio. (20 to 100 character)"
                                }
                              </p>
                            )}
                          </div>
                          <div className="w-full">
                            <label htmlFor="description" className="block font-medium">
                              Project Description
                            </label>
                            <Field
                              as="textarea"
                              rows="5"
                              className={`form-input resize-none ${
                                errors.description &&
                                touched.description &&
                                submitCount > 0 &&
                                "field-error"
                              }`}
                              name="description"
                              id="description"
                              maxLength={2000}
                              placeholder="Enter Description"
                            />

                            <span className="text-sm float-right">
                              {values.description.length}/2000
                            </span>

                            {errors.description &&
                            touched.description &&
                            submitCount > 0 ? (
                              <ErrorMessage
                                name="description"
                                component={"p"}
                                className="field-error__message"
                              />
                            ) : (
                              <p className="text-sm italic text-neutral-500">
                                {
                                  "Write a paragraph which explains your project in detail. (50 to 2000 characters)"
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Skills Section */}
                      <div className="flex justify-between p-8">
                        <SectionInfo
                          heading={"Choose Category and required skills"}
                          description={
                            "Choose from the available categories and select what skills are required for this project."
                          }
                        />
                        <div className="basis-6/12 space-y-5">
                          <div className="flex gap-4">
                            <div className="w-full">
                              <label htmlFor="category" className="block font-medium">
                                Select a Category
                              </label>
                              <Field name="category">
                                {({ field }) => (
                                  <>
                                    <SelectMenu
                                      {...field}
                                      items={categories?.data}
                                      selected={selectedCategory}
                                      handleChange={(category) => {
                                        setSelectedCategory(category);
                                        setFieldValue("category", category._id);
                                      }}
                                    />
                                  </>
                                )}
                              </Field>
                            </div>
                            <div className="w-full">
                              <label htmlFor="sub_category" className="block font-medium">
                                Select a Service
                              </label>
                              <Field name="sub_category">
                                {({ field }) => (
                                  <>
                                    <SelectMenu
                                      {...field}
                                      items={selectedCategory?.sub_categories}
                                      isDisabled={isEmpty(selectedCategory)}
                                      selected={selectedSubCategory}
                                      handleChange={(subCategory) => {
                                        setSelectedSubCategory(subCategory);
                                        setFieldValue("sub_category", subCategory._id);
                                      }}
                                    />
                                  </>
                                )}
                              </Field>
                            </div>
                          </div>
                          <div className="w-full">
                            <label htmlFor="service" className="block font-medium">
                              Select A More Specific Service
                            </label>
                            <Field name="service">
                              {({ field }) => (
                                <>
                                  <SelectMenu
                                    {...field}
                                    items={selectedSubCategory?.services}
                                    isDisabled={isEmpty(selectedSubCategory)}
                                    selected={selectedService}
                                    handleChange={(service) => {
                                      setSelectedService(service);
                                      setFieldValue("service", service._id);
                                    }}
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                          <div className="w-full">
                            <label htmlFor="tags" className="block font-medium">
                              Choose Required Skills
                            </label>
                            <Field name="tags">
                              {({ field }) => (
                                <>
                                  <ComboboxMultiple
                                    {...field}
                                    items={
                                      selectedSubCategory?.tags || sampleSkills.skills
                                    }
                                    placeholder={"Choose Skills"}
                                    isEditing={true}
                                    isDisabled={
                                      isEmpty(selectedSubCategory) ||
                                      values.tags.length >= 10
                                    }
                                    defaultItems={values.tags}
                                    setValue={(skills) => {
                                      setFieldValue("tags", skills);
                                    }}
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>
                      {/* Attachments */}
                      <div className="flex justify-between p-8">
                        <SectionInfo
                          heading={"Attach Your Files"}
                          description={
                            "Send you attachments, if they can further describe your work"
                          }
                        />
                        <div className="basis-6/12">
                          <label htmlFor="attachments" className="font-medium mb-2 block">
                            Attachments
                          </label>
                          <FileDropzone
                            files={values.attachments}
                            setFiles={
                              (attachments) => setFieldValue("attachments", attachments)
                              // setAttachments(attachments)
                            }
                          />
                        </div>
                      </div>
                      {/* Budget and Delivery Date */}
                      <div className="flex justify-between p-8">
                        <SectionInfo
                          heading={"Time to set your Budget and Deadline"}
                          description={
                            "Tell us about your budget and your expected delivery date."
                          }
                        />

                        <div className="basis-6/12">
                          <ProjectPricingForm
                            formikData={{
                              values,
                              touched,
                              errors,
                              submitCount,
                              setFieldValue,
                            }}
                            inEthereum={inEthereum}
                            setInEthereum={setInEthereum}
                            setDeliveryDate={setDeliveryDate}
                            deliveryDate={deliveryDate}
                            selectedPricingType={selectedPricingType}
                            setSelectedPricingType={setSelectedPricingType}
                            pricingTypes={pricingTypes}
                          />
                        </div>
                      </div>

                      {/* Form Submission */}
                      <div className="px-8 py-4 border-t text-end">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => router.push("/client/projects")}
                            type="button"
                            className="px-4 py-2 rounded-md border hover:bg-neutral-200 disabled:bg-neutral-400 font-medium  inline-flex gap-2 items-center text-sm"
                          >
                            <span>Cancel</span>
                          </button>
                          <button
                            onClick={() => setFormStep(1)}
                            disabled={!isValid || !Object.keys(touched).length}
                            className=" mr-12 px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium  inline-flex gap-2 items-center text-sm"
                          >
                            <span>Continue</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ReviewForm
                      formData={{
                        ...values,
                        category: selectedCategory.name,
                        sub_category: selectedSubCategory.name,
                        service: selectedService.name,
                      }}
                      onFormStep={setFormStep}
                      isPosting={isPosting}
                    />
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </WebLayout>
    </>
  );
}

function SectionInfo({ heading, description }) {
  return (
    <div className="basis-5/12">
      <h1 className="text-2xl font-display text-primary-700 capitalize">{heading}</h1>
      <h4>{description}</h4>
    </div>
  );
}

function SelectMenu({ items, selected, handleChange, isDisabled, placeholder }) {
  return (
    <Listbox disabled={isDisabled} value={selected} onChange={handleChange}>
      <div className="relative mt-1">
        <Listbox.Button className="w-full rounded-md form-input bg-white py-1.5 pl-3 pr-10 disabled:text-neutral-500 text-left disabled:border-neutral-300 text-neutral-700 shadow-sm sm:text-sm sm:leading-6 outline-none">
          <span className="block truncate ">
            {!isEmpty(selected) ? selected.name : placeholder ? placeholder : "Select"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {items &&
              items.map((item, index) => (
                <Listbox.Option
                  key={index}
                  value={item}
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
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

function ProjectPricingForm({
  formikData,
  inEthereum,
  setInEthereum,
  deliveryDate,
  setDeliveryDate,
  selectedPricingType,
  setSelectedPricingType,
  pricingTypes,
}) {
  const { values, errors, touched, submitCount, setFieldValue } = formikData;
  const [apiError, setApiError] = useState("");

  const fetchCurrencyRate = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      setInEthereum(response.data.ethereum.usd);
    } catch (error) {
      setApiError("Can't fetch ethereum");
    }
  };

  useEffect(() => {
    fetchCurrencyRate();
  }, []);

  return (
    <>
      <div className="w-11/12 flex justify-between">
        <div className="basis-6/12 space-y-5">
          <div className="inline-block relative">
            <label htmlFor="pricing_type" className="block font-medium mb-2">
              Choose A Pricing Type
            </label>
            <Field name="pricing_type" id="pricing_type">
              {({ field }) => (
                <Listbox
                  {...field}
                  value={selectedPricingType}
                  onChange={(value) => {
                    setFieldValue("pricing_type", value.value);
                    setSelectedPricingType(value);
                  }}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Button
                        className={`w-32 p-2 rounded-md border text-left  focus:ring-2 focus:border-primary-500 ${
                          open ? "border-primary-500 ring-2" : "border-neutral-500"
                        } font-medium placeholder:text-neutral-400 outline-none text-sm capitalize`}
                      >
                        <span className="w-full justify-between flex items-center gap-2">
                          {selectedPricingType.label}
                          <span>
                            {
                              <BsChevronDown
                                className={`stroke-1 transition-transform ${
                                  open ? "rotate-180" : "rotate-0"
                                }`}
                              />
                            }
                          </span>
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className={
                            "w-full rounded-md shadow-custom-md shadow-neutral-300 mt-2 absolute bg-white divide-y"
                          }
                        >
                          {pricingTypes.map(({ value, label }, index) => (
                            <Listbox.Option
                              key={index}
                              value={{ value, label }}
                              className={
                                " text-sm cursor-pointer hover:bg-primary-100 p-2 capitalize"
                              }
                            >
                              <span>{label}</span>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </>
                  )}
                </Listbox>
              )}
            </Field>
          </div>
          <div className="w-full">
            <label htmlFor="budget" className="font-medium mb-2 block">
              Project Budget
            </label>

            <Field
              name="budget"
              type="number"
              id="budget"
              min={10}
              max={1000}
              className=" w-32 p-2 border border-neutral-500 rounded-md text-left  focus:ring-2 focus:border-primary-500 font-medium placeholder:text-neutral-400 outline-none text-sm capitalize"
            />
            <span className="ml-2 text-lg font-medium">
              {values.pricing_type === "hourly" ? "$/hr" : "$"}
            </span>
            {errors.budget && touched.budget && submitCount > 0 ? (
              <ErrorMessage
                name="budget"
                component={"p"}
                className="field-error__message"
              />
            ) : (
              <p className="text-sm italic text-neutral-500">
                Enter your budget between $10 to $1000
              </p>
            )}
            {apiError && <h6 className="text-neutral-500 text-xs">{apiError}</h6>}
            <h4 className="font-medium">
              {(inEthereum && parseFloat((values.budget / inEthereum).toFixed(4))) || 0}{" "}
              ETH
            </h4>
          </div>
        </div>
        <div className="basis-6/12">
          <label htmlFor="delivery_date" className="block mb-2 font-medium">
            Set A Delivery Date
          </label>

          <Field name="deadline">
            {({ field }) => (
              <Datepicker
                {...field}
                primaryColor="indigo"
                asSingle={true}
                useRange={false}
                value={deliveryDate}
                minDate={new Date()}
                displayFormat="MM/DD/YYYY"
                inputClassName="w-full p-2 border border-neutral-500 rounded-md focus:ring-2 focus:border-primary-500 bg-white text-neutral-700 placeholder:font-medium outline-none"
                onChange={(date) => {
                  setDeliveryDate(date);
                  setFieldValue("deadline", date.endDate);
                }}
              />
            )}
          </Field>
          {errors.deadline && submitCount > 0 && (
            <ErrorMessage
              name="deadline"
              component={"p"}
              className="field-error__message"
            />
          )}
        </div>
      </div>
    </>
  );
}

function ReviewForm({ formData, onFormStep, isPosting }) {
  return (
    <div className=" rounded-md shadow-custom-md grid grid-cols-4 shadow-neutral-300 p-8">
      <div className="px-4 sm:px-0 flex justify-between col-span-1">
        <h3 className="text-base font-semibold leading-7 text-neutral-700">
          Review your Project
        </h3>
      </div>

      <div className="mt-6 border-t border-neutral-100 col-span-3">
        <dl className="divide-y divide-neutral-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-700">
              Project Title
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {formData.title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-700">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {formData.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-700">Category</dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {formData.category}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-700">Service</dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              {formData.sub_category}{" "}
              <ChevronRightIcon className="h-6 w-6 inline-block align-bottom" />{" "}
              {formData.service}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-700">Budget</dt>
            <dd className="mt-1 text-sm leading-6 font-medium text-neutral-700 sm:col-span-2 capitalize sm:mt-0">
              ${formData.budget}{" "}
              <span className="inline-block px-1 bg-neutral-300 rounded-md font-medium">
                {formData.pricing_type}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-700">
              Required Skills
            </dt>
            <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
              <ul className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <li
                    key={tag}
                    className={
                      "inline-flex items-center gap-1 text-xs rounded-lg bg-neutral-500 text-white font-medium py-1.5 px-2"
                    }
                  >
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-neutral-700">
              Attachments
            </dt>
            <dd className="mt-2 text-sm text-neutral-700 sm:col-span-2 sm:mt-0">
              {formData.attachments.length > 0 ? (
                <ul
                  role="list"
                  className="divide-y divide-neutral-100 rounded-md border border-neutral-200"
                >
                  {formData.attachments.map((file) => (
                    <li
                      key={file.path}
                      className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                    >
                      <div
                        key={file.name}
                        className="bg-neutral-200 m-2 rounded-md inline-flex items-center p-1  text-xs"
                      >
                        <BiFile className="w-5 h-5" />
                        <p className=" p-2">{file.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No Attachments</p>
              )}
            </dd>
          </div>
          <div className="px-8 py-4 border-t text-end">
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onFormStep(0)}
                type="button"
                className="px-4 py-2 rounded-md border hover:bg-neutral-200 disabled:bg-neutral-400 font-medium  inline-flex gap-2 items-center text-sm"
              >
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isPosting}
                className=" mr-12 px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium  inline-flex gap-2 items-center text-sm"
              >
                {isPosting ? <Spinner /> : <span>Post Project</span>}
              </button>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}
export default withRouteProtect(CreateProject, ["client"]);
