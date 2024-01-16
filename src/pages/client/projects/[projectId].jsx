import { useProjects } from "@/context/ProjectContext";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAccounts } from "@/context/AccountContext";
import Spinner from "@/components/Spinner";
import dayjs from "dayjs";
import * as Yup from "yup";
import relativeTime from "dayjs/plugin/relativeTime";
import Countdown, { zeroPad } from "react-countdown";
import { isEmpty } from "@/utils/generics";
import {
  ArrowDownTrayIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CheckCircleIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Chip from "@/components/Chip";
import { Dialog, Transition } from "@headlessui/react";
import { useProposals } from "@/context/ProposalContext";
import CheckoutModal from "@/components/Modals/CheckoutModal";
import { BiFile } from "react-icons/bi";
import StarRating from "@/components/StarRating";
import { useContractWrite } from "wagmi";
import { escrowABI, escrowAddress } from "@/contract";
import ProjectCompleteModal from "@/components/Modals/ProjectCompleteModal";
import { useServices } from "@/context/ServiceContext";
import SimpleNotification from "@/components/Notifications/simple";
dayjs.extend(relativeTime);

function ViewProject() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isConnected, connect, connector } = useAccounts();
  const [isCompleting, setIsCompleting] = useState(false);
  const {
    project,
    isLoading: isProjectLoading,
    getProjectById,
    updateProject,
  } = useProjects();
  const { review } = useServices();
  const router = useRouter();
  const { writeAsync, data } = useContractWrite({
    abi: escrowABI,
    address: escrowAddress,
    functionName: "releasePayment",
  });

  const handleProjectComplete = async () => {
    setIsCompleting(true);
    try {
      const res = await writeAsync?.({ args: [project.data._id] });
      const updatedProject = updateProject(project.data._id, {
        released_transaction_id: res?.hash,
        status: "completed",
      });
      if (updatedProject) {
        setIsCompleting(false);
        setIsOpen(false);
      }
      router.replace("/client/projects");
    } catch (error) {
      setIsCompleting(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      handleProjectComplete();
    }
  }, [isConnected]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
    } else {
      return (
        <div className="text-xl font-medium text-center grid grid-cols-4 gap-x-2">
          <span>{`${zeroPad(days)}`}</span>
          <span>{`${zeroPad(hours)}`}</span>
          <span>{`${zeroPad(minutes)}`}</span>
          <span>{`${zeroPad(seconds)}`}</span>
          <span className="text-sm font-normal">Days</span>
          <span className="text-sm font-normal">Hours</span>
          <span className="text-sm font-normal">Minutes</span>
          <span className="text-sm font-normal">Seconds</span>
        </div>
      );
    }
  };

  useEffect(() => {
    getProjectById(router.query.projectId);
  }, [router, review]);

  return (
    <>
      <Head>
        <title>
          {(!isEmpty(project) && project?.data.title) || "View Project"} | ChainWork
        </title>
      </Head>
      <WebLayout>
        <section>
          <div className="container mx-auto my-8">
            {review && (
              <SimpleNotification
                heading={"Proposal Sent"}
                message={"Your review has been posted successfully."}
              />
            )}
            <div className="flex gap-2">
              <div className="basis-9/12 rounded-md border">
                {isEmpty(project) && isProjectLoading && (
                  <div className="flex h-96 items-center text-neutral-500 justify-center">
                    <Spinner /> <span>Loading...</span>
                  </div>
                )}

                {!isEmpty(project) && (
                  <div className="divide-y">
                    <div className="px-4 py-2 flex justify-between items-center">
                      <div>
                        <h1 className="text-xl font-semibold text-primary-500 ">
                          {project.data.title}
                        </h1>
                        <p className="text-sm text-neutral-500">
                          Posted {dayjs(project.data.createdAt).fromNow()}
                        </p>
                      </div>
                      <div>
                        {project.data.status === "assigned" && (
                          <Countdown date={project.data.deadline} renderer={renderer} />
                        )}
                      </div>
                    </div>
                    <div className="px-4 py-2 flex gap-12 text-center text-sm ">
                      <div>
                        <h2 className="text-lg font-medium">
                          {dayjs(project.data.deadline).format("DD/MM/YY")}
                        </h2>
                        <h4 className="text-sm">Deadline</h4>
                      </div>
                      <div>
                        <h2 className="text-lg font-medium">
                          {project.data.pricing_type === "hourly" ? (
                            <span>${project.data.budget}/hr</span>
                          ) : (
                            <span>${project.data.budget}</span>
                          )}
                        </h2>
                        <h4 className="text-sm">Budget</h4>
                      </div>
                      <div>
                        <h2 className="text-lg font-medium">
                          {project.data.proposals.length}
                        </h2>
                        <h4 className="text-sm">Proposals</h4>
                      </div>
                    </div>
                    <div className=" p-4">
                      <h2 className="font-medium mb-2">Project Description</h2>
                      <div
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: project.data.description }}
                      ></div>
                    </div>
                    <div className=" p-4">
                      <h2 className="font-medium mb-2">Required Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {project.data.tags.map((tag) => (
                          <Chip key={tag} value={tag} />
                        ))}
                      </div>
                    </div>
                    <div className=" p-4">
                      <h2 className="font-medium mb-2">Attachments</h2>
                      {project.data.attachments.length > 0 ? (
                        <ul>
                          {project.data.attachments.map((file) => (
                            <li
                              key={file.public_id}
                              className="flex items-center justify-between pl-4 pr-5 text-sm leading-6"
                            >
                              <div className="bg-neutral-200 m-2 rounded-md inline-flex items-center p-1  text-xs">
                                <BiFile className="w-5 h-5" />
                                <p className="p-1">
                                  <span>{file.filename}</span>
                                  <span className="ml-2">{file.size}</span>
                                  <Link
                                    target="_blank"
                                    href={file.secure_url}
                                    download={file.public_id}
                                    className="hover:text-primary-700"
                                  >
                                    <ArrowDownTrayIcon className="inline w-4 h-4" />
                                  </Link>
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm">No Attachments</p>
                      )}
                    </div>
                  </div>
                )}

                {!isEmpty(project) && project.data.status === "completed" && (
                  <Review project={project.data} />
                )}
              </div>

              {!isEmpty(project) && project.data.status === "assigned" && (
                <div className="basis-4/12 border rounded-md py-4 px-1">
                  <h6 className="font-medium mb-4 px-1">Assigned to</h6>

                  <div className="flex justify-center text-center mt-8">
                    <Image
                      src={project.data.assigned_to.profile_photo}
                      width={1024}
                      height={683}
                      className="w-20 h-20 aspect-square object-cover rounded-full"
                      alt="Profile Picture"
                    />
                  </div>
                  <h1 className="text-lg font-medium text-center hover:underline">
                    <Link href={`/explore/freelancer/${project.data.assigned_to._id}`}>
                      {project.data.assigned_to.firstName}{" "}
                      {project.data.assigned_to.lastName[0]}.
                    </Link>
                  </h1>
                  <div className="mt-2">
                    <h6 className="font-medium mb-4 px-1">Deliverables</h6>
                    <div className="border px-1 py-4 text-center">
                      {project.data.deliverables.length > 0 ? (
                        <ul>
                          {project.data.deliverables.map((file) => (
                            <li
                              key={file.public_id}
                              className="flex items-center justify-between text-sm leading-6"
                            >
                              <div className="bg-neutral-200 m-2 rounded-md inline-flex items-center p-1 text-xs">
                                <BiFile className="w-5 h-5" />
                                <p className="p-1">
                                  <span>{file.filename}</span>
                                  <span className="ml-2">{file.size}</span>
                                  <Link
                                    target="_blank"
                                    href={file.secure_url}
                                    download={file.public_id}
                                    className="hover:text-primary-700"
                                  >
                                    <ArrowDownTrayIcon className="inline w-4 h-4" />
                                  </Link>
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center">No Deliverables Yet</p>
                      )}
                    </div>
                  </div>
                  <div className="text-center mt-8">
                    <button
                      type="button"
                      className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => setIsOpen(true)}
                    >
                      Complete Project
                    </button>
                  </div>
                </div>
              )}

              {!isEmpty(project) && project.data.status === "listed" && (
                <div className="basis-4/12 border rounded-md py-4 px-1">
                  {isProjectLoading && (
                    <div className="flex h-96 items-center text-neutral-500 justify-center">
                      <Spinner /> <span>Loading...</span>
                    </div>
                  )}
                  {!isEmpty(project) && project.data.proposals.length > 0 ? (
                    <div>
                      <h6 className="font-medium mb-4 px-1">Received Proposals</h6>
                      <ProposalsList
                        project={project?.data}
                        proposals={project?.data.proposals}
                      />
                    </div>
                  ) : (
                    <div className="text-center text-neutral-500">
                      <h6 className="font-medium mb-4 px-1 ">No Proposals Yet</h6>
                      <p className="text-sm px-10">
                        {"We'll show your proposals when your project receives any."}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!isEmpty(project) && project.data.status === "completed" && (
                <div className="basis-4/12 border rounded-md py-4 px-1">
                  {isProjectLoading && (
                    <div className="flex h-96 items-center text-neutral-500 justify-center">
                      <Spinner /> <span>Loading...</span>
                    </div>
                  )}
                  <div>
                    <CheckCircleIcon className="w-28 h-28 mx-auto fill-success-600" />
                    <h3 className="font-semibold text-center">
                      Project is Completed Successfully.
                    </h3>
                  </div>
                </div>
              )}

              {!isEmpty(project) && (
                <ProjectCompleteModal
                  open={isOpen}
                  setOpen={setIsOpen}
                  project={project.data}
                  isLoading={isCompleting}
                  onComplete={connect}
                />
              )}
            </div>
          </div>
        </section>
      </WebLayout>
      ;
    </>
  );
}

export default withRouteProtect(ViewProject, ["client"]);

function ProposalsList({ proposals, project }) {
  const [isProposalViewOpen, setIsProposalViewOpen] = useState(false);
  const [activeProposal, setActiveProposal] = useState("");
  return (
    <>
      <ul role="list" className="space-y-2 py-1 max-h-96 p-1 overflow-auto">
        {proposals.map((proposal) => (
          <li key={proposal._id} className="">
            <button
              onClick={() => {
                setActiveProposal(proposal._id);
                setIsProposalViewOpen(true);
              }}
              className="w-full rounded-md transition duration-150 shadow-custom-sm hover:shadow-custom-lg hover:shadow-neutral-300 px-4 shadow-neutral-300 flex text-left items-center justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <Image
                  className="h-12 w-12 flex-none rounded-full object-cover bg-neutral-50"
                  src={proposal.freelancer_id.profile_photo}
                  height={480}
                  width={480}
                  alt={`${proposal.freelancer_id.firstName} Profile Photo`}
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-neutral-700">
                    {proposal.freelancer_id.firstName}{" "}
                    {proposal.freelancer_id.lastName[0]}.
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-neutral-500">
                    {dayjs(proposal.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <div className="min-w-0 flex-auto text-end">
                <p className="text-sm font-semibold leading-6 text-neutral-700">
                  At ${proposal.bid_amount}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-neutral-500">
                  Delivery On {dayjs(proposal.delivery_data).format("DD/MM/YYYY")}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <ViewProposal
        proposalId={activeProposal}
        open={isProposalViewOpen}
        setOpen={setIsProposalViewOpen}
        project={project}
      />
    </>
  );
}

function ViewProposal({ open, setOpen, proposalId, project }) {
  const { proposal, isLoading, getProposalById } = useProposals();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { user, createChannel } = useAccounts();

  const freelancer = proposal?.data?.freelancer_id;

  const handleSendMessage = async () => {
    await createChannel(`${user.data.firstName}-${freelancer.firstName}`, {
      name: `${user.data.firstName}-${freelancer.firstName}`.toLowerCase(),
      members: [`${user.data._id}`, `${freelancer._id}`],
    });
  };

  useEffect(() => {
    if (proposalId) {
      getProposalById(proposalId);
    }
  }, [proposalId]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden text-sm">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto max-w-4xl">
                  {isLoading && (
                    <div className="flex h-full items-center text-neutral-500 justify-center">
                      <Spinner /> <span>Loading...</span>
                    </div>
                  )}
                  {!isEmpty(proposal) && (
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between mb-5">
                          <Dialog.Title className="text-base font-semibold leading-6 text-neutral-700">
                            Proposal Information
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="">
                          <div className="border-b border-neutral-200 bg-white px-4 py-5 sm:px-6 mb-5">
                            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                              <div className="ml-4 mt-4">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    <Image
                                      className="h-12 w-12 object-cover rounded-full"
                                      src={proposal.data.freelancer_id.profile_photo}
                                      height={240}
                                      width={240}
                                      alt={`${proposal.data.freelancer_id.firstName} Profile Photo`}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <h3 className="text-base font-semibold leading-6 text-neutral-700">
                                      {proposal.data.freelancer_id.firstName}
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                      {proposal.data.freelancer_id.profile_title}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4 mt-4 flex flex-shrink-0">
                                <button
                                  onClick={handleSendMessage}
                                  type="button"
                                  className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:ring-primary-300 hover:bg-primary-50 hover:text-primary-500"
                                >
                                  <ChatBubbleOvalLeftEllipsisIcon
                                    className="-ml-0.5 mr-1.5 h-5 w-5 inline-block"
                                    aria-hidden="true"
                                  />
                                  <span>Send Message</span>
                                </button>
                                <Link
                                  href={`/explore/freelancers/${freelancer?._id}`}
                                  className=" ml-3 relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:ring-primary-300 hover:bg-primary-50 hover:text-primary-700"
                                >
                                  <UserCircleIcon
                                    className="-ml-0.5 mr-1.5 h-5 w-5 inline-block"
                                    aria-hidden="true"
                                  />
                                  <span>View Profile</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="border-b mb-5">
                            {/* Cover Letter */}
                            <div className="mb-5">
                              <h4 className="font-semibold text-base mb-2">
                                Cover Letter
                              </h4>
                              <p>{proposal.data.comment}</p>
                            </div>
                            {/* Work Examples */}
                            <div className="mb-5">
                              <h4 className="font-semibold text-base mb-2">
                                Work Examples
                              </h4>
                            </div>

                            {/* Budget & Deadline */}
                            <div className="flex gap-x-8 text-base mb-5">
                              <div className="font-medium">
                                <dt className="">Offered Budget</dt>
                                <dd className="text-xl text-gray-500">
                                  ${proposal.data.bid_amount}
                                </dd>
                              </div>
                              <div className="font-medium">
                                <dt className="">Will Deliver On</dt>
                                <dd className="text-xl text-gray-500">
                                  {dayjs(proposal.data.delivery_date).format("DD/MM/YY")}
                                </dd>
                              </div>
                            </div>
                          </div>
                          {/* About Freelancer */}
                          <div className="border-b mb-5">
                            <div className="mb-5">
                              <h4 className="font-semibold text-base mb-2">
                                About Freelancer
                              </h4>
                            </div>
                            <div className="flex flex-wrap justify-between gap-x-8 mb-5">
                              <div className="font-medium">
                                <dt className="mb-2">Reviews & Ratings</dt>
                                <dd className=" text-gray-500 flex items-center gap-x-1">
                                  <span>
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <AiFillStar
                                        key={i}
                                        className="inline-block fill-amber-400 w-4 h-4"
                                      />
                                    ))}
                                  </span>
                                  <span>{"(4.5)"}</span>
                                </dd>
                              </div>
                              <div className="font-medium">
                                <dt className="mb-2">Jobs Completed</dt>
                                <dd className=" text-gray-500">20</dd>
                              </div>
                              <div className="font-medium">
                                <dt className="mb-2">Job Success Rate</dt>
                                <dd className=" text-gray-500">80%</dd>
                              </div>
                              <div className="font-medium">
                                <dt className="mb-2">Active Jobs</dt>
                                <dd className=" text-gray-500">2</dd>
                              </div>
                              <div className="font-medium">
                                <dt className="mb-2">Country </dt>
                                <dd className=" text-gray-500">
                                  {proposal.data.freelancer_id.country}
                                </dd>
                              </div>
                              <div className="font-medium">
                                <dt className="mb-2">Languages</dt>
                                <dd className=" text-gray-500">English/Urdu/Punjabi</dd>
                              </div>
                            </div>
                          </div>

                          {/* Action Center */}

                          <div className="text-end text-base">
                            {/* <button
                              type="button"
                              className="py-2 px-4 text-center  text-neutral-700 border rounded-md border-neutral-500 font-medium hover:text-white hover:bg-neutral-500 "
                            >
                              Reject Proposal
                            </button> */}
                            <button
                              type="button"
                              onClick={() => setIsCheckoutOpen(true)}
                              className="ml-4 py-2 px-4 text-center  text-primary-700 border rounded-md border-primary-700 font-medium hover:text-white hover:bg-primary-700 "
                            >
                              Hire Freelancer
                            </button>
                          </div>
                        </div>
                      </div>
                      w
                      <CheckoutModal
                        project={project}
                        open={isCheckoutOpen}
                        setOpen={setIsCheckoutOpen}
                        freelancer={freelancer}
                      />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Review({ project }) {
  const [rating, setRating] = useState(0);
  const { createReview, review } = useServices();
  const [clientReview, setClientReview] = useState(null);
  const [freelancerReview, setFreelancerReview] = useState(null);

  useEffect(() => {
    const res1 = project.reviews?.filter((review) => review.from === project.created_by);
    const res2 = project.reviews?.filter(
      (review) => review.from === project.assigned_to._id
    );
    setClientReview(res1[0] || null);
    setFreelancerReview(res2[0] || null);
  }, [project]);

  return (
    <div className="mx-8 my-4 rounded-md shadow-custom-md shadow-neutral-300 p-4">
      {!clientReview && !freelancerReview && (
        <h2 className="font-medium mb-2 text-lg">Leave A Review</h2>
      )}

      {clientReview && (
        <div>
          <h4 className="text-lg font-medium">Your Review</h4>
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`w-8 h-8 ${
                  i < clientReview.rating
                    ? "fill-amber-500 stroke-amber-500"
                    : "stroke-amber-500"
                }`}
              />
            ))}
            <span className="text-2xl text-gray-500 font-medium">
              ({clientReview.rating}.0)
            </span>
          </div>
          <div>
            <blockquote className="italic">{`"${clientReview.comment}"`}</blockquote>
          </div>
        </div>
      )}

      {freelancerReview && clientReview && (
        <div>
          <h4 className="text-lg font-medium mt-8">Freelancer Review</h4>
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`w-8 h-8 ${
                  i < freelancerReview.rating
                    ? "fill-amber-500 stroke-amber-500"
                    : "stroke-amber-500"
                }`}
              />
            ))}
            <span className="text-2xl text-gray-500 font-medium">
              ({freelancerReview.rating}.0)
            </span>
          </div>
          <div>
            <blockquote className="italic">{`"${freelancerReview.comment}"`}</blockquote>
          </div>
        </div>
      )}

      {!clientReview && (
        <Formik
          initialValues={{
            comment: "",
            rating: 0,
          }}
          validationSchema={Yup.object({
            comment: Yup.string().required("Please write a comment."),
            rating: Yup.number().required("Please select a star."),
          })}
          onSubmit={(values) => {
            createReview({
              ...values,
              from: project.created_by,
              to: project.assigned_to._id,
              project: project._id,
              gig: project.gig || undefined,
            });
          }}
        >
          {({ values, errors, touched, submitCount, isValid, setFieldValue }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="rating" className="block  font-semibold mb-4">
                  Select a Rating
                </label>
                <StarRating
                  defaultRating={values.rating}
                  onSetRating={(value) => {
                    setRating();
                    setFieldValue("rating", value);
                  }}
                />
                {errors.rating && touched.rating && submitCount > 0 && (
                  <ErrorMessage
                    name="comment"
                    component={"p"}
                    className="field-error__message"
                  />
                )}
              </div>
              <div className="">
                <label htmlFor="comment" className="block  font-semibold mb-4">
                  Comment
                </label>
                <Field
                  as="textarea"
                  rows="5"
                  className={`form-input resize-none ${
                    errors.comment && touched.comment && submitCount > 0 && "field-error"
                  }`}
                  type="comment"
                  name="comment"
                  id="comment"
                  maxLength={2000}
                />
                <div>
                  <span className="text-sm float-right">
                    {values.comment.length}/2000
                  </span>
                  {errors.comment && touched.comment && submitCount > 0 && (
                    <ErrorMessage
                      name="comment"
                      component={"p"}
                      className="field-error__message"
                    />
                  )}
                </div>
              </div>

              <div className=" py-4 text-end border-t">
                <button
                  type="submit"
                  disabled={!isValid}
                  className=" px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium items-center"
                >
                  Submit Review
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
