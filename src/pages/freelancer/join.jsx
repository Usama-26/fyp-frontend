import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { GoogleLogin } from "@react-oauth/google";
import Footer from "@/components/Footer";
import { SignupForm } from "@/components/SignupForm";
import { useState } from "react";
export default function FreelancerJoin() {
  const [userCredentials, setUserCredentials] = useState(null);
  console.log(userCredentials);
  return (
    <>
      <Head>
        <title>Freelancer Join | Workchain</title>
      </Head>
      <NavBar />
      <main>
        <div className="my-10 max-w-lg mx-auto border rounded-lg shadow p-8">
          <div className="text-center mb-6">
            <Logo />
          </div>
          <h3 className="text-xl font-semibold tracking-wider text-center mb-4">
            Join as Freelancer
          </h3>
          <SignupForm setFormData={setUserCredentials} />

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
      </main>
      <Footer />
    </>
  );
}
