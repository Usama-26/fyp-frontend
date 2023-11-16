import Spinner from "@/components/Spinner";
import { BASE_URL } from "@/constants";
import { useAccounts } from "@/context/AccountContext";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import { getData } from "@/utils/api/genericAPI";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

function ClientProjects() {
  const [projects, setProjects] = useState([]);
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
    <>
      <Head>
        <title>My Projects | ChainWork</title>
      </Head>
      <WebLayout>
        <section className="min-h-screen">
          <div className="container mx-auto m-4 p-4 rounded-md  ">
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
              <div className="text-center">
                <Spinner />
                <span className="font-medium ml-2 text-neutral-500">Loading...</span>
              </div>
            )}
            {!isLoading && error && (
              <div className="">
                <h4 className="text-center my-16 font-medium text-neutral-500 text-lg">
                  Something went wront. Please try again later
                </h4>
              </div>
            )}
            {!isLoading && projects?.length === 0 && (
              <div className="">
                <h4 className="text-center my-16 font-medium text-neutral-500 text-lg">
                  Nothing to show here. Start by adding new project
                </h4>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              {!isLoading &&
                projects &&
                projects.map((project, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-md shadow-custom-md shadow-neutral-300 space-y-4"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-lg font-semibold text-primary-700">
                        {project.title}
                      </h4>
                      <Link
                        href={`/client/projects/edit/${project._id}`}
                        className="inline-block p-1.5 rounded-full hover:bg-neutral-200"
                      >
                        <BiPencil className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        <span className="capitalize">Project Scope: {project.scope}</span>
                        <br />
                        <span>Deadline: {project.deadline}</span>
                      </span>
                      <span className="text-end text-xl">
                        <span className=" font-semibold">{` ${project.budget}${
                          project.pricing_type === "fixed" ? "$" : "$/hr"
                        }`}</span>
                        <br />
                      </span>
                    </div>
                    <p className="text-sm line-clamp-4">{project.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </WebLayout>
    </>
  );
}

export default withRouteProtect(ClientProjects, ["client"]);
