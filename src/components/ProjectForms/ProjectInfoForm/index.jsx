import { useServices } from "@/context/ServiceContext";
import { ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";

export function ProjectInfoForm({ formData }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories: fetchedCategories } = useServices();
  const { values, errors, touched, submitCount, setFieldValue } = formData;

  useEffect(() => {
    if (fetchedCategories) {
      const newCategoriesList = fetchedCategories.data.map((el) => {
        const { _id: value, name: label } = el;
        return {
          value,
          label,
        };
      });
      setCategories(newCategoriesList);
    }
  }, [fetchedCategories]);

  return (
    <>
      <div className="w-11/12 space-y-5">
        <div className="w-full">
          <label htmlFor="title" className="font-medium">
            Project Title
          </label>
          <Field
            className={`form-input ${
              errors.title && touched.title && submitCount > 0 && "field-error"
            }`}
            type="text"
            name="title"
            id="title"
            maxLength={100}
            placeholder="Enter Title"
          />
          <span className="text-sm float-right">{values.title.length}/100</span>

          {errors.title && touched.title && submitCount > 0 ? (
            <ErrorMessage name="title" component={"p"} className="field-error__message" />
          ) : (
            <p className="text-sm italic text-neutral-500">
              {
                "Example: Create a website for my personal portfolio. (20 to 100 character)"
              }
            </p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="description" className="font-medium">
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
            type="description"
            name="description"
            id="description"
            maxLength={2000}
            placeholder="Enter Description"
          />
          <span className="text-sm float-right">{values.description.length}/2000</span>

          {errors.description && touched.description && submitCount > 0 ? (
            <ErrorMessage
              name="description"
              component={"p"}
              className="field-error__message"
            />
          ) : (
            <p className="text-sm italic text-neutral-500">
              {
                "Write a paragraph which explains your project in detail. (100 to 2000 characters)"
              }
            </p>
          )}
        </div>
        <div className="w-full flex gap-4">
          <Field name="category">
            {({ field }) => (
              <div className="w-full">
                <label htmlFor="category" className="font-medium">
                  Select A Category
                </label>
                <Select
                  {...field}
                  options={categories ? categories : null}
                  classNames={"form-input"}
                  value={selectedCategory}
                  placeholder="Select a Category"
                  onChange={(selected) => {
                    setSelectedCategory(selected);
                    setFieldValue("category", selected.value);
                  }}
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="field-error__message"
                />
              </div>
            )}
          </Field>
          <Field name="sub_category">
            {({ field }) => (
              <div className="w-full">
                <label htmlFor="sub_category" className="font-medium">
                  Select A Service
                </label>
                <Select
                  {...field}
                  options={categories ? categories : null}
                  classNames={"form-input"}
                  value={selectedCategory}
                  placeholder="Select a Service"
                  onChange={(selected) => {
                    setSelectedCategory(selected);
                    setFieldValue("sub_category", selected.value);
                  }}
                />
                <ErrorMessage
                  name="sub_category"
                  component="p"
                  className="field-error__message"
                />
              </div>
            )}
          </Field>
        </div>
        <div className="w-full">
          <Field name="service">
            {({ field }) => (
              <div className="w-full">
                <label htmlFor="service" className="font-medium">
                  Be More Specific (optional)
                </label>
                <Select
                  {...field}
                  options={categories ? categories : null}
                  classNames={"form-input"}
                  value={selectedCategory}
                  placeholder="Refine your result (optional)"
                  onChange={(selected) => {
                    setSelectedCategory(selected);
                    setFieldValue("service", selected.value);
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
    </>
  );
}
