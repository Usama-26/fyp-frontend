import WebLayout from "@/layouts/WebLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import services from "@/json/services";
import Image from "next/image";
import { useEffect } from "react";
export default function CategoryPage() {
  const router = useRouter();

  const category = services.categories.find(
    (category) => category.path === router.query.category
  );

  useEffect(() => {
    document.title = `${category?.category_name} Services | ChainWork`;
    return function () {
      document.title = "Workchain | Home";
    };
  }, [category]);
  console.log(router.query);
  return (
    <WebLayout>
      <section className="">
        <CategoryHero
          title={category?.heading}
          image={category?.background_image}
        />
        <section>
          <div className="container mx-auto px-5 py-24">
            <h1 className="font-bold text-2xl ">
              Popular Services Under:
              <span className="italic"> {category?.category_name}</span>
            </h1>
            <div className="flex flex-wrap pt-10 max-w-screen-7xl mx-auto">
              {category?.sub_categories.map(
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
              )}
            </div>
          </div>
        </section>
      </section>
    </WebLayout>
  );
}

function CategoryHero({ title, image }) {
  return (
    <section className="bg-gradient-to-b from-primary-500 to-primary-700">
      <div className="container mx-auto flex px-5 py-24  md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center text-neutral-100">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-display font-extrabold ">
            {title}
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
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
            width={1024}
            height={720}
            src={image}
          />
        </div>
      </div>
    </section>
  );
}
