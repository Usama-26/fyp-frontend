import Link from "next/link";
import { HiMiniChevronDown } from "react-icons/hi2";
import { Fragment, useState } from "react";
import MegaMenu from "../MegaMenu";
import Logo from "../Logo";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { BsGear } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { FcBriefcase } from "react-icons/fc";
import { BiSolidOffer, BiSolidBriefcaseAlt } from "react-icons/bi";
import { IoMdExit } from "react-icons/io";
import { classNames } from "@/utils/generics";
import { useAccounts } from "@/context/AccountContext";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdDashboard, MdSpaceDashboard } from "react-icons/md";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, handleLogout } = useAccounts();

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="border-b p-4 md:p-0">
        <div className="container mx-auto flex-between-centered">
          <div className=" flex-start-centered lg:gap-8 gap-4">
            <Logo />
            <Navigation isOpen={isMenuOpen} onOpen={openMenu} onClose={closeMenu} />
          </div>
          {isLoggedIn ? <UserMenu onLogout={handleLogout} /> : <AuthMenu />}
        </div>
      </header>
      <MegaMenu isOpen={isMenuOpen} onOpen={openMenu} onClose={closeMenu} />
    </>
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

function AuthMenu() {
  return (
    <div className="flex-between-centered  gap-4 font-medium">
      <Link
        href={"/auth/login"}
        className="text-neutral-700 hover:underline underline-offset-8"
      >
        Login
      </Link>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-neutral-100  px-4 py-2 rounded transition">
            Signup
            <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/freelancer/join"
                    className={classNames(
                      active ? "bg-neutral-100 text-neutral-900" : "text-neutral-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    As Freelancer
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/auth/signup"
                    className={classNames(
                      active ? "bg-neutral-100 text-neutral-900" : "text-neutral-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    As Client
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <Link
        href={"/freelancer/join"}
        className=" hover:text-primary-700 text-neutral-700 underline-offset-2 "
      >
        Apply as Freelancer
      </Link>
    </div>
  );
}

function UserMenu({ onLogout }) {
  const { user, error } = useAccounts();
  const { firstName, lastName, user_type } = user?.data;

  return (
    <>
      <div className="relative flex-between-centered gap-4">
        <Menu>
          <Menu.Button as={Fragment}>
            {user && (
              <button className="flex gap-2 items-center hover:bg-primary-100 p-2 rounded-md">
                <span className="inline-block">
                  {user.data.profile_photo ? (
                    <Image
                      src={user.data.profile_photo}
                      width={150}
                      height={150}
                      className="w-10 aspect-square object-cover rounded-full"
                      alt="Profile Picture"
                    />
                  ) : (
                    <span className="w-10 h-10 flex justify-center items-center  rounded-full text-xl text-center text-white font-semibold bg-primary-500">
                      {firstName[0]}
                    </span>
                  )}
                </span>
                <span className=" text-sm font-medium">Hello, {firstName}</span>
              </button>
            )}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              className={`z-50 w-56 absolute shadow-custom-sm shadow-neutral-300 right-0 top-12 py-2 rounded-md divide-y text-sm font-medium bg-white`}
            >
              <Menu.Item as={"li"}>
                <div className={"p-3 flex justify-between items-center"}>
                  <div>
                    <h4 className="font-medium text-neutral-500">Welcome,</h4>
                    <h3>{`${firstName} ${lastName}`}</h3>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-end px-1 text-xs border rounded-full text-green-600 border-green-600">
                      <GoDotFill />
                      <span>online</span>
                    </span>
                  </div>
                </div>
                <div className="text-center mx-3 my-2 py-1 rounded-md bg-neutral-100">
                  <span className="capitalize text-xs">{`${user_type} Account`}</span>
                </div>
              </Menu.Item>

              <Menu.Item as={"li"}>
                <Link
                  href={`/${user_type}/dashboard/`}
                  className="w-full p-3 inline-flex items-center gap-2 hover:bg-primary-100"
                >
                  <MdSpaceDashboard className="w-5 h-5 fill-neutral-500" />
                  <span>Dashboard</span>
                </Link>
              </Menu.Item>
              {user_type && (
                <Menu.Item as={"li"}>
                  {user_type === "freelancer" && (
                    <Link
                      href={"/freelancer/gigs"}
                      className="w-full p-3 inline-flex items-center gap-2 hover:bg-primary-100"
                    >
                      <BiSolidOffer className="w-5 h-5 fill-neutral-700" />
                      <span>My Gigs</span>
                    </Link>
                  )}
                  {user_type === "client" && (
                    <Link
                      href={"/client/projects"}
                      className="w-full p-3 inline-flex items-center gap-2 hover:bg-primary-100"
                    >
                      <FcBriefcase className="w-5 h-5 fill-neutral-500" />
                      <span>My Projects</span>
                    </Link>
                  )}
                </Menu.Item>
              )}

              <Menu.Item as={"li"}>
                <Link
                  href={`/${user_type}/profile/settings`}
                  className="w-full p-3 inline-flex items-center gap-2 hover:bg-primary-100"
                >
                  <BsGear className="w-5 h-5 fill-neutral-500" />
                  <span>Settings</span>
                </Link>
              </Menu.Item>

              <Menu.Item as={"li"}>
                <button
                  onClick={onLogout}
                  className="w-full p-3 inline-flex items-center gap-2 hover:bg-primary-100"
                >
                  <IoMdExit className="w-5 h-5 fill-neutral-500" />
                  <span>Logout</span>
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
}
