import NavBar from "@/components/NavBar";
import ServiceExplorer from "@/components/ServiceExplorer";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AccessDenied() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Access Denied</title>
      </Head>
      <NavBar />
      <ServiceExplorer />
      <section>
        <div className="my-10">
          <h1 className="text-5xl text-center font-bold text-primary-200">
            <span className="text-9xl">401</span>
            <br />
            <br />
            You are NOT authorized
          </h1>
          <p className="text-center mt-5">
            Try{" "}
            <Link
              href={"/auth/login"}
              className="font-medium hover:underline underline-offset-2 text-primary-700"
            >
              Login{" "}
            </Link>
            or{" "}
            <Link
              href={"/auth/signup"}
              className="font-medium hover:underline underline-offset-2 text-primary-700"
            >
              Signup
            </Link>
          </p>
          <div className="mt-10 text-center">
            <button
              className="py-1 px-3 border rounded-md border-primary-500 font-medium hover:bg-primary-100 hover:text-primary-700"
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
