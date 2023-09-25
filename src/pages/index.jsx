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
