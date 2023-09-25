import Navbar from "@/components/NavBar";
import { useState } from "react";
import sampleSkills from "@/json/sample-skills.json";
import ServiceExplorer from "@/components/ServiceExplorer";

export default function Home() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };

  return (
    <>
      <Navbar />
      {/* <SearchBox
        onSearch={handleSearch}
        query={searchQuery}
        setQuery={setSearchQuery}
        searchArray={skills}
      /> */}
      <ServiceExplorer />
    </>
  );
}
