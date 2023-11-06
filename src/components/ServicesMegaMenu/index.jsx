import { Transition } from "@headlessui/react";
import Link from "next/link";

export default function ServicesMegaMenu({
  subCategories,
  isOpen,
  onOpen,
  onClose,
}) {
  return (
    <>
      {subCategories && (
        <Transition
          show={isOpen}
          as="div"
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100 visible"
          leave="transition-all duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 invisible"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <div
            className={`border border-t-0 absolute z-50 w-full p-4 bg-neutral-50 shadow `}
          >
            <div className=" container mx-auto flex flex-wrap gap-y-4">
              {subCategories?.map(
                (
                  {
                    name: sub_category_name,
                    path: sub_category_path,
                    services,
                  },
                  index
                ) => (
                  <ul key={index} className="w-1/4">
                    <Link
                      href={`/services/${sub_category_path}`}
                      onClick={onclose}
                      className="font-semibold text-neutral-600 hover:underline underline-offset-2"
                    >
                      {sub_category_name}
                    </Link>
                    {services.map(
                      ({ name: service_name, path: service_path }, index) => (
                        <li key={index}>
                          <Link
                            onClick={onClose}
                            href={`/services/${sub_category_path}/${service_path}`}
                            className="text-sm hover:underline underline-offset-2"
                          >
                            {service_name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )
              )}
            </div>
          </div>
        </Transition>
      )}
    </>
  );
}
