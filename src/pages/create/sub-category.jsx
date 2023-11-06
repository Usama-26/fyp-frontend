import Dropzone from "@/components/Dropzone";
import { BASE_URL } from "@/constants";
import WebLayout from "@/layouts/WebLayout";
import { postData } from "@/utils/api/genericAPI";
import { uploadImageToCloudinary } from "@/utils/cloudinaryUpload";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const categorySchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  category: Yup.string.require("Select a Category"),
});

export default function AddSubCategory() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const newCategory = await postData(`${BASE_URL}categories/`, values);
      if (newCategory) {
        setMessage("Category Created Successfully. ✅");
        setIsLoading(false);
        setFiles(null);
      }
    } catch (error) {
      if (error) {
        setMessage("Something went wrong ❌. Please Try Again.");
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <WebLayout>
      <div className="max-w-xl mx-auto mb-4">
        <h3 className="text-2xl font-semibold text-center my-4">
          Add Sub Category
        </h3>
        <Formik
          initialValues={{
            name: "",
            category: "",
          }}
          validationSchema={categorySchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm({ values: null });
          }}
        >
          {({ values, errors, touched, submitCount }) => (
            <Form className="space-y-4">
              {message && (
                <p className="bg-primary-200 p-4 rounded-md font-medium">
                  {message}
                </p>
              )}
              <div className="flex md:flex-row flex-col space-between gap-4">
                <div className="w-full">
                  <Field
                    className={`form-input ${
                      errors.name &&
                      touched.name &&
                      submitCount > 0 &&
                      "field-error"
                    }`}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Category Name"
                  />
                  {submitCount > 0 && (
                    <ErrorMessage
                      name="name"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
              </div>
              <button
                disabled={isLoading && true}
                type="submit"
                className={`form-submit-btn disabled:bg-neutral-200 ${
                  isLoading ? "cursor-wait" : "cursor-default"
                } `}
              >
                {isLoading ? "Please Wait" : "Add"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </WebLayout>
  );
}
