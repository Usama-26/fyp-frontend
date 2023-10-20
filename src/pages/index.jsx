import { useState } from "react";
import sampleSkills from "@/json/sample-skills.json";
import WebLayout from "@/layouts/WebLayout";
import SearchBox from "@/components/SearchBox";
export default function Home() {
  return (
    <>
      <WebLayout>
        <Hero />
      </WebLayout>
    </>
  );
}

function Hero() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };

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

          <SearchBox
            onSearch={handleSearch}
            query={searchQuery}
            setQuery={setSearchQuery}
            searchArray={skills}
          />
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"></div>
      </div>
    </section>
  );
}
