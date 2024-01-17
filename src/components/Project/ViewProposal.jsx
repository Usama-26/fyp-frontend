import { useAccounts } from "@/context/AccountContext";
import { useProposals } from "@/context/ProposalContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Spinner from "../Spinner";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import CheckoutModal from "../Modals/CheckoutModal";
import { isEmpty } from "@/utils/generics";
import dayjs from "dayjs";

export default function ViewProposal({ open, setOpen, proposalId, project }) {
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
                                  href={`/explore/freelancer/${freelancer?._id}`}
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
                                      <StarIcon
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

                      <CheckoutModal
                        project={project}
                        open={isCheckoutOpen}
                        setOpen={setIsCheckoutOpen}
                        proposal={proposal.data}
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
