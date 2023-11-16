import ProjectCard from "@/components/ProjectCard";
import SearchBox from "@/components/SearchBox";
import WebLayout from "@/layouts/WebLayout";

import sampleSkills from "@/json/sample-skills.json";
import { useEffect, useState } from "react";
import { getData } from "@/utils/api/genericAPI";
import { BASE_URL } from "@/constants";
import Head from "next/head";

export default function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };

  const fetchProjects = async () => {
    try {
      const response = await getData(`${BASE_URL}/projects`);

      setProjects(response?.data?.data);
    } catch (error) {
      setError("Something went wrong while loading projects.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Head>Explore Projects | ChainWork</Head>
      <WebLayout>
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12 text-center text-white">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-display">
            Explore the World of Opportunities
          </h1>
          <p className="text-lg">Discover Freelance Projects to bid on</p>
          <div className="container mx-auto mt-5">
            <SearchBox
              onSearch={handleSearch}
              query={searchQuery}
              setQuery={setSearchQuery}
              searchArray={skills}
              placeholder="Search Projects..."
            />
          </div>
        </section>
        <section className="my-8">
          <div className="container mx-auto flex gap-8">
            <div className="basis-3/12 border p-4">
              <h2 className="text-xl font-semibold">Filters</h2>
            </div>
            <div className="basis-9/12 space-y-2">
              {projects?.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>
      </WebLayout>
    </>
  );
}
