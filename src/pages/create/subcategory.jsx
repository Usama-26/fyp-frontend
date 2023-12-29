import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import Spinner from "@/components/Spinner";
import { useServices } from "@/context/ServiceContext";
import WebLayout from "@/layouts/WebLayout";
import { Field, Form, Formik } from "formik";

const rawSkills = [];

export default function AddSubCategory() {
  const { categories, addSubCategory, isLoading, error, successMessage } = useServices();

  const skills = [...new Set(rawSkills)];

  console.log(successMessage);

  return (
    <WebLayout>
      {categories && (
        <Formik
          initialValues={{
            category: categories?.data ? categories.data[0]._id : "",
            name: "",
            punchline: "",
            tags: [...skills],
          }}
          onSubmit={(values) => {
            console.log(values);
            addSubCategory(values);
          }}
        >
          {({ values }) => (
            <Form className="max-w-lg mx-auto space-y-4 my-10">
              {error && (
                <ErrorAlert>
                  <p>{error}</p>
                </ErrorAlert>
              )}

              {successMessage && (
                <SuccessAlert>
                  <p>{successMessage}</p>
                </SuccessAlert>
              )}

              <Field as="select" name="category" className="form-input">
                {categories?.data?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Field>

              <Field name="name" className="form-input" placeholder="Add A Name" />
              <Field
                name="punchline"
                as="textarea"
                className="form-input"
                placeholder="Add A Punchline"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md p-4 bg-primary-400 hover:bg-primary-600 text-white"
              >
                {isLoading ? <Spinner /> : "Add Sub Category"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </WebLayout>
  );
}
