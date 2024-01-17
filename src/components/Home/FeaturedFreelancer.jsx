import React from "react";
import ProfileCard from "@/components/ProfileCard";


// Sample data for featured freelancers
const featuredFreelancers = [
  {
    _id: "65a3bf3aad571b5ccc7e20b0",
    firstName: "Muhammed Sikander",
    lastName: "Iqbal",
    profile_title: "Software Engineer",
    country: "North Macedonia",
    hourly_rate: "10",
    profile_photo: "/images/home/freelancer1.jpg",
    reviews: "5"
  },
  {
    _id: "65a156470fd54c0a73ffd000",
    firstName: "Murad",
    lastName: "Ali",
    country: "United Kingdom",
    profile_title: "Graphic Designer",
    hourly_rate: "20",
    profile_photo: "/images/home/freelancer2.png",
    reviews: "4.9"
  },
  {
    _id: "6596f23d6f88e3e739309e6a",
    firstName: "Usama",
    lastName: "Afzal",
    profile_title: "Frontend Engineer",
    profile_photo: "/images/home/freelancer3.png",
    country: "Pakistan",
    hourly_rate: "25",
    reviews: "5"
  },
];

function FeaturedFreelancer({ name, title, imageUrl }) {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={imageUrl}
          alt={name}
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            FEATURED FREELANCER
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {name}
          </h1>
          <p className="leading-relaxed mb-3">{title}</p>
          <div className="flex items-center flex-wrap">
            <a className="text-primary-500 inline-flex items-center md:mb-2 lg:mb-0">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedFreelancers() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto px-5 py-24">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Featured Freelancers
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Check out the top freelancers in our network.
          </p>
        </div>
        <div className="flex flex-wrap -mx-4">
          {featuredFreelancers.map((freelancer) => (
            // eslint-disable-next-line react/jsx-key
            <div className="p-4 w-full md:w-1/2 lg:w-1/3">
              <ProfileCard key={freelancer.id} data={freelancer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
