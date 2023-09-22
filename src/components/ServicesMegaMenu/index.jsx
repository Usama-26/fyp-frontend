import { convertToPath } from "@/utils/generic";
import Link from "next/link";

export default function ServicesMegaMenu({
  selectedCategory,
  isOpen,
  onOpen,
  onClose,
}) {
  const { category, sub_categories } = selectedCategory;
  return (
    <>
      {selectedCategory && (
        <div
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          className={`border border-t-0 absolute w-full p-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-wrap">
            {sub_categories?.map(({ sub_category, services }, index) => (
              <ul key={index} className="w-1/4 space-y-2">
                <Link
                  href={`/category/${convertToPath(category)}/${convertToPath(
                    sub_category
                  )}`}
                  className="font-semibold hover:underline underline-offset-2"
                >
                  {sub_category}
                </Link>
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={`/category/${convertToPath(
                        category
                      )}/${convertToPath(sub_category)}/${convertToPath(
                        service
                      )}`}
                      className="text-sm hover:underline underline-offset-2"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
