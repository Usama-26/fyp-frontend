import Link from "next/link";

export default function ServicesMegaMenu({
  categories,
  isOpen,
  onOpen,
  onClose,
}) {
  return (
    <>
      {categories && (
        <div
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          className={`border border-t-0 absolute z-50 w-full p-4 bg-white shadow ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-wrap">
            {categories?.map(
              (
                { sub_category_name, path: sub_category_path, services },
                index
              ) => (
                <ul key={index} className="w-1/4 space-y-2">
                  <Link
                    href={`/services/${sub_category_path}`}
                    onClick={onclose}
                    className="font-semibold hover:underline underline-offset-2"
                  >
                    {sub_category_name}
                  </Link>
                  {services.map(({ name, path: service_path }, index) => (
                    <li key={index}>
                      <Link
                        onClick={onClose}
                        href={`/services/${sub_category_path}/${service_path}`}
                        className="text-sm hover:underline underline-offset-2"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
