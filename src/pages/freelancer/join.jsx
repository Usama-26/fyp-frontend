import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { GoogleLogin } from "@react-oauth/google";
import Footer from "@/components/Footer";
import { SignupForm } from "@/components/SignupForm";
import { useAccounts } from "@/context/AccountContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import WebLayout from "@/layouts/WebLayout";
import { GoogleLoginBtn } from "@/components/GoogleLoginBtn";
import withAuthRouteProtect from "@/helpers/withAuthRouteProtect";
 function FreelancerJoin() {
  const { isLoggedIn, error, handleSignup } = useAccounts();
  const router = useRouter();
  console.log(error);
  useEffect(() => {
    isLoggedIn && router.push("/");
  }, []);
  return (
    <>
      <Head>
        <title>Freelancer Join | Workchain</title>
      </Head>
      <WebLayout>
        <main>
          <div className="relative my-8 max-w-lg mx-auto border rounded-lg shadow">
            {error && (
              <div className="w-full absolute top-0 bg-danger-200 rounded-t-md py-2 px-2">
                <p className="text-sm font-medium text-danger-700">{error}</p>
              </div>
            )}
            <div className="p-8 pt-12">
              <div className="text-center mb-6">
                <Logo />
              </div>
              <h3 className="text-xl font-semibold tracking-wider text-center mb-4">
                Join as Freelancer
              </h3>
              <SignupForm
                handleSubmit={(values) =>
                  handleSignup({ ...values, user_type: "freelancer" })
                }
              />

              <h6 className="text-center font-semibold text-neutral-400 my-4">
                OR
              </h6>
              <div className="flex justify-center">
                <GoogleLoginBtn userType={"freelancer"} />
              </div>
            </div>
          </div>
        </main>
      </WebLayout>
    </>
  );
}

export default withAuthRouteProtect(FreelancerJoin)