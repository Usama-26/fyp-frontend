import { BsClockHistory } from "react-icons/bs";
import { FaRegDotCircle } from "react-icons/fa";
import { TbClockCheck } from "react-icons/tb";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Chip from "../Chip";
import { useAccounts } from "@/context/AccountContext";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { useServices } from "@/context/ServiceContext";
import { useClient } from "@/context/ClientContext";
import { isEmpty } from "@/utils/generics";

export default function ProjectCard(props) {
  dayjs.extend(relativeTime);
  const [view, setView] = useState(false);

  return (
    <div className="p-4 border">
      <div className="flex justify-between">
        <div className="basis-9/12 space-y-4">
          <div className="flex">
            <h1 className="text-xl font-semibold text-primary-700 hover:underline underline-offset-2">
              {props.title}
            </h1>
          </div>
          <div className="grid grid-cols-5 text-sm">
            <div className="inline-flex items-center gap-1">
              <BsClockHistory className="w-5 h-5 fill-neutral-500" />
              <span>
                <span>{dayjs(props.createdAt).fromNow()}</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-1">
              <TbClockCheck className="w-5 h-5 stroke-neutral-500" />
              <span>{dayjs(props.deadline).fromNow(true)}</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <FaRegDotCircle className="w-5 h-5 fill-neutral-500" />
              <span> {props.proposals.length} Proposals</span>
            </div>
          </div>
          <div>
            <p className="text-sm line-clamp-2">{props.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {props.tags.map((tag) => (
              <Chip key={tag} value={tag} />
            ))}
          </div>
        </div>
        <div className="basis-2/12 flex flex-col gap-4 text-end">
          <div>
            <span className="text-3xl font-bold text-primary-700">${props.budget}</span>
            <small className="uppercase text-neutral-500 block">
              {props.pricing_type}
            </small>
          </div>
          <button
            onClick={() => setView(true)}
            type="button"
            className="py-2  text-center uppercase text-primary-700 border rounded-lg border-primary-700 font-medium hover:text-white hover:bg-primary-700 text-sm"
          >
            View Project
          </button>
        </div>
      </div>
      <ViewProject open={view} setOpen={setView} projectData={props} />
    </div>
  );
}

function ViewProject({ open, setOpen, projectData }) {
  const { categories, services, subCategories } = useServices();
  const { getClientById, client } = useClient();
  const { user } = useAccounts();

  useEffect(() => {
    getClientById(projectData.created_by);
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Project Information
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="relative flex-1 mt-6 px-4 sm:px-6 space-y-6 divide-y border-r">
                        <h1 className="font-semibold text-2xl text-primary-500 font-display mb-6">
                          {projectData.title}
                        </h1>
                        <p className="py-4">{projectData.description}</p>
                        {categories && !isEmpty(subCategories) && !isEmpty(services) ? (
                          <div>
                            <h5 className="font-medium py-2 text-base">Under</h5>
                            <ul className="flex items-center gap-2">
                              <li className="rounded-md bg-neutral-100 p-1 ">
                                {
                                  categories?.data?.find(
                                    (category) => category._id === projectData.category
                                  ).name
                                }
                              </li>
                              <li>
                                <ChevronRightIcon className="h-4 w-4" />
                              </li>
                              <li className="rounded-md bg-neutral-100 p-1">
                                {
                                  subCategories?.data?.find(
                                    (subcategory) =>
                                      subcategory._id === projectData.sub_category
                                  ).name
                                }
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div>
                          <h5 className="font-medium py-2 text-base">Required Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {projectData.tags[0].split(",").map((tag) => (
                              <Chip key={tag} value={tag} />
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="pt-4 flex justify-between max-w-lg">
                            <div>
                              <h6 className="font-medium mb-1">Deadline</h6>
                              <p>{dayjs(projectData.deadline).format("MM/DD/YYYY")}</p>
                            </div>
                            <div>
                              <h6 className="font-medium mb-1">
                                {`${
                                  projectData.pricing_type === "hourly"
                                    ? "Hourly Rate"
                                    : "Fixed Budget"
                                }`}
                              </h6>
                              <p className="font-semibold text-base">
                                ${projectData.budget}
                              </p>
                            </div>
                            <div>
                              <h6 className="font-medium mb-1">Posted</h6>
                              <p>{dayjs(projectData.createdAt).fromNow()}</p>
                            </div>
                          </div>
                        </div>
                        {/* Client Information */}
                        <div>
                          <h5 className="font-medium py-2 text-base">
                            Client Information
                          </h5>
                          {!isEmpty(client) && (
                            <div className="pt-4 flex justify-between max-w-xl">
                              <div>
                                <h6 className="font-medium mb-1">Member since</h6>
                                <p>
                                  {dayjs(client.data.createdAt).format("MMMM DD, YYYY")}
                                </p>
                              </div>
                              <div>
                                <h6 className="font-medium mb-1">Projects Posted</h6>
                                <p>{client.data.projects.length}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="basis-1/4 py-10 px-6 text-center">
                        {user && user.data.user_type === "freelancer" ? (
                          user.data.profile_completion === 100 ? (
                            <Link
                              href={
                                projectData.proposals.some(
                                  (proposal) => proposal.freelancer_id === user.data._id
                                )
                                  ? `/freelancer/proposals/`
                                  : `/freelancer/proposals/send/${projectData._id}`
                              }
                              className="block py-1.5 px-4 text-base uppercase text-center text-primary-700 border rounded-lg border-primary-700 font-medium hover:text-white hover:bg-primary-700"
                            >
                              {projectData.proposals.some(
                                (proposal) => proposal.freelancer_id === user.data._id
                              )
                                ? "View Proposals"
                                : "Send Proposal"}
                            </Link>
                          ) : (
                            <Link
                              href="/freelancer/profile/settings"
                              className="block py-1.5 px-4 uppercase text-center text-primary-700 border rounded-lg border-primary-700 font-medium hover:text-white hover:bg-primary-700"
                            >
                              Complete Profile
                            </Link>
                          )
                        ) : user && user.data.user_type === "client" ? (
                          <Link
                            href={`/client/projects/${projectData._id}`}
                            className="block py-1.5 px-4 uppercase text-center text-primary-700 border rounded-lg border-primary-700 font-medium hover:text-white hover:bg-primary-700"
                          >
                            View Project
                          </Link>
                        ) : (
                          <Link
                            href="/freelancer/join"
                            className="block py-1.5 px-4 uppercase text-center text-primary-700 border rounded-lg border-primary-700 font-medium hover:text-white hover:bg-primary-700"
                          >
                            Sign up
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
