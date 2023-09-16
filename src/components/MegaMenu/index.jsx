import Link from "next/link";
import { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
const megaMenuLinks = [
  {
    id: 0,
    title: "Explore the Talent",
    meaning: "Search freelancers and skills",
    path: "/freelancers",
  },
  {
    id: 1,
    title: "Explore Projects",
    meaning: "Search and bid on projects",
    path: "/projects",
  },
  {
    id: 2,
    title: "Explore Offers",
    meaning: "Services offered by freelancers",
    path: "/gigs",
  },
];
export default function MegaMenu({ isOpen, onOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className={`absolute z-50 w-full py-4 px-12 bg-zinc-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="container mx-auto flex-between-centered">
        <ul className="lg:basis-4/12 basis-5/12 border-r flex flex-col gap-4">
          {megaMenuLinks.map(({ id, title, meaning, path }, index) => (
            <li
              key={path}
              className="mr-5"
              onMouseOver={() => setActiveTab(index)}
            >
              <Link href={path}>
                <div
                  className={`w-full p-4 rounded ${
                    activeTab === id && "bg-indigo-50"
                  } hover:bg-indigo-50 transition duration-200 flex-between-centered`}
                >
                  <div>
                    <h6 className="text-indigo-700 font-semibold">{title}</h6>
                    <p className="text-sm">{meaning}</p>
                  </div>
                  <HiOutlineArrowNarrowRight
                    className={`w-6 h-6 stroke-indigo-700 transition ${
                      activeTab === id
                        ? " visible translate-x-0"
                        : "invisible -translate-x-5"
                    }`}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <TalentMenu />
      </div>
    </section>
  );
}

function ProjectsMenu() {
  return <div></div>;
}

function TalentMenu() {
  return (
    <div className="w-full px-8 self-start">
      <div>
        <h2 className="text-2xl font-semibold text-indigo-700">
          Explore the Talent
        </h2>
        <p className="font-medium">
          Hire freelancers from all over the world for your work.
        </p>
      </div>
    </div>
  );
}

function OffersMenu() {
  return <div></div>;
}
