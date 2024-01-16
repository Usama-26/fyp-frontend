import SearchBox from "@/components/SearchBox";
import WebLayout from "@/layouts/WebLayout";
import { useEffect, useState } from "react";
import Popup from "@/components/Popup";
import ProfileCard from "@/components/ProfileCard";
import Head from "next/head";
import { isEmpty } from "@/utils/generics";
import { useRouter } from "next/router";
import { useServices } from "@/context/ServiceContext";
import { Popover } from "@headlessui/react";
import { useGigs } from "@/context/GigContext";
import ServiceCard from "@/components/ServiceCard";
const defaultFilters = {
  price: { min: 0, max: 0 },
  category: null,
};

export default function ExploreOffers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const { getAllGigs, gigs } = useGigs();
  const { subCategories, skills, fetchSkills } = useServices();
  const subCategoriesList = subCategories?.data;
  const router = useRouter();
  const skillsArray = skills?.data?.map((skill) => skill.name) || null;

  let searchStr = "";
  let gigsList = gigs?.data;

  const handleSearch = (query = searchQuery) => {
    searchStr = query ? `tags[in]=${query}` : "";
    applyFilters();
  };

  const handleCategoryFilter = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

  const handlePriceFilter = (e) => {
    e.target.name === "minRate"
      ? setFilters((prev) => ({
          ...prev,
          price: { ...filters.price, min: e.target.value },
        }))
      : setFilters((prev) => ({
          ...prev,
          price: { ...filters.price, max: e.target.value },
        }));
  };

  const applyFilters = () => {
    const { price, category } = filters;

    const categoryStr = category ? `&sub_category=${category}` : "";
    const priceStr =
      price.min && price.max ? `&price[lte]=${price.max}&price[gte]=${price.min}` : "";

    let filter = `${searchStr && searchStr}${priceStr && priceStr}${
      categoryStr && categoryStr
    }`;

    if (filter.startsWith("&")) {
      filter = filter.slice(1, filter.length);
    }
    router.replace(`/explore/offers?${filter}`);
  };

  useEffect(() => {
    router.asPath.split("?")[1] && getAllGigs(router.asPath.split("?")[1]);
  }, [router.asPath]);

  const clearFilters = () => {
    setFilters(defaultFilters);
    router.replace(`/explore/offers?${searchStr}`);
    getAllGigs();
  };

  useEffect(() => {
    getAllGigs();
    fetchSkills();
  }, []);

  return (
    <>
      <Head>
        <title>Explore Offers | ChainWork</title>
      </Head>
      <WebLayout>
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-12 text-center text-white">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium font-display">
            Meet the Talent
          </h1>
          <p className="text-lg">Browse Offers on Our Marketplace that suit your need</p>
          <div className="max-w-5xl mx-auto mt-5">
            {skillsArray && (
              <SearchBox
                onSearch={handleSearch}
                query={searchQuery}
                setQuery={setSearchQuery}
                searchArray={skillsArray}
                placeholder="Search Offers..."
              />
            )}
          </div>
        </section>
        <section className="my-8">
          <div className="container mx-auto mt-10">
            <div className="flex gap-4">
              <Popup label={"Service"}>
                <h6 className="text-sm text-neutral-500 mb-2">Services</h6>
                <div className="space-y-4 w-60">
                  <div className="h-60 overflow-auto space-y-2">
                    {subCategoriesList?.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          id={category.name}
                          name="categoryFilter"
                          type="radio"
                          value={category.name}
                          defaultChecked={filters.category === category._id && true}
                          onChange={handleCategoryFilter}
                          className="h-4 w-4 border-neutral-300 text-primary-600 focus:ring-primary-600"
                        />
                        <label
                          htmlFor={category.name}
                          className="ml-3 block text-sm font-medium leading-6 text-neutral-700 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div onClick={applyFilters} className="mt-2 text-end">
                    <Popover.Button className=" px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium  inline-flex gap-2 items-center text-sm">
                      Apply
                    </Popover.Button>
                  </div>
                </div>
              </Popup>
              <Popup label={"Price"}>
                <h6 className="text-sm text-neutral-500 mb-2">
                  Select a range for price
                </h6>
                <div className="flex items-center gap-x-4">
                  <label htmlFor="minRate" className="flex items-center">
                    <span className="font-bold text-lg mr-2">$</span>
                    <input
                      type="number"
                      name="minRate"
                      id="minRate"
                      value={filters.price.min}
                      min={10}
                      max={filters.price.max}
                      className="font-semibold p-2 rounded-md border border-neutral-500 focus:ring-2 focus:border-primary-500 placeholder:text-neutral-400 outline-none disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 text-sm"
                      onChange={handlePriceFilter}
                    />
                  </label>
                  <span className="font-medium">To</span>
                  <label htmlFor="maxRate" className="flex items-center">
                    <span className="font-bold text-lg mr-2">$</span>
                    <input
                      type="number"
                      name="maxRate"
                      id="maxRate"
                      value={filters.price.max}
                      min={filters.price.min}
                      max={500}
                      className="font-semibold p-2 rounded-md border border-neutral-500 focus:ring-2 focus:border-primary-500 placeholder:text-neutral-400 outline-none disabled:border-neutral-300 disabled:bg-transparent disabled:text-neutral-500 text-sm"
                      onChange={handlePriceFilter}
                    />
                  </label>
                </div>
                <div onClick={applyFilters} className="mt-2 text-end">
                  <Popover.Button className=" px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 disabled:cursor-not-allowed text-white font-medium  inline-flex gap-2 items-center text-sm">
                    Apply
                  </Popover.Button>
                </div>
              </Popup>
              {!(filters === defaultFilters) && (
                <button
                  onClick={clearFilters}
                  className="text-sm hover:underline underline-offset-2 hover:text-primary-500"
                >
                  Clear Filters X
                </button>
              )}
            </div>
          </div>
        </section>
        <section className="container mx-auto my-10">
          <div className="grid grid-cols-4 gap-4">
            {!isEmpty(gigs) &&
              gigsList.map((gig) => <ServiceCard key={gig.id} gig={gig} />)}
          </div>
        </section>
      </WebLayout>
    </>
  );
}
