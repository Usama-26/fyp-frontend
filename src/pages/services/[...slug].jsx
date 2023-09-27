import { Breadcrumbs } from "@/components/Breadcrumbs";
import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";
import FilterPopover from "@/components/FilterPopover";
export default function ServicePage() {
  return (
    <WebLayout>
      <section className="py-8">
        <div className=" container mx-auto">
          <div className="px-5 lg:px-10">
            <Breadcrumbs />
            <div className="mt-10">
              <h1 className="text-4xl font-display font-bold text-primary-950">
                Business Websites
              </h1>
              <p className="text-lg text-neutral-500">
                Get business websites that meet your needs.
              </p>
            </div>
            <div className="mt-10">
              <div className="flex gap-4">
                <FilterPopover label={"Price"}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Exercitationem eligendi cum natus ducimus quasi eos eius ad
                    assumenda, fugiat laboriosam aperiam officiis, qui saepe.
                    Ipsum, quas nesciunt! Labore, fugit natus.
                  </p>
                </FilterPopover>
                <FilterPopover label={"Delivery Time"}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Exercitationem eligendi cum natus ducimus quasi eos eius ad
                    assumenda, fugiat laboriosam aperiam officiis, qui saepe.
                    Ipsum, quas nesciunt! Labore, fugit natus.
                  </p>
                </FilterPopover>
                <FilterPopover label={"Seller Options"}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Exercitationem eligendi cum natus ducimus quasi eos eius ad
                    assumenda, fugiat laboriosam aperiam officiis, qui saepe.
                    Ipsum, quas nesciunt! Labore, fugit natus.
                  </p>
                </FilterPopover>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WebLayout>
  );
}
