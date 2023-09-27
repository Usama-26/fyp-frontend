import { useState } from "react";
import sampleSkills from "@/json/sample-skills.json";
import WebLayout from "@/layouts/WebLayout";
export default function Home() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };

  return (
    <>
      <WebLayout>
        <Hero />
        {/* <SearchBox
        onSearch={handleSearch}
        query={searchQuery}
        setQuery={setSearchQuery}
        searchArray={skills}
      /> */}
      </WebLayout>
    </>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center text-neutral-50">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-display">
            Knausgaard typewriter readymade marfa
          </h1>
          <p className="mb-8 leading-relaxed">
            Chillwave portland ugh, knausgaard fam polaroid iPhone. Man braid
            swag typewriter affogato, hella selvage wolf narwhal dreamcatcher.
          </p>
          <div className="flex w-full md:justify-start justify-center items-end">
            <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
              <input
                type="text"
                id="hero-field"
                name="hero-field"
                className="w-full bg-neutral-100 rounded border bg-opacity-50 border-neutral-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-neutral-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Get Started
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"></div>
      </div>
    </section>
  );
}
