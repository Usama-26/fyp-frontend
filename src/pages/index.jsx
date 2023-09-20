import Navbar from "@/components/NavBar";
import SearchBox from "@/components/SearchBox";
import { useState } from "react";
import sampleSkills from "@/json/sample-skills.json";
import ProfileCard from "@/components/ProfileCard";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
export default function Home() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query = searchQuery) => {
    console.log("Actual Query :", query);
  };

  return (
    <>
      <Navbar />
      <ProjectCard />
    </>
  );
}
