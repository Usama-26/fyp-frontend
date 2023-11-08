import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiStar,
} from "react-icons/hi";

export default function ProfileCard() {
  return (
    <div className=" p-4 border space-y-4 rounded-md">
      {/* General Info */}
      <div className="text-center">
        <div className="inline-block relative">
          <Image
            src={"/images/profiles/profile-1.jpg"}
            height={768}
            width={768}
            alt="Profile Image"
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
          <span
            className={`absolute w-4 h-4 border-2 border-white bottom-0 right-3 rounded-full ${"bg-neutral-500"}`}
          ></span>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="font-semibold text-lg text-primary-400">Jordan K.</h3>
        <p className="text-sm text-neutral-500">
          Expert Laravel, PHP Developer
        </p>
        <span className="inline-flex items-center space-x-1">
          <HiOutlineLocationMarker className="inline w-4 h-4 stroke-neutral-700" />
          &nbsp;
          <span className="text-xs">Ohio, United States</span>
        </span>
        <br />
        <span className="inline-flex self-start items-center text-sm font-medium">
          <HiStar className=" w-5 h-5 fill-amber-500" />
          &nbsp;
          <span>5.0 &nbsp;</span>
          <span className="text-neutral-500 font-normal">{"(24 Reviews)"}</span>
        </span>
      </div>

      {/* Work Info */}
      <div className="flex justify-between text-xs">
        <span className="inline-flex">
          <HiOutlineBriefcase className="w-5 h-5" />
          &nbsp;
          <span>
            <span className="font-medium">24</span> Projects Completed
          </span>
        </span>

        <div className="font-medium text-end">
          <span>0.015 ETH/hr</span>
          <br />
          <span className="text-neutral-500">$25/hr</span>
        </div>
      </div>
      <div>
        <ViewProfileBtn path={"#"} />
      </div>
    </div>
  );
}

function ViewProfileBtn({ path }) {
  return (
    <Link
      href={path}
      className="w-full inline-block text-center px-6 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-700 text-sm font-medium "
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
