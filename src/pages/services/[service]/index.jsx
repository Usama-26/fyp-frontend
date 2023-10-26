import { Breadcrumbs } from "@/components/Breadcrumbs";
import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";
import ServiceCard from "@/components/ServiceCard";
import Popup from "@/components/Popup";

const serviceTitles = [
  "I will design a stunning website for your business",
  "Create a professional Shopify store for your brand",
  "Build a responsive WordPress website that converts",
  "Develop a custom web app tailored to your needs",
  "Fix any issues on your Webflow website",
  "Optimize your website's speed for better performance",
  "Design and code a beautiful landing page",
  "Craft compelling SEO-optimized content for your site",
  "Set up an e-commerce store on Shopify",
  "Update and maintain your website regularly",
  "Create an eye-catching logo and branding",
  "Migrate your website to a new platform seamlessly",
  "Enhance user experience with UI/UX design",
  "Implement secure payment gateways for online transactions",
  "Provide expert website security services",
  "Optimize your website for mobile devices",
  "Design and code custom email templates",
  "Offer 24/7 customer support with live chat integration",
  "Integrate social media seamlessly with your website",
  "Develop interactive web applications with the latest technologies",
];

export default function ServicePage() {
  const router = useRouter();
  console.log(router.query);
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
                <Popup label={"Price"}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Exercitationem eligendi cum natus ducimus quasi eos eius ad
                    assumenda, fugiat laboriosam aperiam officiis, qui saepe.
                    Ipsum, quas nesciunt! Labore, fugit natus.
                  </p>
                </Popup>
                <Popup label={"Delivery Time"}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Exercitationem eligendi cum natus ducimus quasi eos eius ad
                    assumenda, fugiat laboriosam aperiam officiis, qui saepe.
                    Ipsum, quas nesciunt! Labore, fugit natus.
                  </p>
                </Popup>
                <Popup label={"Seller Options"}>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Exercitationem eligendi cum natus ducimus quasi eos eius ad
                    assumenda, fugiat laboriosam aperiam officiis, qui saepe.
                    Ipsum, quas nesciunt! Labore, fugit natus.
                  </p>
                </Popup>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex justify-between">
                <p className="text-sm">210 services available</p>
              </div>

              <section className="mt-10">
                <div className="grid grid-cols-4 gap-4">
                  {serviceTitles.map((title) => (
                    <ServiceCard key={title} title={title} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </WebLayout>
  );
}
