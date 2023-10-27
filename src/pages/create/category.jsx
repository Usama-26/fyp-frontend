import Dropzone from "@/components/Dropzone";
import WebLayout from "@/layouts/WebLayout";
import { Cloudinary } from "@cloudinary/url-gen";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const categorySchema = Yup.object({
  name: Yup.string().trim().required("Category Name Required"),
  punchline: Yup.string().trim().required("Punchline Required"),
  description: Yup.string().trim().max(500).required("Description Required"),
  imageUrl: Yup.string().trim().url().required("Image Required"),
});
export default function AddCategory() {
  const [formData, setFormData] = useState(null);
  const cld = new Cloudinary({ cloud: { cloudName: "dscbgjlw3" } });
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
            imageUrl: "",
          }}
          validationSchema={categorySchema}
          onSubmit={(values) => {
            setFormData(values);
          }}
        >
          {({ values, errors, touched, submitCount }) => (
            <Form className="space-y-4">
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
              <Dropzone />
              <button type="submit" className="form-submit-btn">
                Add
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </WebLayout>
  );
}
