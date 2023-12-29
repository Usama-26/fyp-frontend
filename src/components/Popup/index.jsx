import { Popover, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import { Fragment } from "react";

export default function Popup({ label, children }) {
  return (
    <div className="relative">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`p-2 font-medium rounded-lg border border-neutral-300 focus:ring-2 ring-primary-500`}
            >
              <span>{label}</span>
              <HiChevronDown
                className={`inline-block transition ml-1 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-0"
              enterTo="opacity-100 translate-y-2"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-2"
              leaveTo="opacity-0 translate-y-0"
            >
              <Popover.Panel
                className={
                  "absolute p-4 top-12 left-0 z-50 max-w-lg bg-white shadow-custom-md shadow-neutral-300 rounded-lg"
                }
              >
                {children}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
