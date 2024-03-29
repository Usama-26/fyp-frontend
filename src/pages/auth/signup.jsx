import Logo from "@/components/Logo";
import Head from "next/head";
import { SignupForm } from "@/components/SignupForm";
import WebLayout from "@/layouts/WebLayout";
import { useAccounts } from "@/context/AccountContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleLoginBtn } from "@/components/GoogleLoginBtn";
import withAuthRouteProtect from "@/helpers/withAuthRouteProtect";

function Signup() {
  const { isLoggedIn, user, error, isLoading, handleSignup } = useAccounts();
  const router = useRouter();

  useEffect(() => {
    isLoggedIn && router.push("/");
  }, []);
  return (
    <>
      <Head>
        <title>Signup | Workchain</title>
      </Head>

      <WebLayout>
        <main>
          <div className="relative my-8 max-w-lg mx-auto border rounded-lg shadow ">
            {error && (
              <div className="w-full absolute top-0 bg-danger-200 rounded-t-md py-2 px-2">
                <p className="text-sm text-danger-700">{error}</p>
              </div>
            )}

            <div className="p-8 pt-12">
              <div className="text-center mb-6">
                <Logo />
              </div>
              <h3 className="text-xl font-semibold tracking-wider text-center mb-4">
                Join as a Client
              </h3>
              <SignupForm
                handleSubmit={(values) =>
                  handleSignup({ ...values, user_type: "client" })
                }
                isSubmitted={user ? true : false}
                isLoading={isLoading}
              />

              <h6 className="text-center font-semibold text-neutral-400 my-4">OR</h6>
              <div className="flex justify-center">
                <GoogleLoginBtn userType={"client"} />
              </div>
            </div>
          </div>
        </main>
      </WebLayout>
    </>
  );
}

export default withAuthRouteProtect(Signup);
