import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/utils/generics";

const statuses = {
  Completed: "text-green-700 bg-green-50 ring-green-600/20",
  Listed: "text-neutral-600 bg-neutral-50 ring-neutral-500/10",
  Assigned: "text-red-700 bg-red-50 ring-red-600/10",
};

export default function MyProjectsList({ projects }) {
  console.log(projects);
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {projects &&
        projects.map((project) => (
          <li
            key={project._id}
            className="overflow-hidden rounded-xl border border-neutral-200"
          >
            <div className="flex items-center gap-x-4 border-b border-neutral-900/5 bg-neutral-50 p-6">
              <div className="text-sm font-medium leading-6 text-neutral-900">
                {project.title}
              </div>
              <Menu as="div" className="relative ml-auto">
                <Menu.Button className="-m-2.5 block p-2.5 text-neutral-400 hover:text-neutral-500">
                  <span className="sr-only">Open options</span>
                  <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-neutral-50" : "",
                            "block px-3 py-1 text-sm leading-6 text-neutral-900"
                          )}
                        >
                          View<span className="sr-only">, {project.title}</span>
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
                          Edit<span className="sr-only">, {project.title}</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <dl className="-my-3 divide-y divide-neutral-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-neutral-500">Created At</dt>
                <dd className="text-neutral-700">
                  <time dateTime={project.createdAt}>{project.createdAt}</time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-neutral-500">Budget</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-neutral-900">{project.budget}</div>
                  <div
                    className={classNames(
                      statuses[project.status],
                      "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {project.status}
                  </div>
                </dd>
              </div>
            </dl>
          </li>
        ))}
    </ul>
  );
}
