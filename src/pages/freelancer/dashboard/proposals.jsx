import Spinner from "@/components/Spinner";
import { useAccounts } from "@/context/AccountContext";
import { useProposals } from "@/context/ProposalContext";
import FreelancerDashboardLayout from "@/layouts/FreelancerDashboardLayout";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function FreelancerProposals() {
  const { freelancerProposals, fetchFreelancerProposals } = useProposals();
  const router = useRouter();
  const { user } = useAccounts();

  useEffect(() => {
    if (user) {
      fetchFreelancerProposals(user.data._id);
    }
  }, [user]);
  console.log(freelancerProposals);
  return (
    <FreelancerDashboardLayout>
      <div className="flex gap-2">
        <div className="basis-9/12 rounded-md">
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
          >
            {/* {freelancerProposals &&
              freelancerProposals?.data?.map((project) => (
                <li
                  key={project._id}
                  className="overflow-hidden rounded-xl border border-neutral-200"
                >
                  <div className="flex items-center gap-x-8 border-b border-neutral-900/5 bg-neutral-50 p-6">
                    <div className="text-sm font-medium leading-6 text-neutral-900">
                      <h1>{project.title}</h1>
                    </div>
                    <Menu as="div" className="relative ml-auto">
                      <Menu.Button className="-m-2.5 block p-1.5 border hover:border-neutral-600 rounded-full text-neutral-500 hover:text-neutral-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-neutral-900/5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/client/projects/${project._id}`}
                                className={classNames(
                                  active ? "bg-neutral-100" : "",
                                  "block px-3 py-1 text-sm leading-6 text-neutral-900"
                                )}
                              >
                                View
                              </Link>
                            )}
                          </Menu.Item>
                          {project.status === "listed" && (
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setDeleteDialogOpen(true);
                                    setProjectId(project._id);
                                  }}
                                  className={classNames(
                                    active ? "bg-danger-100" : "",
                                    "block w-full text-left px-3 py-1 text-sm leading-6 text-danger-700"
                                  )}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <dl className="-my-3 divide-y divide-neutral-100 px-6 py-4 text-sm leading-6">
                    <div className="flex justify-between items-center">
                      <dl className="font-medium">
                        <dt>Deadline</dt>
                        <dd>{dayjs(project.deadline).format("DD/MM/YYYY")}</dd>
                      </dl>
                      <div className="flex justify-end font-medium gap-x-8 py-3">
                        <dt className=" text-center">
                          <span className="text-lg font-semibold text-primary-700">
                            {project.pricing_type === "hourly"
                              ? `$${project.budget}/hr`
                              : `$${project.budget}`}
                          </span>
                          <br />
                          <span>Budget</span>
                        </dt>
                        <dt className=" text-center">
                          <span className="text-lg font-semibold text-primary-700">
                            {project.proposals.length}
                          </span>
                          <br />
                          <span>Proposals</span>
                        </dt>
                      </div>
                    </div>
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-neutral-500">
                        Posted{" "}
                        <time dateTime={project.createdAt}>
                          {dayjs(project.createdAt).fromNow()}
                        </time>
                      </dt>
                      <dt
                        className={classNames(
                          statuses[project.status],
                          "px-2 capitalize rounded-md ring-1"
                        )}
                      >
                        {project.status}
                      </dt>
                    </div>
                  </dl>
                </li>
              ))} */}
          </ul>
        </div>
        <UserInfo />
      </div>
    </FreelancerDashboardLayout>
  );
}

function UserInfo({}) {
  const { user, isLoading } = useAccounts();

  return <div className="basis-3/12 rounded-md border"></div>;
}
