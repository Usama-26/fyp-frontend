import Link from "next/link";
import ServicesMegaMenu from "../ServicesMegaMenu";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ServiceExplorer({ data }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subCategories, setSubCategories] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const router = useRouter();

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section>
      <div className="border-b">
        <div className="container mx-auto flex">
          {data.map(({ name, path, sub_categories }, index) => (
            <Link
              key={name}
              onClick={closeMenu}
              onMouseEnter={() => {
                openMenu(),
                  setSubCategories(sub_categories),
                  setActiveTab(index);
              }}
              onMouseLeave={closeMenu}
              href={`/categories/${path}`}
              className={`inline-block mx-2 py-2 border-b-2 text-sm text-neutral-500 hover:text-neutral-700 ${
                isMenuOpen && activeTab === index
                  ? "border-primary-700"
                  : "border-transparent "
              }`}
            >
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="relative max-w-screen-2xl mx-auto">
        {subCategories && (
          <ServicesMegaMenu
            isOpen={isMenuOpen}
            onOpen={openMenu}
            onClose={closeMenu}
            categories={subCategories}
          />
        )}
      </div>
    </section>
  );
}
