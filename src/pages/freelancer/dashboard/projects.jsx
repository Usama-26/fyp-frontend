import ClientDashboardLayout from "@/layouts/ClientDashboardLayout";
import { Fragment, useEffect, useState } from "react";
import { Menu, Tab, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { classNames, isEmpty } from "@/utils/generics";
import { useAccounts } from "@/context/AccountContext";
import { useProjects } from "@/context/ProjectContext";
import Link from "next/link";
import dayjs from "dayjs";
import ProjectEmptyState from "@/components/EmptyStates/ProjectEmptyState";
import FreelancerDashboardLayout from "@/layouts/FreelancerDashboardLayout";
import withRouteProtect from "@/helpers/withRouteProtect";

const statuses = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  Assigned: "text-neutral-600 bg-neutral-50 ring-neutral-500/10",
};

let projectsTabs = [
  { name: "Assigned", count: 0 },
  { name: "Completed", count: 0 },
];

const projectsFilter = {
  inProgress: [],
  completed: [],
};
function FreelancerProjects() {
  const { user } = useAccounts();
  const { freelancerProjects, fetchFreelancerProjects } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(projectsFilter);

  useEffect(() => {
    if (user) {
      fetchFreelancerProjects(user?.data._id);
    }
  }, [user]);

  useEffect(() => {
    if (!isEmpty(freelancerProjects)) {
      const inProgressProjects = freelancerProjects.data.filter(
        (project) => project.status === "assigned"
      );

      const completedProjects = freelancerProjects.data.filter(
        (project) => project.status === "completed"
      );

      projectsTabs[0].count = inProgressProjects.length;
      projectsTabs[1].count = completedProjects.length;

      setFilteredProjects({
        inProgress: inProgressProjects,
        completed: completedProjects,
      });
    }
  }, [freelancerProjects]);

  return (
    <FreelancerDashboardLayout>
      <div className="flex gap-2">
        <div className="basis-9/12 border rounded-md">
          <div className="p-4">
            {freelancerProjects && freelancerProjects?.data?.length !== 0 ? (
              <Tab.Group as={"div"}>
                <Tab.List as="ul" className={"w-full flex border-b"}>
                  {projectsTabs.map((tab, index) => (
                    <Tab
                      key={index}
                      as="li"
                      className={"outline-none focus:outline-none"}
                    >
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
                    <CompletedProjects projects={filteredProjects?.completed} />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            ) : (
              <ProjectEmptyState
                isDisabled={user?.data?.profile_completion !== 100}
                message={"Complete your profile 100% to start posting projects. "}
              />
            )}
          </div>
        </div>
        <div className="basis-3/12 rounded-md border"></div>
      </div>
    </FreelancerDashboardLayout>
  );
}

export default withRouteProtect(FreelancerProjects, ["freelancer"]);

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
          href={`/freelancer/projects/${project._id}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 sm:block"
        >
          View project<span className="sr-only">, {project.title}</span>
        </Link>
      </div>
    </li>
  );
}
