import { useProjects } from "@/context/ProjectContext";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useAccounts } from "@/context/AccountContext";
import Spinner from "@/components/Spinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Countdown, { zeroPad } from "react-countdown";
import { isEmpty } from "@/utils/generics";
import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Chip from "@/components/Chip";
import { BiFile } from "react-icons/bi";
import { useContractWrite } from "wagmi";
import { escrowABI, escrowAddress } from "@/contract";
import ProjectCompleteModal from "@/components/Modals/ProjectCompleteModal";
import { useServices } from "@/context/ServiceContext";
import SimpleNotification from "@/components/Notifications/simple";
import Review from "@/components/Project/ProjectReview";
import ProposalsList from "@/components/Project/ProposalsList";
dayjs.extend(relativeTime);

function ViewProject() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const { isConnected, connect } = useAccounts();
  const [isCompleting, setIsCompleting] = useState(false);
  const { review } = useServices();
  const router = useRouter();
  const {
    project,
    isLoading: isProjectLoading,
    getProjectById,
    updateProject,
  } = useProjects();
  const { writeAsync } = useContractWrite({
    abi: escrowABI,
    address: escrowAddress,
    functionName: "releasePayment",
  });

  const handleProjectComplete = async () => {
    setIsCompleting(true);
    try {
      const res = await writeAsync?.({ args: [project.data._id] });
      const updatedProject = updateProject(project.data._id, {
        transactions: {
          released_transaction_id: res?.hash,
        },
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
    if (review) {
      getProjectById(project._id);
    }
  }, [review]);

  useEffect(() => {
    if (isConnected && submitCount > 0) {
      handleProjectComplete();
    }
  }, [isConnected, submitCount]);

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
                heading={"Review Posted"}
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
                                <DocumentTextIcon className="w-5 h-5" />
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
                  <h3 className="font-medium mt-4">Transactions</h3>
                  <Link
                    href={`https://sepolia.etherscan.io/tx/${project?.data?.transactions?.escrow_transaction_id}`}
                    target="_blank"
                  >
                    Escrow Transaction{" "}
                  </Link>
                  <br />
                  <Link
                    href={`https://sepolia.etherscan.io/tx/${project?.data?.transactions?.released_transaction_id}`}
                    target="_blank"
                  >
                    Released Transaction{" "}
                  </Link>
                </div>
              )}

              {!isEmpty(project) && (
                <ProjectCompleteModal
                  open={isOpen}
                  setOpen={setIsOpen}
                  project={project.data}
                  isLoading={isCompleting}
                  onComplete={() => {
                    connect();
                    setSubmitCount(submitCount + 1);
                  }}
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
