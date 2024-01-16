import { Fragment, useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useServices } from "@/context/ServiceContext";
import { classNames, isEmpty } from "@/utils/generics";
import dynamic from "next/dynamic";
import { useGigs } from "@/context/GigContext";
import { useRouter } from "next/router";
import ComboboxMultiple from "@/components/Comboboxes/ComboboxMultiple";
import Spinner from "@/components/Spinner";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditOverview({ step, gigData }) {
  const { categories, subCategories, services } = useServices();
  const { updateGigOverview, isLoading, gig } = useGigs();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const router = useRouter();

  const overviewSchema = Yup.object({
    title: Yup.string().max(100).required("Enter a title"),
    description: Yup.string().min(200).max(2000).required("Enter a description"),
    category: Yup.string().required("Select a Category"),
    sub_category: Yup.string().required("Select a Main Service"),
    service: Yup.string().required("Select a Specific Service"),
    tags: Yup.array().min(3).required("Select atleast 3 keywords"),
  });

  useEffect(() => {
    if (categories) {
      const result = categories.data.filter(
        (category) => category._id === gigData.category
      );
      setSelectedCategory(result[0]);
    }
    if (subCategories) {
      const result = subCategories.data.filter(
        (subcategory) => subcategory._id === gigData.sub_category
      );
      setSelectedSubCategory(result[0]);
    }
    if (services) {
      const result = services.data.filter((service) => service._id === gigData.service);
      setSelectedService(result[0]);
    }
  }, [categories, , subCategories, services, gigData]);

  return (
    <div className="mt-4 p-4 rounded-md shadow-custom-md shadow-neutral-300 min-h-[24rem]">
      <div className="grid grid-cols-3">
        <div>STEP 1: OVERVIEW</div>
        <div className="col-span-2 max-w-lg">
          {selectedCategory && selectedSubCategory && selectedService && (
            <Formik
              initialValues={{
                title: gigData.title || "",
                description: gigData.description || "",
                category: gigData.category || "",
                sub_category: gigData.sub_category || "",
                service: gigData.service || "",
                tags: gigData.tags || [],
              }}
              validationSchema={overviewSchema}
              onSubmit={(values) => {
                step.status = "complete";
                updateGigOverview(gigData._id, values);
              }}
            >
              {({ values, errors, touched, submitCount, setFieldValue }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block mb-2 font-medium">
                      Gig Title
                    </label>
                    <Field
                      name="title"
                      id="title"
                      type="text"
                      maxLength={100}
                      placeholder="Enter Title"
                      className={`form-input ${
                        errors.profile_title && touched.profile_title && "field-error"
                      }`}
                    />
                    <span className="text-sm italic float-right">
                      {values.title.length}/100
                    </span>
                    {errors.title && touched.title && submitCount > 0 && (
                      <ErrorMessage
                        name="title"
                        component={"p"}
                        className="field-error__message"
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="description" className="block mb-2 font-medium">
                      Gig Description
                    </label>
                    <ReactQuill
                      value={values.description}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                            "code-block",
                            "link",
                          ],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ indent: "-1" }, { indent: "+1" }],
                        ],
                      }}
                      placeholder="Write details about your gig"
                      className="rounded-md border-neutral-500 p-0.5 border"
                      onChange={(value) => setFieldValue("description", value)}
                      theme="snow"
                    />
                    <span className="text-sm italic float-right">
                      {values.description.length}/2000
                    </span>
                    {errors.description && touched.description && submitCount > 0 && (
                      <ErrorMessage
                        name="description"
                        component={"p"}
                        className="field-error__message"
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="category" className="block mb-2 font-medium">
                      Category
                    </label>
                    {selectedCategory && categories && (
                      <SelectBox
                        defaultItem={selectedCategory}
                        onSelect={(item) => {
                          setFieldValue("category", item._id);
                          setFieldValue("sub_category", item.sub_categories[0]._id);
                          setSelectedCategory(item);
                          setSelectedSubCategory(item.sub_categories[0]);
                        }}
                        placeholder={"Select A Category"}
                        items={categories.data}
                      />
                    )}

                    {errors.category && touched.category && submitCount > 0 && (
                      <ErrorMessage
                        name="category"
                        component={"p"}
                        className="field-error__message"
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="sub_category" className="block mb-2 font-medium">
                      Main Service
                    </label>
                    {selectedSubCategory && subCategories && (
                      <SelectBox
                        defaultItem={selectedSubCategory}
                        onSelect={(item) => {
                          setFieldValue("sub_category", item._id);
                          setFieldValue("service", item.services[0]._id);
                          setSelectedSubCategory(item);
                          setSelectedService(item.services[0]._id);
                        }}
                        placeholder={"Select A Sub Category"}
                        items={selectedCategory.sub_categories}
                      />
                    )}

                    {errors.sub_category && touched.sub_category && submitCount > 0 && (
                      <ErrorMessage
                        name="sub_category"
                        component={"p"}
                        className="field-error__message"
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="service" className="block mb-2 font-medium">
                      Sub Service
                    </label>
                    {selectedService && services && (
                      <SelectBox
                        defaultItem={selectedService}
                        onSelect={(item) => {
                          setFieldValue("service", item._id);
                          setSelectedService(item);
                        }}
                        placeholder={"Select A Service"}
                        items={selectedSubCategory.services}
                      />
                    )}

                    {errors.service && touched.service && submitCount > 0 && (
                      <ErrorMessage
                        name="service"
                        component={"p"}
                        className="field-error__message"
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="tags" className="block mb-2 font-medium">
                      Keywords
                    </label>
                    {selectedSubCategory && (
                      <ComboboxMultiple
                        items={selectedSubCategory.tags}
                        defaultItems={values.tags}
                        placeholder={"Select Tags"}
                        isEditing={true}
                        setValue={(items) => setFieldValue("tags", items)}
                      />
                    )}
                    {errors.service && touched.service && submitCount > 0 && (
                      <ErrorMessage
                        name="tags"
                        component={"p"}
                        className="field-error__message"
                      />
                    )}
                  </div>

                  <div className="space-x-2 text-end">
                    <button
                      type="button"
                      onClick={() => {
                        router.back();
                      }}
                      className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300  text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                    >
                      {isLoading ? <Spinner /> : "Update"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

function SelectBox({ items, onSelect, defaultItem, isMultiple, placeholder }) {
  const [selected, setSelected] = useState(defaultItem || null);
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox
      value={selected}
      multiple={isMultiple}
      onChange={(item) => {
        setSelected(item);
        onSelect(item);
      }}
    >
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md form-input bg-white py-1.5 pl-3 pr-10 disabled:text-neutral-500 disabled:border-neutral-300 text-neutral-700 shadow-sm sm:text-sm sm:leading-6 outline-none"
          displayValue={(item) => item?.name}
          placeholder={placeholder}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute w-full z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems.map((item, index) => (
              <Combobox.Option
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
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
