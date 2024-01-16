import Chip from "@/components/Chip";
import Spinner from "@/components/Spinner";
import { useAccounts } from "@/context/AccountContext";
import { useFreelancer } from "@/context/FreelancerContext";
import { useProjects } from "@/context/ProjectContext";
import WebLayout from "@/layouts/WebLayout";
import { classNames, isEmpty } from "@/utils/generics";
import { Tab } from "@headlessui/react";
import { ChatBubbleOvalLeftEllipsisIcon, StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

let tabs = [
  { name: "Active Projects", count: 0 },
  { name: "Completed Projects", count: 0 },
  { name: "Reviews", count: 0 },
];

const projectsFilter = {
  inProgress: [],
  completed: [],
};

export default function FreelancerProfile() {
  const { isLoggedIn, user } = useAccounts();
  const { getFreelancerById, freelancer, error, isLoading } = useFreelancer();
  const { freelancerProjects, fetchFreelancerProjects } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(projectsFilter);
  const router = useRouter();
  const freelancerData = freelancer?.data || null;

  useEffect(() => {
    if (router.query.freelancerId) {
      getFreelancerById(router.query.freelancerId);
    }
  }, [router]);

  useEffect(() => {
    if (freelancerData) {
      fetchFreelancerProjects(freelancerData._id);
    }
  }, [freelancerData]);

  useEffect(() => {
    if (!isEmpty(freelancerProjects)) {
      const inProgressProjects = freelancerProjects.data.filter(
        (project) => project.status === "assigned"
      );

      const completedProjects = freelancerProjects.data.filter(
        (project) => project.status === "completed"
      );

      tabs[0].count = inProgressProjects.length;
      tabs[1].count = completedProjects.length;

      setFilteredProjects({
        inProgress: inProgressProjects,
        completed: completedProjects,
      });
    }
  }, [freelancerProjects]);

  return (
    <WebLayout>
      <section className="m-8 container mx-auto">
        <div className="flex justify-between gap-x-4 min-h-[24rem]">
          <div className="basis-1/4 border rounded-md p-4 space-y-4">
            {isLoading && !freelancerData && (
              <div className="h-full flex items-center justify-center">
                <Spinner />
                <span>Loading...</span>
              </div>
            )}
            {freelancerData && (
              <>
                <div>
                  <h5 className="font-medium text-neutral-500 mb-2">Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {freelancerData.skills.map((skill) => (
                      <Chip key={skill} value={skill} />
                    ))}
                  </div>
                </div>
                <div className="">
                  <h5 className="font-medium text-neutral-500 mb-2">Languages</h5>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {freelancerData.languages.map((language) => (
                      <div className="space-x-2" key={language.name}>
                        <span>{language.name}</span>
                        <span>.</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h6 className="font-medium">Country</h6>
                  <h6 className="font-medium">{freelancerData.country}</h6>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 fill-amber-500" />
                      <StarIcon className="w-4 h-4 fill-amber-500" />
                      <StarIcon className="w-4 h-4 fill-amber-500" />
                      <StarIcon className="w-4 h-4 fill-amber-500" />
                      <StarIcon className="w-4 h-4 fill-amber-500" />
                    </div>
                    <h6 className="font-medium">(4.5)</h6>
                  </div>
                  <div className="font-medium">${freelancerData.hourly_rate}/hr</div>
                </div>

                <div>
                  {!isLoggedIn && (
                    <Link
                      href={"/auth/signup"}
                      className="block w-full py-2 rounded-md uppercase font-medium text-white text-center bg-primary-500 hover:bg-primary-600"
                    >
                      Contact
                    </Link>
                  )}
                  {isLoggedIn && user?.data?.user_type === "client" && (
                    <Link
                      href={"/auth/signup"}
                      className="block w-full py-2 rounded-md uppercase font-medium text-white text-center bg-primary-500 hover:bg-primary-600"
                    >
                      CONTACT
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="basis-3/4 border rounded-md">
            {isLoading && !freelancerData && (
              <div className="h-full flex items-center justify-center">
                <Spinner />
                <span>Loading...</span>
              </div>
            )}
            {freelancerData && (
              <>
                <div className="p-4 flex flex-wrap items-center justify-between sm:flex-nowrap border-b">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-12 w-12 object-cover rounded-full"
                        src={freelancerData.profile_photo}
                        height={240}
                        width={240}
                        alt={`${freelancerData.firstName} Profile Photo`}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold leading-6 text-neutral-700">
                        {`${freelancerData.firstName} ${freelancerData.lastName[0]}.`}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {freelancerData.profile_title}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    {user?.data?.user_type === "client" && (
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:ring-primary-300 hover:bg-primary-50 hover:text-primary-500"
                      >
                        <ChatBubbleOvalLeftEllipsisIcon
                          className="-ml-0.5 mr-1.5 h-5 w-5 inline-block"
                          aria-hidden="true"
                        />
                        <span>Send Message</span>
                      </button>
                    )}
                  </div>
                </div>
                {/* Profile Information */}
                <div className="p-4 border-b">
                  <h3 className="text-primary-700 text-lg font-semibold">Profile</h3>
                  <div
                    className="mt-2 text-sm prose"
                    dangerouslySetInnerHTML={{ __html: freelancerData.bio }}
                  ></div>
                </div>
                <div className="p-4">
                  <Tab.Group as={"div"}>
                    <Tab.List as="ul" className={"w-full flex border-b"}>
                      {tabs.map((tab, index) => (
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
                      <Tab.Panel></Tab.Panel>
                      <Tab.Panel></Tab.Panel>
                      <Tab.Panel></Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </WebLayout>
  );
}
