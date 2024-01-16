import WarningAlert from "@/components/Alerts/WarningAlert";
import GigEmptyState from "@/components/EmptyStates/GigEmptyState";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import Spinner from "@/components/Spinner";
import { useAccounts } from "@/context/AccountContext";
import { useGigs } from "@/context/GigContext";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import { isEmpty } from "@/utils/generics";
import { PlusIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

function FreelancerGigs() {
  const { user } = useAccounts();
  const { freelancerGigs, fetchFreelancerGigs, error, isLoading } = useGigs();
  const router = useRouter();
  const gigsData = freelancerGigs?.data || null;

  useEffect(() => {
    if (!isEmpty(user)) {
      fetchFreelancerGigs(user.data.id);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>My Gigs | ChainWork</title>
      </Head>
      <WebLayout>
        <section className="min-h-screen">
          {user && (
            <div className="container mx-auto">
              {user.data.profile_completion !== 100 && (
                <WarningAlert>
                  <p>
                    Your profile is <b>{user.data.profile_completion}%</b> completed.
                    Complete your profile to 100% to start posting gigs and bidding on
                    projects.
                  </p>
                </WarningAlert>
              )}
              <div className="container mx-auto m-4 p-4 rounded-md  ">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-display font-bold text-primary-950 mb-10">
                    My Gigs
                  </h1>
                  <h1 className="text-2xl font-display font-bold text-primary-950 mb-10">
                    <span>Gig Slots : </span>
                    {`${gigsData?.length}/${user?.data?.max_gigs}`}
                  </h1>
                </div>
                <div className="my-8 flex justify-between">
                  {gigsData && gigsData.length > 0 && (
                    <button
                      onClick={() => router.replace("/freelancer/gigs/create?step=01")}
                      disabled={gigsData?.length <= user?.data?.max_gigs ? false : true}
                      className="px-4 py-2 rounded-md border bg-primary-600 hover:bg-primary-500 text-white font-medium text-sm inline-flex gap-2 items-center disabled:bg-neutral-500"
                    >
                      <span>
                        <PlusIcon className="w-5 h-5" />
                      </span>
                      <span> New Gig</span>
                    </button>
                  )}
                </div>

                {isLoading && (
                  <div className="text-center">
                    <Spinner />
                    <span className="font-medium ml-2 text-neutral-500">Loading...</span>
                  </div>
                )}

                {!isLoading && error && freelancerGigs.length === 0 && (
                  <div className="">
                    <h4 className="text-center my-16 font-medium text-neutral-500 text-lg">
                      Something went wrong while loading your projects. Try refreshing the
                      page.
                    </h4>
                  </div>
                )}

                {freelancerGigs.length === 0 && (
                  <GigEmptyState
                    message={"Complete your profile to 100% before posting a Gig."}
                    isDisabled={user.data.profile_completion !== 100}
                  />
                )}

                <div className="grid grid-cols-4 gap-4">
                  {!isLoading &&
                    gigsData &&
                    gigsData.length > 0 &&
                    gigsData.map((gig) => <ServiceCard key={gig._id} gig={gig} />)}
                </div>
              </div>
            </div>
          )}
        </section>
      </WebLayout>
    </>
  );
}

export default withRouteProtect(FreelancerGigs, ["freelancer"]);
