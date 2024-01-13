import { useProjects } from "@/context/ProjectContext";
import { fetchCurrencyRate } from "@/utils/generics";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineHeart,
  HiStar,
} from "react-icons/hi";

export default function ProfileCard({ data }) {
  const { fetchFreelancerProjects, freelancerProjects } = useProjects();
  const completedProjects = freelancerProjects?.data?.filter(
    (project) => project.status === "completed"
  );

  useEffect(() => {
    fetchFreelancerProjects(data._id);
  }, []);

  return (
    <div className=" p-4 border space-y-4 rounded-md">
      {/* General Info */}
      <div className="text-center">
        <div className="inline-block relative">
          {data.profile_photo ? (
            <Image
              src={data.profile_photo}
              height={768}
              width={768}
              alt="Profile Image"
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
          ) : (
            <span className="w-24 h-24 flex justify-center items-center rounded-full text-4xl text-center text-white font-semibold bg-primary-500">
              {data.firstName[0]}
            </span>
          )}
          <span
            className={`absolute w-4 h-4 border-2 border-white bottom-0 right-3 rounded-full ${"bg-neutral-500"}`}
          ></span>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="font-semibold text-lg text-primary-400">
          {data.firstName} {data.lastName[0]}.
        </h3>
        <p className="text-sm text-neutral-500">{data.profile_title}</p>
        <span className="inline-flex items-center space-x-1 text-sm text-neutral-500">
          <HiOutlineLocationMarker className="inline-block w-4 h-4 " />
          &nbsp;
          <span>{data.country}</span>
        </span>
        <br />
        <span className="inline-flex self-start items-center text-sm font-medium">
          <HiStar className=" w-5 h-5 fill-amber-500" />
          &nbsp;
          <span>0.0 &nbsp;</span>
          <span className="text-neutral-500 font-normal">{"(0 Reviews)"}</span>
        </span>
      </div>

      {/* Work Info */}
      <div className="flex justify-between text-sm">
        <span className="inline-flex">
          <HiOutlineBriefcase className="w-5 h-5" />
          &nbsp;
          <span>
            <span className="font-medium">{completedProjects?.length}</span> Projects
            Completed
          </span>
        </span>

        <div className="font-medium text-end">
          <span>${data.hourly_rate}/hr</span>
        </div>
      </div>
      <div>
        <ViewProfileBtn path={`/explore/freelancer/${data._id}`} />
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
