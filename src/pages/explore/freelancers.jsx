import ProjectCard from "@/components/ProjectCard";
import SearchBox from "@/components/SearchBox";
import WebLayout from "@/layouts/WebLayout";

import sampleSkills from "@/json/sample-skills.json";
import { useEffect, useState } from "react";
import Popup from "@/components/Popup";
import ProfileCard from "@/components/ProfileCard";
import Head from "next/head";
import { useFreelancer } from "@/context/FreelancerContext";
import { isEmpty } from "@/utils/generics";

export default function ExploreFreelancers() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");

  const { freelancers, getAllFreelancers } = useFreelancer();

  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };

  useEffect(() => {
    getAllFreelancers();
  }, []);

  return (
    <>
      <Head>Explore Freelancers | ChainWork</Head>
      <WebLayout>
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12 text-center text-white">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-display">
            Meet the Talent
          </h1>
          <p className="text-lg">
            Browse Freelancers on Our Marketplace that suit your need
          </p>
          <div className="max-w-5xl mx-auto mt-5">
            <SearchBox
              onSearch={handleSearch}
              query={searchQuery}
              setQuery={setSearchQuery}
              searchArray={skills}
              placeholder="Search Freelancers..."
            />
          </div>
        </section>
        <section className="my-8">
          <div className="container mx-auto mt-10">
            <div className="flex gap-4">
              <Popup label={"Skills"}>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem
                  eligendi cum natus ducimus quasi eos eius ad assumenda, fugiat
                  laboriosam aperiam officiis, qui saepe. Ipsum, quas nesciunt! Labore,
                  fugit natus.
                </p>
              </Popup>
              <Popup label={"Category"}>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem
                  eligendi cum natus ducimus quasi eos eius ad assumenda, fugiat
                  laboriosam aperiam officiis, qui saepe. Ipsum, quas nesciunt! Labore,
                  fugit natus.
                </p>
              </Popup>
              <Popup label={"Hourly Rate"}>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem
                  eligendi cum natus ducimus quasi eos eius ad assumenda, fugiat
                  laboriosam aperiam officiis, qui saepe. Ipsum, quas nesciunt! Labore,
                  fugit natus.
                </p>
              </Popup>
            </div>
          </div>
        </section>
        <section className="container mx-auto my-10">
          <div className="grid grid-cols-4 gap-4">
            {!isEmpty(freelancers) &&
              freelancers.data.map((freelancer) => (
                <ProfileCard key={freelancer.id} data={freelancer} />
              ))}
          </div>
        </section>
      </WebLayout>
    </>
  );
}
