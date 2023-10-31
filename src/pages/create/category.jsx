import Dropzone from "@/components/Dropzone";
import WebLayout from "@/layouts/WebLayout";
import { postData } from "@/utils/api/genericAPI";
import { uploadImageToCloudinary } from "@/utils/cloudinaryUpload";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const categorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  punchline: Yup.string().required("Punchline is required"),
});

export default function AddCategory() {
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    if (!files) return;

    setIsLoading(true);

    const response = await uploadImageToCloudinary(files[0]);

    if (response.status !== 200) {
      setMessage("Something went wrong ❌. Please Try Again.");
      setIsLoading(false);
      return;
    }
    try {
      const newCategory = await postData(
        "https://fyp-backend.up.railway.app/api/v1/categories/",
        { ...values, imgUrl: response.data.secure_url }
      );
      if (newCategory) {
        setMessage("Category Created Successfully. ✅");
        setIsLoading(false);
      }
    } catch (error) {
      if (error) {
        setMessage("Something went wrong ❌. Please Try Again.");
        setIsLoading(false);
      }
    }
  };

  return (
    <WebLayout>
      <div className="max-w-xl mx-auto mb-4">
        <h3 className="text-2xl font-semibold text-center my-4">
          Add Category
        </h3>
        <Formik
          initialValues={{
            name: "",
            punchline: "",
            description: "",
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
                <div className="w-full">
                  <Field
                    className={`form-input ${
                      errors.punchline &&
                      touched.punchline &&
                      submitCount > 0 &&
                      "field-error"
                    }`}
                    type="text"
                    name="punchline"
                    id="punchline"
                    placeholder="Punchline"
                  />
                  {submitCount > 0 && (
                    <ErrorMessage
                      name="punchline"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
              </div>
              <div>
                <Field
                  as="textarea"
                  rows="5"
                  className={`form-input resize-none ${
                    errors.description && touched.description && "field-error"
                  }`}
                  type="description"
                  name="description"
                  id="description"
                  maxLength={500}
                  placeholder="Description (500 words) max"
                />
                <span className="text-xs float-right">
                  {values.description.length}/500
                </span>
                {submitCount > 0 && (
                  <ErrorMessage
                    name="description"
                    component={"p"}
                    className="field-error__message"
                  />
                )}
              </div>

              <Dropzone
                error={submitCount > 0 && !files}
                files={files}
                setFiles={setFiles}
              />
              {submitCount > 0 && !files && (
                <p className="field-error__message">Select Image First</p>
              )}

              <button
                disabled={isLoading && true}
                type="submit"
                className="form-submit-btn disabled:bg-neutral-200 cursor-wait"
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
