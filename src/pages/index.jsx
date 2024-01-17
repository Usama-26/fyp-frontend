import { useEffect, useState } from "react";
import sampleSkills from "@/json/sample-skills.json";
import WebLayout from "@/layouts/WebLayout";
import SearchBox from "@/components/SearchBox";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAccounts } from "@/context/AccountContext";
import Link from "next/link";
import FeaturedFreelancers from "@/components/Home/FeaturedFreelancer";
import CategoriesSection from "@/components/Home/CategoriesSection";
import HowItWorks from "@/components/Home/HowItWorks";
import FAQs from "@/components/Home/FAQs";
import Testimonials from "@/components/Home/Testimonials";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, user } = useAccounts();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(`/${user.data.user_type}/dashboard`);
    }
  });
  return (
    <>
      <Head>
        <title>Home | ChainWork</title>
      </Head>
      <WebLayout>
        <Hero />
        <FeaturedFreelancers />
        <CategoriesSection />
        <HowItWorks />
        <FAQs />
        <Testimonials />
      </WebLayout>
    </>
  );
}

function Hero() {
  const { skills } = sampleSkills;
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSearch = (query = searchQuery) => {
    router.replace(`/explore/offers?tags[in]=${query}`);
  };

  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center text-neutral-50">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold font-display">
            Empower Your Freelance Future: <br /> Join the Decentralized Revolution!
          </h1>
          <p className="mb-8 text-lg font-display leading-relaxed">
            Experience Freedom in the Gig Economy: Decentralized Freelancing, Your Way to
            Success!
          </p>

          <SearchBox
            onSearch={handleSearch}
            query={searchQuery}
            setQuery={setSearchQuery}
            searchArray={skills}
          />
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image src="/images/home/hero.svg" width={1024} height={720} alt="Banner" />
        </div>
      </div>
    </section>
  );
}
