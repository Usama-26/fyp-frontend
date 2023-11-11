import { Form, Formik } from "formik";
import Head from "next/head";
import * as Yup from "yup";

import WebLayout from "@/layouts/WebLayout";
import withRouteProtect from "@/helpers/withRouteProtect";
import { ProjectInfoForm } from "@/components/ProjectForms/ProjectInfoForm";
import { ProjectScopeForm } from "@/components/ProjectForms/ProjectScopeForm";
import { ProjectPricingForm } from "@/components/ProjectForms/ProjectPricingForm";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { postData } from "@/utils/api/genericAPI";
import { BASE_URL } from "@/constants";

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
  service: Yup.string().trim().required("Please Select An Option"),
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
  deadline: "",
};
function CreateProject() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [inEthereum, setInEthereum] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const [selectedService, setSelectedService] = useState({});

  const [error, setError] = useState();

  const router = useRouter();

  const postProject = async () => {
    const token = window.localStorage.getItem("token");
    console.log(formData);
    setError("");
    try {
      const response = await postData(`${BASE_URL}/projects/`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      setError(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Post a Project | ChainWork</title>
      </Head>
      <WebLayout>
        <section>
          <div className="max-w-7xl mx-auto m-4 rounded-md">
            <Formik
              initialValues={projectInitialValues}
              validationSchema={projectSchema}
              onSubmit={(values) => {
                setFormStep(1);
                setFormData(values);
              }}
            >
              {(formikValues) => (
                <Form>
                  {formStep === 0 && (
                    <div className="rounded-md shadow-custom-md shadow-neutral-300 divide-y ">
                      <div className="flex justify-between p-8">
                        <div className="basis-5/12">
                          <h1 className="text-2xl font-display text-primary-700 capitalize">
                            {"Let's begin with filling up basic information"}
                          </h1>
                          <h4>Tell us what you got in your mind</h4>
                        </div>
                        <div className="basis-6/12">
                          <ProjectInfoForm
                            formikData={formikValues}
                            selectedCategory={selectedCategory}
                            selectedSubCategory={selectedSubCategory}
                            selectedService={selectedService}
                            setSelectedCategory={setSelectedCategory}
                            setSelectedService={setSelectedService}
                            setSelectedSubCategory={setSelectedSubCategory}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between p-8">
                        <div className="basis-5/12">
                          <h1 className="text-2xl font-display text-primary-700 capitalize">
                            {"Next, estimate the Scope of your project"}
                          </h1>
                          <h4>
                            Choose among the estimated duration and what level of skills
                            do you require for your project
                          </h4>
                        </div>
                        <div className="basis-6/12">
                          <ProjectScopeForm formikData={formikValues} />
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
                          <ProjectPricingForm
                            formikData={formikValues}
                            inEthereum={inEthereum}
                            setInEthereum={setInEthereum}
                          />
                        </div>
                      </div>

                      <div className="px-8 py-4 border-t text-end">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => router.back()}
                            className="px-4 py-2 rounded-md border hover:bg-neutral-200 disabled:bg-neutral-400 font-medium  inline-flex gap-2 items-center text-sm"
                          >
                            <span>Cancel</span>
                          </button>
                          <button
                            type="submit"
                            disabled={
                              !formikValues.isValid ||
                              !Object.keys(formikValues.touched).length
                            }
                            className=" mr-12 px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium  inline-flex gap-2 items-center text-sm"
                          >
                            <span>Continue</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>

            {formStep === 1 && (
              <div className="rounded-md shadow-custom-md shadow-neutral-300 divide-y ">
                {error ? (
                  <div className="p-4 bg-danger-200 text-danger-700">
                    <p>{error}</p>
                  </div>
                ) : (
                  ""
                )}
                <div className=" p-8 flex divide-x">
                  <div className="w-1/3">
                    <h1 className="text-2xl font-display text-primary-700 capitalize">
                      {"Let's take final look"}
                    </h1>
                  </div>
                  <div className="w-1/3 px-2 space-y-4">
                    <h1 className="font-display font-bold text-xl">Basic Info</h1>
                    <div>
                      <label htmlFor="title" className="font-medium">
                        Title
                      </label>
                      <p>{formData?.title}</p>
                    </div>
                    <div>
                      <label htmlFor="description" className="font-medium">
                        Description
                      </label>
                      <p>{formData?.description}</p>
                    </div>
                    <div>
                      <label htmlFor="category" className="font-medium">
                        Category
                      </label>
                      <p>{selectedCategory?.label}</p>
                    </div>
                    <div>
                      <label htmlFor="service" className="font-medium">
                        Service
                      </label>
                      <p>{selectedSubCategory?.label}</p>
                    </div>
                    <div>
                      <label htmlFor="focused" className="font-medium">
                        Specific Service
                      </label>
                      <p>{selectedService?.label}</p>
                    </div>
                  </div>
                  <div className="w-1/3 px-2 space-y-4">
                    <h1 className="font-display font-bold text-xl">Project Scope</h1>
                    <div>
                      <label htmlFor="service" className="font-medium">
                        Scope
                      </label>
                      <p className="capitalize">{formData?.scope}</p>
                    </div>
                    <div>
                      <label htmlFor="service" className="font-medium">
                        Skills Level
                      </label>
                      <p className="capitalize">{formData?.skills_level}</p>
                    </div>
                    <h1 className="font-display font-bold text-xl">
                      Pricing and Deadline
                    </h1>
                    <div>
                      <label htmlFor="pricing_type" className="font-medium">
                        Pricing Type
                      </label>
                      <p className="capitalize">{formData?.pricing_type}</p>
                    </div>
                    <div>
                      <label htmlFor="budget" className="font-medium">
                        Budget
                      </label>
                      <p className="capitalize">{` ${
                        formData.pricing_type === "fixed" ? "$" : "$/hr"
                      }${formData?.budget} (${inEthereum} ETH)`}</p>
                    </div>
                    <div>
                      <label htmlFor="service" className="font-medium">
                        Delivery Date
                      </label>
                      <p className="capitalize">{formData?.deadline}</p>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-4 border-t text-end">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setFormStep(0)}
                      className="px-4 py-2 rounded-md border font-medium  inline-flex gap-2 items-center text-sm"
                    >
                      <span>
                        <BiArrowBack />
                      </span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={postProject}
                      className=" mr-12 px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 text-white font-medium  inline-flex gap-2 items-center text-sm"
                    >
                      <span>Post Project</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </WebLayout>
    </>
  );
}

export default withRouteProtect(CreateProject, ["client"]);
