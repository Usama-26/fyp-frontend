import { classNames } from "@/utils/generics";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardNavigation({ initialTabs }) {
  const [tabs, setTabs] = useState(initialTabs);

  const router = useRouter();

  useEffect(() => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        current: router.pathname === tab.href,
      }))
    );
  }, [router.pathname]);

  return (
    <div>
      <div className="hidden sm:block mb-4">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.length > 0
            ? tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "bg-primary-100 text-primary-700"
                      : "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </Link>
              ))
            : Array.from({ length: 5 }, (_, i) => (
                <span
                  className="animate-pulse rounded-md inline-block py-1.5 w-20"
                  key={i}
                ></span>
              ))}
        </nav>
      </div>
    </div>
  );
}
