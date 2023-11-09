import { ProjectInfoForm } from "@/components/ProjectForms/ProjectInfoForm";
import { ProjectPricingForm } from "@/components/ProjectForms/ProjectPricingForm";
import { ProjectScopeForm } from "@/components/ProjectForms/ProjectScopeForm";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import { Formik } from "formik";
import Head from "next/head";
import * as Yup from "yup";

const projectSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(20, "Title should be of atleast 20 characters")
    .max(100, "Title can't exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .trim()
    .min(100, "Write a more clear description of atleast 100 characters long")
    .max(2000, "Description can't exceed 2000 characters")
    .required("Add project description"),
  category: Yup.string().trim().required("Please Select A Category"),
  sub_category: Yup.string().trim().required("Please Select A Service"),
  service: Yup.string().trim(),
  pricing_type: Yup.string().trim().required("Choose a pricing type"),
  deadline: Yup.date().required("Set Project Deadline"),
  budget: Yup.number()
    .min(10, "Select a minimum budget of 10 $")
    .max(1000, "Maximum budget can be 1000 $")
    .required("Please enter your budget"),
  skills_level: Yup.string().trim().required("Choose a pricing type").default("basic"),
  scope: Yup.string().trim().required("Set project scope").default("small"),
});

const projectInitialValues = {
  title: "",
  description: "",
  category: "",
  sub_category: "",
  service: "",
  scope: "small",
  skills_level: "beginner",
  pricing_type: "fixed",
  budget: 0,
  deadline: new Date(),
};
function CreateProject() {
  return (
    <>
      <Head>
        <title>Post a Project | ChainWork</title>
      </Head>
      <WebLayout>
        <section>
          <div className="max-w-7xl mx-auto m-4 rounded-md">
            <Formik initialValues={projectInitialValues} validationSchema={projectSchema}>
              {(formikValues) => (
                <>
                  <div className="rounded-md shadow-custom-md shadow-neutral-300 divide-y ">
                    <div className="flex justify-between p-8">
                      <div className="basis-5/12">
                        <h1 className="text-2xl font-display text-primary-700 capitalize">
                          {"Let's begin with filling up basic information"}
                        </h1>
                        <h4>Tell us what you got in your mind</h4>
                      </div>
                      <div className="basis-6/12">
                        <ProjectInfoForm formData={formikValues} />
                      </div>
                    </div>
                    <div className="flex justify-between p-8">
                      <div className="basis-5/12">
                        <h1 className="text-2xl font-display text-primary-700 capitalize">
                          {"Next, estimate the Scope of your project"}
                        </h1>
                        <h4>
                          Choose among the estimated duration and what level of skills do
                          you require for your project
                        </h4>
                      </div>
                      <div className="basis-6/12">
                        <ProjectScopeForm formData={formikValues} />
                      </div>
                    </div>

                    <div className="flex justify-between p-8">
                      <div className="basis-5/12">
                        <h1 className="text-2xl font-display text-primary-700 capitalize">
                          {"Time to fill up pricing information"}
                        </h1>
                        <h4>
                          Tell us about your budget and your expected delivery date.
                        </h4>
                      </div>
                      <div className="basis-6/12">
                        <ProjectPricingForm formData={formikValues} />
                      </div>
                    </div>

                    <div className="px-8 py-4 border-t text-end">
                      <div className="flex justify-end gap-2">
                        <button className="px-4 py-2 rounded-md border hover:bg-neutral-200 disabled:bg-neutral-400 font-medium  inline-flex gap-2 items-center text-sm">
                          <span>Cancel</span>
                        </button>
                        <button
                          disabled
                          className=" mr-12 px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 text-white font-medium  inline-flex gap-2 items-center text-sm"
                        >
                          <span>Continue</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </section>
      </WebLayout>
    </>
  );
}

export default withRouteProtect(CreateProject, ["client"]);
