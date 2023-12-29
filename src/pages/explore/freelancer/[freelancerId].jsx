import WebLayout from "@/layouts/WebLayout";
import { classNames } from "@/utils/generics";
import { Tab } from "@headlessui/react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

let tabs = [
  { name: "Active Projects", count: 0 },
  { name: "Reviews", count: 0 },
];

export default function FreelancerProfile() {
  return (
    <WebLayout>
      <section className="m-8">
        <div className="flex justify-between gap-x-4">
          <div className="basis-1/4 border rounded-md"></div>
          <div className="basis-3/4 border rounded-md">
            <div className="p-4 flex flex-wrap items-center justify-between sm:flex-nowrap border-b">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-12 w-12 object-cover rounded-full"
                    src={"/images/profiles/profile-2.jpg"}
                    // src={proposal.data.freelancer_id.profile_photo}
                    height={240}
                    width={240}
                    // alt={`${proposal.data.freelancer_id.firstName} Profile Photo`}
                    alt={` Profile Photo`}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold leading-6 text-neutral-700">
                    Will Turner
                    {/* {proposal.data.freelancer_id.firstName} */}
                  </h3>
                  <p className="text-sm text-neutral-500">
                    UI | UX Designer
                    {/* {proposal.data.freelancer_id.profile_title} */}
                  </p>
                </div>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:ring-primary-300 hover:bg-primary-50 hover:text-primary-500"
                >
                  <ChatBubbleOvalLeftEllipsisIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 inline-block"
                    aria-hidden="true"
                  />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
            {/* Profile Information */}
            <div className="p-4 border-b">
              <h3 className="text-primary-700 text-lg font-semibold">Profile</h3>
              <p className="mt-4 text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis molestiae
                repellendus blanditiis consectetur magnam maiores facilis id tempore
                recusandae mollitia inventore unde, corrupti soluta a fugiat officiis
                dicta provident dolorem quia dolores architecto placeat corporis. Odit ex
                in blanditiis iure?
              </p>
            </div>
            <div className="p-4">
              <Tab.Group as={"div"}>
                <Tab.List as="ul" className={"w-full flex border-b"}>
                  {tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      as="li"
                      className={"outline-none focus:outline-none"}
                    >
                      {({ selected }) => (
                        <button
                          className={classNames(
                            selected
                              ? "text-primary-700  border-primary-700"
                              : "border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-700",
                            "p-4 text-sm border-b-2 focus:outline-none font-medium"
                          )}
                        >
                          {`${tab.name} (${tab.count})`}
                        </button>
                      )}
                    </Tab>
                  ))}
                </Tab.List>

                <Tab.Panels as="div" className={"p-4"}>
                  <Tab.Panel></Tab.Panel>
                  <Tab.Panel></Tab.Panel>
                  <Tab.Panel>=</Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </section>
    </WebLayout>
  );
}
