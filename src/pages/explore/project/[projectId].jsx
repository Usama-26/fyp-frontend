import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";
import Spinner from "@/components/Spinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { isEmpty } from "@/utils/generics";
import Chip from "@/components/Chip";
import SimpleNotification from "@/components/Notifications/simple";
import { useProjects } from "@/context/ProjectContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
dayjs.extend(relativeTime);

function ViewProject() {
  const { getProjectById, project, isLoading: isProjectLoading } = useProjects();
  const router = useRouter();
  useEffect(() => {
    getProjectById(router.query.projectId);
  }, [router]);

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
            <div className="flex gap-2">
              <div className="basis-9/12 rounded-md border">
                {isEmpty(project) && isProjectLoading && (
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
                      <div
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: project.data.description }}
                      ></div>
                    </div>
                    <div className=" p-4">
                      <h2 className="font-medium mb-2">Required Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {project.data.tags.map((tag) => (
                          <Chip key={tag} value={tag} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </WebLayout>
      ;
    </>
  );
}

export default withRouteProtect(ViewProject, ["client"]);
