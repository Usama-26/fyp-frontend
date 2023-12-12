import { useAccounts } from "@/context/AccountContext";
import { useProjects } from "@/context/ProjectContext";
import { useServices } from "@/context/ServiceContext";
import WebLayout from "@/layouts/WebLayout";
import { isEmpty } from "@/utils/generics";
import { ArrowDownTrayIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewProject() {
  const router = useRouter();
  const { user } = useAccounts();
  const { project, error, isLoading, getProjectById } = useProjects();
  const { categories } = useServices();
  const { projectId } = router.query;

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId);
    }
  }, [projectId]);
  return (
    <WebLayout>
      <div className="max-w-6xl mx-auto my-10 rounded-md shadow-custom-md shadow-neutral-300 p-8">
        <div className="px-4 sm:px-0 flex justify-between">
          <h3 className="text-base font-semibold leading-7 text-neutral-700">
            Project Information
          </h3>
        </div>
        {!isEmpty(project) && categories && (
          <div className="mt-6 border-t border-neutral-100">
            <dl className="divide-y divide-neutral-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-neutral-700">
                  Project Title
                </dt>
                <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  {project.data.title}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-neutral-700">
                  Description
                </dt>
                <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  {project.data.description}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-neutral-700">
                  Category
                </dt>
                <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  {categories &&
                    categories.data.find(
                      (category) => category._id === project.data.category
                    ).name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-neutral-700">
                  Service
                </dt>
                <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  {categories &&
                    categories.data
                      .find((category) => category._id === project.data.category)
                      .sub_categories.find(
                        (subcategory) => subcategory._id === project.data.sub_category
                      ).name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-neutral-700">Budget</dt>
                <dd className="mt-1 text-sm leading-6 font-medium text-neutral-700 sm:col-span-2 capitalize sm:mt-0">
                  ${project.data.budget}{" "}
                  <span className="inline-block px-1 bg-neutral-300 rounded-md font-medium">
                    {project.data.pricing_type}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-neutral-700">
                  Required Skills
                </dt>
                <dd className="mt-1 text-sm leading-6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {project.data.tags.map((tag) => (
                      <li
                        key={tag}
                        className={
                          "inline-flex items-center gap-1 text-xs rounded-lg bg-neutral-500 text-white font-medium py-1.5 px-2"
                        }
                      >
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-neutral-700">
                  Attachments
                </dt>
                <dd className="mt-2 text-sm text-neutral-700 sm:col-span-2 sm:mt-0">
                  {project.data.files.length > 0 ? (
                    <ul
                      role="list"
                      className="divide-y divide-neutral-100 rounded-md border border-neutral-200"
                    >
                      {project.data.files.map((file) => (
                        <li
                          key={file}
                          className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                        >
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon
                              className="h-5 w-5 flex-shrink-0 text-neutral-400"
                              aria-hidden="true"
                            />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">
                                resume_back_end_developer.pdf
                              </span>
                              <span className="flex-shrink-0 text-neutral-400">
                                2.4mb
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <ArrowDownTrayIcon className="w-5 h-5" />
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No Attachments</p>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </WebLayout>
  );
}
