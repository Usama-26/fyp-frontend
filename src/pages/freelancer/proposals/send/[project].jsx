import { useProjects } from "@/context/ProjectContext";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAccounts } from "@/context/AccountContext";
import Datepicker from "react-tailwindcss-datepicker";
import * as Yup from "yup";
import { useFreelancer } from "@/context/FreelancerContext";
import Spinner from "@/components/Spinner";
import { useClient } from "@/context/ClientContext";
import dayjs from "dayjs";
import { isEmpty } from "@/utils/generics";

const proposalSchema = Yup.object({
  cover_letter: Yup.string().max(2000).required("Cover Letter Required"),
  bid_amount: Yup.number().max(1000).required("Enter A Valid Bid Amount"),
  delivery_date: Yup.string().max(1000).required("Set A Delivery Date"),
});
const initialProposalValues = {
  cover_letter: "",
  bid_amount: 0,
  delivery_date: "",
};
function SendProposal() {
  const { project, isLoading: isProjectLoading, getProjectById } = useProjects();
  const { user } = useAccounts();
  const [proposalData, setProposalData] = useState({});
  const [deliveryDate, setDeliveryDate] = useState({});
  const { proposal, isLoading: isSending, sendProposal } = useFreelancer();
  const { client, isLoading: isClientLoading, getClientById } = useClient();
  const router = useRouter();

  useEffect(() => {
    getProjectById(router.query.project);
  }, []);

  useEffect(() => {
    if (!isEmpty(project)) {
      getClientById(project.data.created_by);
    }
  }, [project]);

  useEffect(() => {
    if (!isEmpty(proposal)) {
      router.push("/freelancer/proposals");
    }
  }, [proposal]);

  return (
    <>
      <Head>
        <title>Send Proposal | ChainWork</title>
      </Head>
      <WebLayout>
        <section className="min-h-screen">
          <div className="container mx-auto my-8 ">
            <div className="flex gap-2">
              <div className="basis-9/12 border">
                {isProjectLoading && (
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                )}
                {!isEmpty(project) && (
                  <>
                    <h1 className="text-xl font-semibold font-display px-4 py-2 border-b">
                      {project.data.title}
                    </h1>
                    <div className="px-4 py-2 flex gap-12 text-center text-sm border-b">
                      <div>
                        <h4>Deadline</h4>
                        <h2 className="text-lg font-medium">{project.data.deadline}</h2>
                      </div>
                      <div>
                        <h4>Required Skills Level</h4>
                        <h2 className="text-lg font-medium capitalize">
                          {project.data.skills_level}
                        </h2>
                      </div>
                      <div>
                        <h4>Project Scope</h4>
                        <h2 className="text-lg font-medium capitalize">
                          {project.data.scope}
                        </h2>
                      </div>
                      <div>
                        <h4>Price</h4>
                        <h2 className="text-lg font-medium">
                          {project.data.pricing_type === "hourly" ? (
                            <span>${project.data.budget}/hr</span>
                          ) : (
                            <span>${project.data.budget}</span>
                          )}
                        </h2>
                      </div>
                      <div>
                        <h4>Proposals</h4>
                        <h2 className="text-lg font-medium">
                          {project.data.proposals.length}
                        </h2>
                      </div>
                    </div>
                    <div className="border-b p-4">
                      <h2 className="font-medium mb-2">Project Description</h2>
                      <p className="">{project.data.description}</p>
                    </div>
                    <div className="mx-8 my-4 rounded-md shadow-custom-md shadow-neutral-300 p-4">
                      <Formik
                        initialValues={initialProposalValues}
                        validationSchema={proposalSchema}
                        onSubmit={(values, { resetForm }) => {
                          sendProposal({
                            ...values,
                            freelancer_id: user.data._id,
                            project_id: project.data._id,
                          });
                          if (proposal) {
                            resetForm({ values: null });
                          }
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          submitCount,
                          isValid,
                          setFieldValue,
                        }) => (
                          <Form className="space-y-8">
                            <div className="">
                              <label
                                htmlFor="cover_letter"
                                className="block text-xl font-semibold mb-4"
                              >
                                Cover Letter
                              </label>
                              <Field
                                as="textarea"
                                rows="5"
                                className={`form-input resize-none ${
                                  errors.cover_letter &&
                                  touched.cover_letter &&
                                  submitCount > 0 &&
                                  "field-error"
                                }`}
                                type="cover_letter"
                                name="cover_letter"
                                id="cover_letter"
                                maxLength={2000}
                              />
                              <span className="text-sm float-right">
                                {values.cover_letter.length}/2000
                              </span>

                              {errors.cover_letter &&
                              touched.cover_letter &&
                              submitCount > 0 ? (
                                <ErrorMessage
                                  name="cover_letter"
                                  component={"p"}
                                  className="field-error__message"
                                />
                              ) : (
                                <p className="text-sm italic text-neutral-500">
                                  {"Write your proposal here."}
                                </p>
                              )}
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <label
                                  htmlFor="bid_amount"
                                  className="block text-xl font-semibold mb-4"
                                >
                                  Offer Your Price
                                </label>
                                <Field
                                  name="bid_amount"
                                  type="number"
                                  id="bid_amount"
                                  min={10}
                                  max={1000}
                                  className=" w-32 p-2 border border-neutral-500 rounded-md text-left  focus:ring-2 focus:border-primary-500 font-medium placeholder:text-neutral-400 outline-none text-sm capitalize"
                                />
                                <span className="ml-2 text-lg font-medium">
                                  {project?.data.pricing_type === "hourly" ? "$/hr" : "$"}
                                </span>
                                {errors.bid_amount &&
                                touched.bid_amount &&
                                submitCount > 0 ? (
                                  <ErrorMessage
                                    name="bid_amount"
                                    component={"p"}
                                    className="field-error__message"
                                  />
                                ) : (
                                  <p className="text-sm italic text-neutral-500">
                                    Enter your Bid Amount between $10 to $1000
                                  </p>
                                )}
                              </div>
                              <div>
                                <label
                                  htmlFor="deliver_date"
                                  className="block text-xl font-semibold mb-4"
                                >
                                  {"When you'll deliver"}
                                </label>
                                <Field name="delivery_date">
                                  {({ field }) => (
                                    <Datepicker
                                      {...field}
                                      primaryColor="indigo"
                                      asSingle={true}
                                      useRange={false}
                                      value={deliveryDate}
                                      minDate={new Date()}
                                      displayFormat="MM/DD/YYYY"
                                      inputClassName="w-full p-2 border border-neutral-500 rounded-md focus:ring-2 focus:border-primary-500 bg-white text-neutral-700 placeholder:font-medium outline-none"
                                      onChange={(date) => {
                                        setDeliveryDate(date);
                                        setFieldValue(
                                          "delivery_date",
                                          dayjs(date.endDate)
                                        );
                                      }}
                                    />
                                  )}
                                </Field>
                                {errors.delivery_date && submitCount > 0 && (
                                  <ErrorMessage
                                    name="delivery_date"
                                    component={"p"}
                                    className="field-error__message"
                                  />
                                )}
                              </div>
                            </div>
                            <div className=" py-4 text-end border-t">
                              <button
                                type="submit"
                                disabled={!isValid || !Object.keys(touched).length}
                                className=" px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium items-center"
                              >
                                <span>{isSending ? <Spinner /> : "Send Proposal"}</span>
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </>
                )}
              </div>
              {/* <div className="basis-3/12 border">
                {isClientLoading && (
                  <div className="h-full flex items-center justify-center">
                    <Spinner />
                  </div>
                )}
                {!isEmpty(client) && (
                  <>
                    <div className="p-4 border-b">
                      <h1 className="font-semibold">Client Details</h1>
                      <div className="flex justify-center text-center mt-8">
                        <Image
                          src={"/images/profiles/profile-2.jpg"}
                          width={1024}
                          height={683}
                          className="w-20 h-20 aspect-square object-cover rounded-full"
                          alt="Profile Picture"
                        />

                        <span className="w-20 h-20 flex justify-center items-center  rounded-full text-4xl text-center text-white font-semibold bg-primary-500">
                          {client.data.firstName[0]}
                        </span>
                      </div>
                      <h1 className="text-lg font-medium text-center">
                        {client.data.firstName} {client.data.lastName[0]}.
                      </h1>
                      <p className="text-center text-sm">Pakistan</p>
                    </div>
                    <div className="p-4 border-b">
                      <div className="flex justify-between text-sm">
                        <span>Payment Status</span>
                        <span className="font-medium">
                          <span>
                            <BsCheckCircleFill className="inline mr-2 w-4 h-4 fill-success-600" />
                          </span>
                          <span>Verified</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-4 border-b">
                      <div className="flex justify-between text-sm">
                        <span>Projects Posted</span>
                        <span className="font-medium">{client.data.projects.length}</span>
                      </div>
                    </div>
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-center text-sm">
                        <span>Reviews</span>
                        <span>
                          {Array.from({ length: 5 }, (_, i) => (
                            <AiFillStar
                              key={i}
                              className="inline fill-amber-400 w-4 h-4"
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="p-4"></div>
              </div> */}
            </div>
          </div>
        </section>
      </WebLayout>
      ;
    </>
  );
}
export default withRouteProtect(SendProposal, ["freelancer"]);
