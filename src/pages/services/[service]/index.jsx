import { Breadcrumbs } from "@/components/Breadcrumbs";
import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";
import Popup from "@/components/Popup";
import { useServices } from "@/context/ServiceContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGigs } from "@/context/GigContext";
import ServiceCard from "@/components/ServiceCard";

export default function ServicePage() {
  const router = useRouter();
  const [subCategory, setSubCategory] = useState(null);
  const { getSubCategory } = useServices();
  const { fetchGigsBySubCategory, gigs, resetGigs } = useGigs();

  const gigsArray = gigs?.data || null;

  const fetchSubCategory = async () => {
    const data = await getSubCategory(router.query.service);
    setSubCategory(data);
  };

  useEffect(() => {
    if (subCategory) {
      fetchGigsBySubCategory(subCategory._id);
    }
  }, [subCategory]);

  useEffect(() => {
    resetGigs();
    fetchSubCategory();
  }, [router]);

  return (
    <WebLayout>
      <section className="py-8">
        {subCategory && (
          <div className=" container mx-auto">
            <div className="px-5 lg:px-10 space-y-8">
              <Breadcrumbs />
              <section>
                <div className="">
                  <h1 className="text-4xl font-display font-bold text-primary-950">
                    {subCategory.name}
                  </h1>
                  <p className="text-lg text-neutral-500">{subCategory.punchline}</p>
                </div>
              </section>
              <section>
                <div className="container mx-auto space-y-4">
                  <h1 className="font-bold text-xl font-display">
                    {`Popular Services Under ${subCategory?.name}`}
                  </h1>
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
                    {subCategory?.services?.map(({ name, path }, index) => (
                      <Link
                        href={`/services/${subCategory.path}/${path}`}
                        className="font-medium px-2 py-4 rounded-md border border-neutral-300 text-neutral-600 hover:border-primary-300 bg-neutral-100 hover:bg-primary-100 hover:text-primary-500 transition duration-200"
                        key={index}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              <div>
                <div className="flex gap-4">
                  <Popup label={"Price"}>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Exercitationem eligendi cum natus ducimus quasi eos eius ad
                      assumenda, fugiat laboriosam aperiam officiis, qui saepe. Ipsum,
                      quas nesciunt! Labore, fugit natus.
                    </p>
                  </Popup>
                  <Popup label={"Delivery Time"}>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Exercitationem eligendi cum natus ducimus quasi eos eius ad
                      assumenda, fugiat laboriosam aperiam officiis, qui saepe. Ipsum,
                      quas nesciunt! Labore, fugit natus.
                    </p>
                  </Popup>
                  <Popup label={"Seller Options"}>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Exercitationem eligendi cum natus ducimus quasi eos eius ad
                      assumenda, fugiat laboriosam aperiam officiis, qui saepe. Ipsum,
                      quas nesciunt! Labore, fugit natus.
                    </p>
                  </Popup>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <p className="text-sm">{`${gigs?.length} services available`}</p>
                </div>

                <section className="">
                  <div className="grid grid-cols-4 gap-4">
                    {gigsArray?.map((gig) => (
                      <ServiceCard key={gig._id} gig={gig} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </section>
    </WebLayout>
  );
}
