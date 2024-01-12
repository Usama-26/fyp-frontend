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
import { useServices } from "@/context/ServiceContext";
const defaultFilters = {
  hourly_rate: { min: 0, max: 0 },
  category: null,
  language: null,
};

export default function ExploreFreelancers() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const { freelancers, getAllFreelancers } = useFreelancer();
  const { categories } = useServices();
  const categoriesList = categories?.data;
  const router = useRouter();

  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };

  const handleCategoryFilter = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleHourlyFilter = (e) => {
    e.target.name === "minRate"
      ? setFilters((prev) => ({
          ...prev,
          hourly_rate: { ...filters.hourly_rate, min: e.target.value },
        }))
      : setFilters((prev) => ({
          ...prev,
          hourly_rate: { ...filters.hourly_rate, max: e.target.value },
        }));
  };

  const applyFilters = () => {
    const { hourly_rate, category, language } = filters;

    const hourlyRateStr =
      hourly_rate.min && hourly_rate.max
        ? `hourly_rate[lte]=${hourly_rate.max}&hourly_rate[gte]=${hourly_rate.min}`
        : "";

    const categoryStr = category ? `&industry=${category}` : "";
    const languageStr = language ? `&language=${language}` : "";
    let filter = `${hourlyRateStr && hourlyRateStr}${categoryStr && categoryStr}${
      languageStr && languageStr
    }`;
    if (filter.startsWith("&")) {
      filter = filter.slice(1, filter.length);
    }
    router.replace(`/explore/freelancers?${filter}`);
  };

  useEffect(() => {
    router.asPath.split("?")[1] && getAllFreelancers(router.asPath.split("?")[1]);
  }, [router.asPath]);

  const clearFilters = () => {
    setFilters(defaultFilters);
    router.replace("/explore/freelancers");
    getAllFreelancers();
  };

  useEffect(() => {
    getAllFreelancers();
  }, []);

  return (
    <>
      <Head>
        <title>Explore Freelancers | ChainWork</title>
      </Head>
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
              <Popup label={"Languages"}></Popup>
              <Popup label={"Category"}>
                <h6 className="text-sm text-neutral-500 mb-2">Categories</h6>
                <div className="space-y-4 w-60">
                  {categoriesList?.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={category.id}
                        name="categoryFilter"
                        type="radio"
                        value={category._id}
                        defaultChecked={filters.category === category._id && true}
                        onChange={handleCategoryFilter}
                        className="h-4 w-4 border-neutral-300 text-primary-600 focus:ring-primary-600"
                      />
                      <label
                        htmlFor={category.id}
                        className="ml-3 block text-sm font-medium leading-6 text-neutral-700"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                  <div onClick={applyFilters} className="mt-2 text-end">
                    <button className=" px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium  inline-flex gap-2 items-center text-sm">
                      Apply
                    </button>
                  </div>
                </div>
              </Popup>
              <Popup label={"Hourly Rate"}>
                <h6 className="text-sm text-neutral-500 mb-2">
                  Select a range for hourly rate
                </h6>
                <div className="flex items-center gap-x-4">
                  <label htmlFor="minRate" className="flex items-center">
                    <span className="font-bold text-lg mr-2">$</span>
                    <input
                      type="number"
                      name="minRate"
                      id="minRate"
                      // value={filters.hourly_rate.min}
                      min={10}
                      max={filters.hourly_rate.max}
                      className="font-semibold p-2 rounded-md border border-neutral-500 focus:ring-2 focus:border-primary-500 placeholder:text-neutral-400 outline-none disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 text-sm"
                      onChange={handleHourlyFilter}
                    />
                  </label>
                  <span className="font-medium">To</span>
                  <label htmlFor="maxRate" className="flex items-center">
                    <span className="font-bold text-lg mr-2">$</span>
                    <input
                      type="number"
                      name="maxRate"
                      id="maxRate"
                      // value={filters.hourly_rate.max}
                      min={filters.hourly_rate.min}
                      max={500}
                      className="font-semibold p-2 rounded-md border border-neutral-500 focus:ring-2 focus:border-primary-500 placeholder:text-neutral-400 outline-none disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 text-sm"
                      onChange={handleHourlyFilter}
                    />
                  </label>
                </div>
                <div onClick={applyFilters} className="mt-2 text-end">
                  <button className=" px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium  inline-flex gap-2 items-center text-sm">
                    Apply
                  </button>
                </div>
              </Popup>
              <button
                onClick={clearFilters}
                className="text-sm hover:underline underline-offset-2 hover:text-primary-500"
              >
                Clear Filters X
              </button>
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
