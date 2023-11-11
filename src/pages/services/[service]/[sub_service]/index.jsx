import { Breadcrumbs } from "@/components/Breadcrumbs";
import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";
import ServiceCard from "@/components/ServiceCard";
import Popup from "@/components/Popup";
import { useEffect, useState } from "react";
import { useServices } from "@/context/ServiceContext";

export default function ServicePage() {
  const router = useRouter();
  const [service, setService] = useState(null);
  const { getService, error } = useServices();

  const fetchService = async () => {
    const data = await getService(router.query.sub_service);
    setService(data);
  };

  useEffect(() => {
    fetchService();
  }, [router]);

  return (
    <WebLayout>
      <section className="py-8">
        {service && (
          <div className=" container mx-auto">
            <div className="px-5 lg:px-10 space-y-8">
              <Breadcrumbs />
              <div>
                <h1 className="text-4xl font-display font-bold text-primary-950">
                  {service.name}
                </h1>
              </div>
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
                  <p className="text-sm">10 services available</p>
                </div>

                <section>
                  <div className="grid grid-cols-4 gap-4">
                    <ServiceCard />
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
