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
import { Transition } from "@headlessui/react";
import { useProjects } from "@/context/ProjectContext";
import Spinner from "@/components/Spinner";
import { isEmpty } from "@/utils/generics";

const projectSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(20, "Title should be of atleast 20 characters")
    .max(100, "Title can't exceed 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .trim()
    .min(50, "Write a more clear description of atleast 50 characters long")
    .max(2000, "Description can't exceed 2000 characters")
    .required("Add project description"),
  category: Yup.string().trim().required("Please Select A Category"),
  sub_category: Yup.string().trim().required("Please Select A Service"),
  service: Yup.string().trim().required("Please Select An Option"),
  pricing_type: Yup.string().trim().required("Choose a pricing type"),
  deadline: Yup.date().required("Set Project Deadline"),
  skills: Yup.array()
    .min(3, "Select atleast 3 skills")
    .max(5, "You can only choose upto 10 skills")
    .of(Yup.string()),
  budget: Yup.number()
    .min(10, "Select a minimum budget of 10 $")
    .max(1000, "Maximum budget can be 1000 $")
    .required("Please enter your budget"),
  skills_level: Yup.string().trim().required("Choose a Skills Level").default("beginner"),
  scope: Yup.string().trim().required("Set project scope").default("small"),
});

const pricingTypes = [
  {
    value: "fixed",
    label: "Fixed Budget",
  },
  {
    value: "hourly",
    label: "Hourly Rate",
  },
];
function EditProject() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [inEthereum, setInEthereum] = useState(0);

  const [deliveryDate, setDeliveryDate] = useState({});
  const [selectedPricingType, setSelectedPricingType] = useState(pricingTypes[0]);

  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const [selectedService, setSelectedService] = useState({});

  const { project, error, isLoading, getProjectById } = useProjects();

  const router = useRouter();

  const projectInitialValues = {
    title: project?.data.title,
    description: project?.data.description,
    category: project?.data.category,
    sub_category: project?.data.sub_category,
    service: project?.data.service,
    scope: project?.data.scope,
    skills_level: project?.data.skills_level,
    pricing_type: project?.data.pricing_type,
    budget: project?.data.budget,
    deadline: project?.data.deadline,
  };

  useEffect(() => {
    getProjectById(router.query.projectId);
  }, [project]);

  return (
    <>
      <Head>
        <title>Post a Project | ChainWork</title>
      </Head>
      <WebLayout>
        <section>
          {!isEmpty && (
            <div className="max-w-7xl mx-auto m-4 rounded-md">
              <Formik
                initialValues={projectInitialValues}
                validationSchema={projectSchema}
                onSubmit={(values, { resetForm }) => {
                  setFormStep(1);
                  setFormData(values);
                }}
              >
                {(formikValues) => (
                  <Transition show={formStep === 0}>
                    <Form>
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
                              setDeliveryDate={setDeliveryDate}
                              deliveryDate={deliveryDate}
                              selectedPricingType={selectedPricingType}
                              setSelectedPricingType={setSelectedPricingType}
                              pricingTypes={pricingTypes}
                            />
                          </div>
                        </div>

                        <div className="px-8 py-4 border-t text-end">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => router.push("/client/projects")}
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
                    </Form>
                  </Transition>
                )}
              </Formik>
              <Transition show={formStep === 1}>
                <ProjectReviewTab
                  formData={formData}
                  selectedCategory={selectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  selectedService={selectedService}
                  inEthereum={inEthereum}
                  setFormStep={setFormStep}
                />
              </Transition>
            </div>
          )}
        </section>
      </WebLayout>
    </>
  );
}

export default withRouteProtect(EditProject, ["client"]);

function ProjectReviewTab({
  formData,
  selectedCategory,
  selectedSubCategory,
  selectedService,
  inEthereum,
  setFormStep,
}) {
  const { isLoading, error, project, postProject } = useProjects();

  const handlePostProject = () => {
    postProject(formData);
  };
  return (
    <div className="min-h-screen rounded-md shadow-custom-md shadow-neutral-300 divide-y ">
      {error && (
        <div className="">
          <h4 className="text-center  font-medium bg-danger-200 text-danger-700 text-lg">
            Something went wront. Please try again later
          </h4>
        </div>
      )}
      <div className=" p-8 flex divide-x-2 divide-neutral-500">
        <div className="w-1/3">
          <h1 className="text-2xl font-display text-primary-700 capitalize">
            {"Let's take a final look"}
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
          <h1 className="font-display font-bold text-xl">Pricing and Deadline</h1>
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
            <p className="break-words">{` ${formData?.budget}${
              formData.pricing_type === "fixed" ? "$" : "$/hr"
            } (${inEthereum} ETH)`}</p>
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
            onClick={handlePostProject}
            disabled={isLoading}
            className=" mr-12 px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 text-white font-medium  inline-flex gap-2 items-center text-sm disabled:bg-neutral-200 disabled:text-neutral-500"
          >
            {isLoading ? <Spinner /> : "Post Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
