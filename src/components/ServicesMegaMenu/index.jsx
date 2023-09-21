import Link from "next/link";

export default function ServicesMegaMenu({
  subCategories,
  isOpen,
  onOpen,
  onClose,
}) {
  return (
    <div
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className={`border border-t-0 absolute  w-full p-4 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col flex-wrap max-h-96 gap-4">
        {subCategories.map(({ sub_category, services }, index) => (
          <ul key={sub_category} className=" space-y-2">
            <Link
              href={sub_category}
              className="font-semibold hover:underline underline-offset-2"
            >
              {sub_category}
            </Link>
            {services.map((service, index) => (
              <li key={service}>
                <Link
                  href={service}
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
  );
}
