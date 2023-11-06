import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getData } from "@/utils/api/genericAPI";
import { BASE_URL } from "@/constants";
import { useServices } from "@/context/ServiceContext";
export default function CategoryPage() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const { getCategory, error, dispatch } = useServices();

  useEffect(() => {
    document.title = `${category?.name} Services | ChainWork`;
    return function () {
      document.title = "Workchain | Home";
    };
  }, [category]);

  const fetchCategory = async () => {
    const data = await getCategory(router.query.category);
    setCategory(data);
  };

  useEffect(() => {
    fetchCategory();
  }, [router]);

  return (
    <WebLayout>
      {category && (
        <section className="">
          <CategoryHero
            description={category.description}
            punchline={category.punchline}
            image={category.imgUrl}
          />
          <section>
            <div className="container mx-auto px-5 py-24 space-y-10">
              <h1 className="font-bold text-2xl font-display ">
                {`Popular Services Under ${category?.name}`}
              </h1>
              <div
                className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2
               gap-5"
              >
                {category?.sub_categories.map(
                  ({ name: sub_category_name, path }, index) => (
                    <Link
                      href={`/services/${path}`}
                      className="font-medium px-2 py-4 rounded-md border border-neutral-300 text-neutral-600 hover:border-primary-300 bg-neutral-100 hover:bg-primary-100 hover:text-primary-500 transition duration-200"
                      key={index}
                    >
                      {sub_category_name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </section>
        </section>
      )}
    </WebLayout>
  );
}

function CategoryHero({ description, image, punchline }) {
  return (
    <section className="bg-gradient-to-b from-primary-500 to-primary-700">
      <div className="container mx-auto flex px-5 py-24  md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center text-neutral-100">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-display font-extrabold ">
            {punchline}
          </h1>
          <p className="mb-8 leading-relaxed">{description}</p>
          <div className="flex justify-center">
            <button className="inline-flex text-white font-medium bg-indigo-500 border-0 py-2 px-6 focus:outline-none  hover:shadow-lg transition duration-200 rounded text-lg">
              Explore All
            </button>
          </div>
        </div>
        <div className="lg:max-w-2xl lg:w-full md:w-1/2 w-5/6">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            width={1920}
            height={1280}
            src={image}
          />
        </div>
      </div>
    </section>
  );
}
