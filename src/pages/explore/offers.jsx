import ProjectCard from "@/components/ProjectCard";
import SearchBox from "@/components/SearchBox";
import WebLayout from "@/layouts/WebLayout";

import sampleSkills from "@/json/sample-skills.json";
import { useState } from "react";
import Popup from "@/components/Popup";
import ProfileCard from "@/components/ProfileCard";
import ServiceCard from "@/components/ServiceCard";

export default function ExploreFreelancers() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };
  return (
    <WebLayout>
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12 text-center text-white">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-display">
          Unlock Exclusive Offers
        </h1>
        <p className="text-lg">Explore Freelance Marketplace Deals</p>
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Exercitationem eligendi cum natus ducimus quasi eos eius ad
                assumenda, fugiat laboriosam aperiam officiis, qui saepe. Ipsum,
                quas nesciunt! Labore, fugit natus.
              </p>
            </Popup>
            <Popup label={"Category"}>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Exercitationem eligendi cum natus ducimus quasi eos eius ad
                assumenda, fugiat laboriosam aperiam officiis, qui saepe. Ipsum,
                quas nesciunt! Labore, fugit natus.
              </p>
            </Popup>
            <Popup label={"Hourly Rate"}>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Exercitationem eligendi cum natus ducimus quasi eos eius ad
                assumenda, fugiat laboriosam aperiam officiis, qui saepe. Ipsum,
                quas nesciunt! Labore, fugit natus.
              </p>
            </Popup>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-10">
        <grid className="grid grid-cols-4 gap-4">
          <ServiceCard />
        </grid>
      </section>
    </WebLayout>
  );
}
