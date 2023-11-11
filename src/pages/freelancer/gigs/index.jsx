import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";

function FreelancerGigs() {
  return (
    <WebLayout>
      <>
        <Head>
          <title>My Gigs | ChainWork</title>
        </Head>
        <section className="min-h-screen"></section>
      </>
    </WebLayout>
  );
}

export default withRouteProtect(FreelancerGigs, ["freelancer"]);
