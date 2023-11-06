import Logo from "@/components/Logo";
import Head from "next/head";
import { GoogleLogin } from "@react-oauth/google";
import { SignupForm } from "@/components/SignupForm";
import WebLayout from "@/layouts/WebLayout";
import { useAccounts } from "@/context/AccountContext";

export default function Signup() {
  const { user, error, handleSignup } = useAccounts();

  return (
    <>
      <Head>
        <title>Signup | Workchain</title>
      </Head>
      <WebLayout>
        <main>
          <div className="relative my-10 max-w-lg mx-auto border rounded-lg shadow ">
            {error && (
              <div className="w-full absolute top-0 bg-danger-500 rounded-t-md py-2 px-2">
                <p className="text-sm font-medium text-white">{error}</p>
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
                  handleSignup({ ...values, userType: "client" })
                }
                isSubmitted={user ? true : false}
              />

              <h6 className="text-center font-semibold text-neutral-400 my-4">
                OR
              </h6>
              <div className="flex justify-center">
                <GoogleLogin
                  text="continue_with"
                  onSuccess={(credentialResponse) =>
                    console.log(credentialResponse)
                  }
                  onError={() => console.log("Failed")}
                />
              </div>
            </div>
          </div>
        </main>
      </WebLayout>
    </>
  );
}
