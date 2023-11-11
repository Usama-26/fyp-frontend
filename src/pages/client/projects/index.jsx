import { BASE_URL } from "@/constants";
import { useAccounts } from "@/context/AccountContext";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import { getData } from "@/utils/api/genericAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

function ClientProjects() {
  const [projects, setProjects] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAccounts();

  const fetchProjects = async (userId, token) => {
    setIsLoading(true);
    try {
      const response = await getData(
        `${BASE_URL}/projects/get_client_projects/${userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(response.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (user && token) {
      fetchProjects(user?.data?._id, token);
    }
  }, [user]);

  return (
    <WebLayout>
      <section className="h-screen">
        <div className="max-w-7xl mx-auto m-4 p-4 rounded-md  ">
          <h1 className="text-2xl font-display font-bold text-primary-950">
            My Projects
          </h1>

          <div className="my-8 flex justify-between">
            <Link
              href={"/client/projects/create"}
              className="px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 text-white font-medium  inline-flex gap-2 items-center"
            >
              <span>Post New Project</span>
              <span>
                <FaPlus className="inline" />
              </span>
            </Link>
          </div>
          {isLoading && (
            <div className="">
              <h4 className="text-center my-16 font-medium text-neutral-500 text-lg">
                Loading...
              </h4>
            </div>
          )}
          {error && (
            <div className="">
              <h4 className="text-center my-16 font-medium text-neutral-500 text-lg">
                Something went wront. Please try again later
              </h4>
            </div>
          )}
          {projects?.length === 0 && (
            <div className="">
              <h4 className="text-center my-16 font-medium text-neutral-500 text-lg">
                Nothing to show here. start by adding new project
              </h4>
            </div>
          )}
          <div className="grid grid-cols-3">
            {projects &&
              projects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 rounded-md shadow-custom-md shadow-neutral-300 space-y-4"
                >
                  <h4 className="text-lg font-semibold text-primary-700">
                    {project.title}
                  </h4>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      <span className="capitalize">Project Scope: {project.scope}</span>
                      <br />
                      <span>Deadline: {project.deadline}</span>
                    </span>
                    <span className="text-end ">
                      <span className=" font-semibold">{project.budget}$</span>
                      <br />
                      <span className="capitalize">{project.pricing_type}</span>
                    </span>
                  </div>
                  <p className="text-sm line-clamp-4">{project.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </WebLayout>
  );
}

export default withRouteProtect(ClientProjects, ["client"]);
