import WarningAlert from "@/components/Alerts/WarningAlert";
import MyProjectsList from "@/components/MyProjectsList";
import ProjectEmptyState from "@/components/EmptyStates/ProjectEmptyState";
import Spinner from "@/components/Spinner";
import { useAccounts } from "@/context/AccountContext";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useProjects } from "@/context/ProjectContext";
import { PlusIcon } from "@heroicons/react/20/solid";

function ClientProjects() {
  const [projects, setProjects] = useState([]);
  const { clientProjects, fetchClientProjects, isLoading, error } = useProjects();
  const { user } = useAccounts();

  useEffect(() => {
    if (user) {
      fetchClientProjects(user?.data?._id);
    }
  }, [user]);

  useEffect(() => {
    if (clientProjects) {
      setProjects(clientProjects.data);
    }
  }, [clientProjects]);

  return (
    <>
      <Head>
        <title>My Projects | ChainWork</title>
      </Head>
      <WebLayout>
        <section className="min-h-screen">
          {user && (
            <WarningAlert>
              <p>
                Your profile is <b>{user.data.profile_completion}%</b> completed. Complete
                your profile to 100% to start posting projects.
              </p>
            </WarningAlert>
          )}
          <div className="container mx-auto m-4 p-4 rounded-md  ">
            <h1 className="text-2xl font-display font-bold text-primary-950 mb-10">
              My Projects
            </h1>
            <div className="my-8 flex justify-between">
              {projects?.length > 0 && (
                <Link
                  href={"/client/projects/create"}
                  className="px-4 py-2 rounded-md border bg-primary-600 hover:bg-primary-500 text-white font-medium text-sm inline-flex gap-2 items-center"
                >
                  <span>
                    <PlusIcon className="w-5 h-5" />
                  </span>
                  <span> New Project</span>
                </Link>
              )}
            </div>

            {isLoading && (
              <div className="text-center">
                <Spinner />
                <span className="font-medium ml-2 text-neutral-500">Loading...</span>
              </div>
            )}

            {!isLoading && error && (
              <div className="">
                <h4 className="text-center my-16 font-medium text-neutral-500 text-lg">
                  Something went wrong while loading your projects. Try refreshing the
                  page.
                </h4>
              </div>
            )}

            {!isLoading && projects?.length <= 0 ? (
              <ProjectEmptyState />
            ) : (
              <MyProjectsList projects={projects} />
            )}
          </div>
        </section>
      </WebLayout>
    </>
  );
}

export default withRouteProtect(ClientProjects, ["client"]);
