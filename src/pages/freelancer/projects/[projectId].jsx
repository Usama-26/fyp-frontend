import { useProjects } from "@/context/ProjectContext";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useFreelancer } from "@/context/FreelancerContext";
import Spinner from "@/components/Spinner";
import { useClient } from "@/context/ClientContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isEmpty } from "@/utils/generics";
import { ArrowDownTrayIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Chip from "@/components/Chip";
import { BiFile } from "react-icons/bi";
import FileDropzone from "@/components/FIleDropzone";
dayjs.extend(relativeTime);

function ViewProject() {
  const { project, isLoading: isProjectLoading, getProjectById } = useProjects();
  const router = useRouter();
  const {
    sendDeliverables,
    isLoading: sendingDeliverables,
    successMessage,
  } = useFreelancer();

  const [deliverables, setDeliverables] = useState([]);

  const handleSendDeliverables = () => {
    sendDeliverables(project.data._id, deliverables);
  };

  useEffect(() => {
    getProjectById(router.query.projectId);
  }, [router]);

  useEffect(() => {
    if (successMessage) {
      getProjectById(router.query.projectId);
      setDeliverables([]);
    }
  }, [successMessage]);

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
            {/* {successMessage && (
              <SimpleNotification
                heading={"Proposal Sent"}
                message={
                  "Your proposal submitted successfully. We'll notify you if client reviews your proposal. "
                }
              />
            )} */}
            <div className="flex gap-2">
              <div className="basis-9/12 rounded-md border">
                {isProjectLoading && isEmpty(project) && (
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
                      <p className="text-sm">{project.data.description}</p>
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
                        <p>No Attachments</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="basis-3/12 rounded-md border">
                {!isEmpty(project) && project.data.status === "assigned" && (
                  <div className="px-2 py-4">
                    <h6 className="font-semibold mb-2">Submit Deliverables</h6>
                    <FileDropzone files={deliverables} setFiles={setDeliverables} />
                    {deliverables.length > 0 && (
                      <div className="space-x-2 text-end mt-2">
                        <button
                          type="button"
                          className="font-medium px-2 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300  text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSendDeliverables}
                          disabled={deliverables.length === 0 || sendingDeliverables}
                          className="bg-primary-500 font-medium px-2 py-1.5 text-sm rounded-md hover:bg-primary-700 text-white disabled:bg-neutral-100 disabled:text-neutral-500 "
                        >
                          {sendingDeliverables ? <Spinner /> : "Send"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {!isEmpty(project) && project.data.status === "completed" && (
                  <div className=" rounded-md py-4 px-1">
                    <div>
                      <CheckCircleIcon className="w-28 h-28 mx-auto fill-success-600" />
                      <h3 className="font-semibold text-center">
                        Project is Completed Successfully.
                      </h3>
                    </div>
                  </div>
                )}

                <div className="mt-2">
                  <h6 className="font-medium mb-4 px-1"> Past Deliveries</h6>
                  <div className="border px-1 py-4 text-center">
                    {project?.data?.deliverables?.length > 0 ? (
                      <ul>
                        {project.data.deliverables.map((file) => (
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
                      <p className="text-center">No Deliverables Yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </WebLayout>
      ;
    </>
  );
}

export default withRouteProtect(ViewProject, ["freelancer"]);
