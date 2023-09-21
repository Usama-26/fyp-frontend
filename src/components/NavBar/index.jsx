import Link from "next/link";
import { SiHiveBlockchain } from "react-icons/si";
import { HiMiniChevronDown } from "react-icons/hi2";
import { useState } from "react";
import MegaMenu from "../MegaMenu";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      <header className=" p-4 md:p-0">
        <div className="container mx-auto flex-between-centered">
          <div className=" flex-start-centered lg:gap-8 gap-4">
            <Logo />
            <Navigation
              isOpen={isMenuOpen}
              onOpen={openMenu}
              onClose={closeMenu}
            />
          </div>
          <HeaderCTA />
        </div>
      </header>
      <MegaMenu isOpen={isMenuOpen} onOpen={openMenu} onClose={closeMenu} />
    </>
  );
}

function Logo() {
  return (
    <Link href={"/"}>
      <div>
        <h1 className="text-2xl text-primary-700 flex items-center">
          <span>
            <SiHiveBlockchain className="inline w-8 h-8 mr-1" />
          </span>
          <b>
            <span>Chain</span>
            <span className="text-neutral-700">Work</span>
          </b>
        </h1>
      </div>
    </Link>
  );
}

function Navigation({ isOpen, onOpen, onClose }) {
  return (
    <nav className=" hidden md:block text-neutral-700 font-medium">
      <ul className="flex-between-centered nav-links">
        <li onMouseEnter={onOpen} onMouseLeave={onClose}>
          <button>
            Explore
            <HiMiniChevronDown
              className={`inline transition duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </li>
        <li>
          <Link href={"/how_it_works"}>How it Works</Link>
        </li>
        <li>
          <Link href={"/why_us"}>Why Us</Link>
        </li>
      </ul>
    </nav>
  );
}

function HeaderCTA() {
  return (
    <div className="flex-between-centered  gap-4 font-medium">
      <Link
        href={"/login"}
        className="text-neutral-700 hover:underline underline-offset-8"
      >
        Login
      </Link>
      <Link
        href={"/signup"}
        className="bg-primary-600 hover:bg-primary-700 text-neutral-200  px-4 py-2 rounded transition"
      >
        Sign up
      </Link>
      <Link
        href={"/freelancer/join"}
        className=" hover:text-primary-700 text-neutral-700 underline-offset-2 "
      >
        Apply as Freelancer
      </Link>
    </div>
  );
}
