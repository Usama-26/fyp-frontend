import ProjectCard from "@/components/ProjectCard";
import SearchBox from "@/components/SearchBox";
import WebLayout from "@/layouts/WebLayout";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useProjects } from "@/context/ProjectContext";
import { useServices } from "@/context/ServiceContext";
import { useRouter } from "next/router";

export default function ExploreProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const { skills, fetchSkills } = useServices();
  const { projects, error, isLoading, fetchProjects } = useProjects();
  const router = useRouter();
  const skillsArray = skills?.data?.map((skill) => skill.name) || null;
  let searchStr = "";

  const handleSearch = (query = searchQuery) => {
    searchStr = query ? `tags[in]=${query}` : "";
    applyFilters();
  };

  const applyFilters = () => {
    let filter = `${searchStr && searchStr}`;

    if (filter.startsWith("&")) {
      filter = filter.slice(1, filter.length);
    }
    router.replace(`/explore/projects?${filter}`);
  };

  useEffect(() => {
    router.asPath.split("?")[1] && fetchProjects(router.asPath.split("?")[1]);
  }, [router.asPath]);

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  return (
    <>
      <Head>
        <title>Explore Projects | ChainWork</title>
      </Head>
      <WebLayout>
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12 text-center text-white">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-display">
            Explore the World of Opportunities
          </h1>
          <p className="text-lg">Discover Freelance Projects to bid on</p>
          <div className="container max-w-5xl mx-auto mt-5">
            {skillsArray && (
              <SearchBox
                onSearch={handleSearch}
                query={searchQuery}
                setQuery={setSearchQuery}
                searchArray={skillsArray}
                placeholder="Search Freelancers..."
              />
            )}
          </div>
        </section>
        <section className="my-8">
          <div className="container mx-auto flex gap-8">
            <div className="basis-3/12 border p-4">
              <h2 className="text-xl font-semibold">Filters</h2>
            </div>
            <div className="basis-9/12 space-y-2">
              {projects.length === 0 && (
                <p className="text-xl text-neutral-500 text-center italic">
                  No Projects Found under {searchQuery}
                </p>
              )}
              {projects?.data?.map(
                (project, index) =>
                  project.status === "listed" && <ProjectCard key={index} {...project} />
              )}
            </div>
          </div>
        </section>
      </WebLayout>
    </>
  );
}
