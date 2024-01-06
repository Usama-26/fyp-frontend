import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import Spinner from "@/components/Spinner";
import { useServices } from "@/context/ServiceContext";
import WebLayout from "@/layouts/WebLayout";
import { Field, Form, Formik } from "formik";

export default function AddSubCategory() {
  const {
    categories,
    addSubCategory,
    isLoading,
    error,
    successMessage,
    fetchCategories,
    fetchSubCategories,
    fetchServices,
  } = useServices();

  const refresh = () => {
    fetchCategories();
    fetchSubCategories();
    fetchServices();
  };
  return (
    <WebLayout>
      {categories && (
        <Formik
          initialValues={{
            category: categories?.data ? categories.data[0]._id : "",
            name: "",
            punchline: "",
            tags: [],
          }}
          onSubmit={(values) => {
            addSubCategory({ ...values, tags: JSON.parse(values.tags) });
          }}
        >
          {({ values }) => (
            <Form className="max-w-lg mx-auto space-y-4 my-10">
              <button
                onClick={refresh}
                type="button"
                className="px-2 py-1 rounded-md font-medium text-sm text-white bg-primary-500 hover:bg-primary-600"
              >
                {isLoading ? <Spinner /> : "Refresh"}
              </button>
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
              {JSON.stringify(values.category)}
              <Field name="name" className="form-input" placeholder="Add A Name" />
              <Field
                name="punchline"
                as="textarea"
                className="form-input"
                placeholder="Add A Punchline"
              />
              <Field
                name="tags"
                as="textarea"
                className="form-input"
                placeholder="Add Tags Array"
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
