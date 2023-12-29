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
import { useRouter } from "next/router";

const hourlyRateFilter = { minHourlyRate: 10, maxHourlyRate: 10 };

export default function ExploreFreelancers() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const [hourly, setHourly] = useState(hourlyRateFilter);
  const { freelancers, getAllFreelancers } = useFreelancer();
  const router = useRouter();

  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };

  const handleHourlyFilter = (e) => {
    e.target.name === "minRate"
      ? setHourly((prev) => ({ ...prev, minHourlyRate: e.target.value }))
      : setHourly((prev) => ({ ...prev, maxHourlyRate: e.target.value }));
  };

  const applyHourlyFilter = () => {
    router.replace(
      `/explore/freelancers?hourly_rate{gte}=${encodeURIComponent(
        hourly.minHourlyRate
      )}&max_rate=${encodeURIComponent(hourly.maxHourlyRate)}`
    );
  };

  useEffect(() => {
    getAllFreelancers();
  }, []);

  console.log(router?.query);
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
              <Popup label={"Skills"}></Popup>
              <Popup label={"Category"}></Popup>
              <Popup label={"Hourly Rate"}>
                <h6 className="text-sm text-neutral-500 mb-2">
                  Select a range for hourly rate
                </h6>
                <div className="flex gap-x-4">
                  <label htmlFor="minRate" className="flex items-center">
                    <input
                      type="number"
                      name="minRate"
                      id="minRate"
                      value={hourly.minHourlyRate}
                      min={10}
                      max={hourly.maxHourlyRate}
                      className="font-semibold p-2 rounded-md border border-neutral-500 focus:ring-2 focus:border-primary-500 placeholder:text-neutral-400 outline-none disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 text-sm"
                      onChange={handleHourlyFilter}
                    />
                    <span className="font-bold text-lg ml-2">$</span>
                  </label>
                  <label htmlFor="maxRate" className="flex items-center">
                    <input
                      type="number"
                      name="maxRate"
                      id="maxRate"
                      value={hourly.maxHourlyRate}
                      min={hourly.minHourlyRate}
                      max={500}
                      className="font-semibold p-2 rounded-md border border-neutral-500 focus:ring-2 focus:border-primary-500 placeholder:text-neutral-400 outline-none disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 text-sm"
                      onChange={handleHourlyFilter}
                    />
                    <span className="font-bold text-lg ml-2">$</span>
                  </label>
                </div>
                <div onClick={applyHourlyFilter} className="mt-2 text-end">
                  <button className=" px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium  inline-flex gap-2 items-center text-sm">
                    Apply
                  </button>
                </div>
              </Popup>
            </div>
          </div>
        </section>
        <section className="container mx-auto my-10">
          <div className="grid grid-cols-4 gap-4">
            {!isEmpty(freelancers) &&
              freelancers.data.map(
                (freelancer) =>
                  freelancer.profile_completion === 100 && (
                    <ProfileCard key={freelancer.id} data={freelancer} />
                  )
              )}
          </div>
        </section>
      </WebLayout>
    </>
  );
}
