import Link from "next/link";
import { Logo } from "../NavBar";
import services from "@/json/services";
export default function Footer() {
  return (
    <>
      <footer className=" bg-neutral-800 text-white border-t">
        <div className="container px-5 py-24  mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Logo />
            <p className="mt-2 text-sm text-neutral-500">
              Your first blockchain based freelancing platform
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium mb-4">Categories</h2>
              <nav className=" mb-10">
                <ul className="space-y-2">
                  {services?.categories?.map((category) => (
                    <li
                      key={category.category_name}
                      className="hover:underline underline-offset-2"
                    >
                      <Link href={`/categories/${category.path}`}>
                        {category.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  mb-4">Support</h2>
              <nav className="list-none mb-10">
                <ul className="space-y-2">
                  <li className="hover:underline underline-offset-2">
                    <Link href={`/how_it_works`}>How it works</Link>
                  </li>
                  <li className="hover:underline underline-offset-2">
                    <Link href={`/terms_of_service`}>Terms of Service</Link>
                  </li>
                  <li className="hover:underline underline-offset-2">
                    <Link href={`/privacy_policy`}>Privacy Policy</Link>
                  </li>
                  <li className="hover:underline underline-offset-2">
                    <Link href={`/trust_and_safety`}>Trust & Safety</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium mb-4">About</h2>
              <nav className="list-none mb-10">
                <ul className="space-y-2">
                  <li className="hover:underline underline-offset-2">
                    <Link href={`/team`}>Team</Link>
                  </li>
                  <li className="hover:underline underline-offset-2">
                    <Link href={`/about`}>About</Link>
                  </li>
                  <li className="hover:underline underline-offset-2">
                    <Link href={`/stories`}>Stories</Link>
                  </li>
                  <li className="hover:underline underline-offset-2">
                    <Link href={`/careers`}>Careers</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-neutral-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p
              className="text-neutral-500 font-medium
             text-sm text-center sm:text-left"
            >
              © 2023 ChainWork, All Rights Reserved.
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-neutral-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-neutral-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-neutral-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-neutral-500">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
