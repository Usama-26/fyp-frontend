import Link from "next/link";
import ServicesMegaMenu from "../ServicesMegaMenu";
import { useState } from "react";
import services from "@/json/services";
import { convertToPath } from "@/utils/generic";
export default function ServiceExplorer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="border">
        <div className="flex ">
          {services.services.map(({ category, sub_categories }) => (
            <Link
              key={category}
              onMouseEnter={() => {
                openMenu(), setSelectedCategory({ category, sub_categories });
              }}
              onMouseLeave={closeMenu}
              href={`/category/${convertToPath(category)}`}
              className="mx-2 py-2 border-b-2 text-sm border-transparent text-neutral-500 hover:text-neutral-700 hover:border-primary-700"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
      <ServicesMegaMenu
        isOpen={isMenuOpen}
        onOpen={openMenu}
        onClose={closeMenu}
        selectedCategory={selectedCategory}
      />
    </>
  );
}
