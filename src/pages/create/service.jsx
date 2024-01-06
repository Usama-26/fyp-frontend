import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import Spinner from "@/components/Spinner";
import { useServices } from "@/context/ServiceContext";
import WebLayout from "@/layouts/WebLayout";
import { isEmpty } from "@/utils/generics";
import { Field, Form, Formik } from "formik";

export default function AddService() {
  const {
    categories,
    subCategories,
    addService,
    fetchCategories,
    fetchSubCategories,
    fetchServices,
    isLoading,
    error,
    successMessage,
  } = useServices();

  const refresh = () => {
    fetchCategories();
    fetchSubCategories();
    fetchServices();
  };

  return (
    <WebLayout>
      {categories && !isEmpty(subCategories) && (
        <Formik
          initialValues={{
            category: categories.data[0]._id,
            sub_category: subCategories.data[0]._id,
            name: "",
            tags: [],
          }}
          onSubmit={(values) => {
            addService(values);
          }}
        >
          {({ values }) => (
            <Form className="max-w-lg mx-auto space-y-4 my-10">
              <button
                type="button"
                onClick={refresh}
                className="px-2 py-1 rounded-md text-white font-medium text-sm bg-primary-500 hover:bg-primary-600"
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
                {categories.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              {JSON.stringify(values.category)}

              <Field as="select" name="sub_category" className="form-input">
                {subCategories.data
                  .filter((subcategory) => subcategory.category._id === values.category)
                  .map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
              </Field>
              {JSON.stringify(values.sub_category)}

              <Field name="name" className="form-input" placeholder="Add A Name" />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md p-4 bg-primary-400 hover:bg-primary-600 text-white"
              >
                {isLoading ? <Spinner /> : "Add Service"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </WebLayout>
  );
}
