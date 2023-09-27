import Link from "next/link";
import ServicesMegaMenu from "../ServicesMegaMenu";
import { useState } from "react";
import services from "@/json/services";
import { useRouter } from "next/router";

export default function ServiceExplorer() {
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
    <>
      <div className="border">
        <div className="container mx-auto flex">
          {services.categories.map(
            ({ category_name, path, sub_categories }, index) => (
              <Link
                key={category_name}
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
                <span>{category_name}</span>
              </Link>
            )
          )}
        </div>
      </div>

      {subCategories && (
        <ServicesMegaMenu
          isOpen={isMenuOpen}
          onOpen={openMenu}
          onClose={closeMenu}
          categories={subCategories}
        />
      )}
    </>
  );
}
