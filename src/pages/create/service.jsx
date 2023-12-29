import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import Spinner from "@/components/Spinner";
import { useServices } from "@/context/ServiceContext";
import WebLayout from "@/layouts/WebLayout";
import { isEmpty } from "@/utils/generics";
import { Field, Form, Formik } from "formik";

const rawSkills = [];

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

  const skills = [...new Set(rawSkills)];

  console.log(successMessage);

  const refresh = () => {
    fetchCategories();
    fetchSubCategories();
    fetchServices();
  };

  return (
    <WebLayout>
      <button onClick={refresh}>Refresh</button>
      {categories && !isEmpty(subCategories) && (
        <Formik
          initialValues={{
            category: categories.data[0]._id,
            sub_category: subCategories.data[0]._id,
            name: "",
            tags: [...skills],
          }}
          onSubmit={(values) => {
            console.log(values);
            addService(values);
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
              {JSON.stringify(values)}
              <Field as="select" name="category" className="form-input">
                {categories.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Field>

              <Field as="select" name="sub_category" className="form-input">
                {subCategories.data
                  .filter((subcategory) => subcategory.category._id === values.category)
                  .map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
              </Field>

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
