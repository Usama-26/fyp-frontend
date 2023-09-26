import Link from "next/link";
import { useRouter } from "next/router";
import { HiHome, HiChevronRight } from "react-icons/hi2";
import React from "react";

export function Breadcrumbs() {
  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  return (
    <p className="md:text-sm text-xs">
      {pathSegments.map((segment, index) => {
        if (index === 1) return;
        return (
          <span key={index}>
            <Link
              href={
                (index === 0 && "/") ||
                `${pathSegments.slice(0, index + 1).join("/")}`
              }
              className="hover:underline underline-offset-2 capitalize"
            >
              {segment === "" ? (
                <HiHome className="w-5 h-5 inline-block mb-1 hover:fill-primary-700" />
              ) : segment.includes("-") ? (
                segment.split("-").join(" ")
              ) : (
                segment
              )}
            </Link>
            {index !== pathSegments.length - 1 ? (
              <HiChevronRight className=" w-2 h-2 mx-2 inline-block" />
            ) : (
              ""
            )}
          </span>
        );
      })}
    </p>
  );
}
