import Link from "next/link";

import services from "@/json/services";
import Logo from "../Logo";
export default function Footer() {
  return (
    <>
      <footer className="w-fullbg-white border-t">
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
          </div>
        </div>
      </footer>
    </>
  );
}
