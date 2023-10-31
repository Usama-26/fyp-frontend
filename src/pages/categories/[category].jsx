import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getData } from "@/utils/api/genericAPI";
export default function CategoryPage() {
  const router = useRouter();
  const [category, setCategory] = useState("");

  useEffect(() => {
    document.title = `${category?.category_name} Services | ChainWork`;
    return function () {
      document.title = "Workchain | Home";
    };
  }, [category]);

  const fetchCategory = async () => {
    try {
      const response = await getData(
        `http://localhost:8000/api/v1/categories/${router.query.category}`
      );
      setCategory(response.data);
    } catch (err) {
      console.log(err.response);
    }
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
            <div className="container mx-auto px-5 py-24">
              <h1 className="font-bold text-2xl ">
                Popular Services Under:
                <span className="italic"> {category?.category_name}</span>
              </h1>
              <div className="flex flex-wrap pt-10 max-w-screen-7xl mx-auto">
                {/* {category?.sub_categories.map(
                  ({ sub_category_name, path, background_image }, index) => (
                    <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
                      <Link
                        href={`/services/${category?.path}/${path}`}
                        className=""
                      >
                        <div className="bg-gray-100 relative rounded-lg">
                          <Image
                            className="h-40 rounded w-full object-cover object-center "
                            src={background_image}
                            width={320}
                            height={600}
                            alt="content"
                          />
                          <div className="absolute h-full w-full group rounded top-0 left-0 bg-gradient-to-b from-neutral-900/70 to-transparent">
                            <h3 className="p-4 tracking-wide group-hover:underline underline-offset-2 text-neutral-100  text-xl font-bold title-font">
                              {sub_category_name}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                )} */}
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
