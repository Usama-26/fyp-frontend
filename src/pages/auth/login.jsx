import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";
import Head from "next/head";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import WebLayout from "@/layouts/WebLayout";
export default function Login() {
  const [loginCredentials, setLoginCredentials] = useState(null);
  console.log(loginCredentials);
  return (
    <>
      <Head>
        <title>Login | Workchain</title>
      </Head>
      <WebLayout>
        <div className="my-10 max-w-sm mx-auto border rounded-lg shadow p-8">
          <div className="text-center mb-6">
            <Logo />
          </div>
          <h3 className="text-xl font-semibold tracking-wider text-center mb-4">
            Login
          </h3>

          <LoginForm setFormData={setLoginCredentials} />
          <h6 className="text-center font-semibold text-neutral-400 my-4">
            OR
          </h6>
          <div className="flex justify-center">
            <GoogleLogin
              text="continue_with"
              width={320}
              onSuccess={(credentialResponse) =>
                console.log(credentialResponse)
              }
              onError={() => console.log("Failed")}
            />
          </div>
        </div>
      </WebLayout>
    </>
  );
}
