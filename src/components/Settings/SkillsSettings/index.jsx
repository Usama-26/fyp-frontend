import ReactSelect from "react-select";
import skills from "@/json/select-skills";
import { useState } from "react";

export default function SkillsSettings() {
  const [selectedSkills, setSelectedSkills] = useState(null);
  const handleSelectedSkills = (values) => {
    setSelectedSkills(values);
  };

  return (
    <div className="space-y-2">
      <h1 className="font-semibold">Skills & Experiences</h1>
      <ReactSelect
        options={skills}
        isMulti
        onChange={handleSelectedSkills}
        placeholder="Select Skills"
      />
      <div className=" text-end">
        <button
          type="submit"
          className="font-medium px-2 py-1.5 rounded bg-primary-500 hover:bg-primary-700 text-white text-sm"
        >
          Update
        </button>
      </div>
    </div>
  );
}
