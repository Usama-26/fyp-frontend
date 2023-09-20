import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiStar,
} from "react-icons/hi";
import Chip from "../Chip";

export default function ProfileCard() {
  const skills = ["Laravel", "API", "PHP", "Backend", "Development"];
  return (
    <div className=" p-4 border  space-y-4">
      {/* General Info */}
      <div className="flex gap-4">
        <div>
          <div className="relative">
            <Image
              src={"/images/profiles/profile-1.jpg"}
              height={768}
              width={768}
              alt="Profile Image"
              className="w-16 h-16 rounded-full object-cover"
            />
            <span
              className={`absolute w-4 h-4 border-2 border-white rounded-full bottom-0 right-0 ${"bg-neutral-500"}`}
            ></span>
          </div>
        </div>
        <div className="w-full flex justify-between ">
          <div>
            <h3 className="font-semibold text-lg text-primary-400">
              Jordan K.
            </h3>
            <p className="text-sm text-neutral-500">
              Expert Laravel, PHP Developer
            </p>
            <span className="inline-flex items-center space-x-1">
              <HiOutlineLocationMarker className="inline w-4 h-4 stroke-neutral-700" />
              &nbsp;
              <span className="text-xs">Ohio, United States</span>
            </span>
          </div>
          <div className="self-center flex gap-4">
            <ViewProfileBtn path={"#"} />
            <AddToFavouriteBtn />
          </div>
        </div>
      </div>
      {/* Work Info */}
      <div className="flex justify-between text-sm">
        <span className="inline-flex">
          <HiOutlineBriefcase className="w-5 h-5" />
          &nbsp;
          <span>
            <span className="font-medium">24</span> Projects Completed
          </span>
        </span>
        <span className="inline-flex self-start items-center text-sm font-medium">
          <HiStar className=" w-5 h-5 fill-amber-500" />
          &nbsp;
          <span>5.0 &nbsp;</span>
          <span className="text-neutral-500 font-normal">{"(24 Reviews)"}</span>
        </span>
        <div className="font-medium text-end">
          <span>0.015 ETH/hr</span>
          <br />
          <span className="text-neutral-500">$25/hr</span>
        </div>
      </div>
      {/* Portfolio Description */}
      <div>
        <p className="line-clamp-2 text-sm">
          Hello, and welcome to my portfolio! I am an accomplished PHP Laravel
          developer with over 5 years of dedicated experience in crafting web
          applications that are not just functional but also elegant and
          efficient. Throughout my career, I have had the privilege of working
          on a wide range of projects, each presenting unique challenges that I
          have successfully tackled with my expertise in Laravel.
        </p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {skills.map((skill) => (
          <Chip key={skill} value={skill} />
        ))}
      </div>
    </div>
  );
}

function ViewProfileBtn({ path }) {
  return (
    <Link
      href={path}
      className="px-6 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-700 text-sm font-medium "
    >
      View Profile
    </Link>
  );
}

function AddToFavouriteBtn() {
  const [isFavourite, setIsFavourite] = useState(false);
  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <button
      onClick={toggleFavourite}
      className={`border rounded-md p-2  ${
        isFavourite ? "bg-primary-500" : "hover:bg-neutral-100"
      }`}
    >
      <HiOutlineHeart
        className={`w-4 h-4 ${isFavourite ? "fill-white stroke-white" : ""}`}
      />
    </button>
  );
}
