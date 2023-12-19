import ClientDashboardLayout from "@/layouts/ClientDashboardLayout";
import { Fragment, useEffect, useState } from "react";
import { Menu, Tab, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { classNames, isEmpty } from "@/utils/generics";
import { useAccounts } from "@/context/AccountContext";
import { useProjects } from "@/context/ProjectContext";
import Link from "next/link";
import dayjs from "dayjs";

const statuses = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-neutral-600 bg-neutral-50 ring-neutral-500/10",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

let projectsTabs = [
  { name: "In Progress", count: 0 },
  { name: "Listed", count: 0 },
  { name: "Completed", count: 0 },
];

const projectsFilter = {
  inProgress: [],
  listed: [],
  completed: [],
};
export default function ClientProjects() {
  const { user } = useAccounts();
  const { clientProjects, fetchClientProjects } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(projectsFilter);

  useEffect(() => {
    if (user) {
      fetchClientProjects(user?.data._id);
    }
  }, [user]);

  useEffect(() => {
    if (!isEmpty(clientProjects)) {
      const inProgressProjects = clientProjects.data.filter(
        (project) => project.status === "in progress"
      );

      const listedProjects = clientProjects.data.filter(
        (project) => project.status === "listed"
      );

      const completedProjects = clientProjects.data.filter(
        (project) => project.status === "completed"
      );

      projectsTabs[0].count = inProgressProjects.length;
      projectsTabs[1].count = listedProjects.length;
      projectsTabs[2].count = completedProjects.length;

      setFilteredProjects({
        inProgress: inProgressProjects,
        listed: listedProjects,
        completed: completedProjects,
      });
    }
  }, [clientProjects]);

  return (
    <ClientDashboardLayout>
      <div className="flex gap-2">
        <div className="basis-9/12 border rounded-md">
          <div className="p-4">
            <Tab.Group as={"div"}>
              <Tab.List as="ul" className={"w-full flex border-b"}>
                {projectsTabs.map((tab, index) => (
                  <Tab key={index} as="li" className={"outline-none focus:outline-none"}>
                    {({ selected }) => (
                      <button
                        className={classNames(
                          selected
                            ? "text-primary-700  border-primary-700"
                            : "border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-700",
                          "p-4 text-sm border-b-2 focus:outline-none font-medium"
                        )}
                      >
                        {`${tab.name} (${tab.count})`}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels as="div" className={"p-4"}>
                <Tab.Panel>
                  <InProgressProjects projects={filteredProjects?.inProgress} />
                </Tab.Panel>
                <Tab.Panel>
                  <ListedProjects projects={filteredProjects?.listed} />
                </Tab.Panel>
                <Tab.Panel>
                  <CompletedProjects projects={filteredProjects?.completed} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className="basis-3/12 rounded-md border"></div>
      </div>
    </ClientDashboardLayout>
  );
}

function InProgressProjects({ projects }) {
  return (
    <ul role="list" className=" space-y-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </ul>
  );
}

function ListedProjects({ projects }) {
  return (
    <ul role="list" className=" space-y-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </ul>
  );
}

function CompletedProjects({ projects }) {
  return (
    <ul role="list" className=" space-y-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </ul>
  );
}

function ProjectCard({ project }) {
  // console.log(project);
  return (
    <li
      key={project.id}
      className="flex items-center justify-between rounded-md bg-white px-6 py-4 shadow-custom-md shadow-neutral-300"
    >
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p className="text-sm font-semibold leading-6 text-neutral-900">
            {project.title}
          </p>
          <p
            className={classNames(
              statuses[project.status],
              "rounded-md capitalize whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
            )}
          >
            {project.status}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-neutral-500">
          <p className="whitespace-nowrap">
            Due on{" "}
            <time dateTime={project.deadline}>
              {dayjs(project.deadline).format("DD/MM/YY")}
            </time>
          </p>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <Link
          href={`/client/projects/${project._id}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 sm:block"
        >
          View project<span className="sr-only">, {project.title}</span>
        </Link>
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-neutral-500 hover:text-neutral-900">
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-neutral-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-neutral-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-neutral-900"
                    )}
                  >
                    Edit<span className="sr-only">, {project.title}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-neutral-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-neutral-900"
                    )}
                  >
                    Delete
                    <span className="sr-only">, {project.title}</span>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}
