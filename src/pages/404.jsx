import NavBar from "@/components/NavBar";
import ServiceExplorer from "@/components/ServiceExplorer";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <NavBar />
      <ServiceExplorer />
      <section>
        <div className="my-10">
          <h1 className="text-5xl text-center font-bold text-primary-200">
            <span className="text-9xl">404</span> <br />
            This Page Does NOT exist
          </h1>
          <div className="mt-10 text-center">
            <button
              className="py-1 px-3 border rounded-md border-primary-500 font-medium hover:bg-primary-200"
              onClick={() => {
                router.push("/");
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
