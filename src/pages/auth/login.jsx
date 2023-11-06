import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";
import Head from "next/head";
import { GoogleLogin } from "@react-oauth/google";
import WebLayout from "@/layouts/WebLayout";
import { useAccounts } from "@/context/AccountContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";

export default function Login() {
  const { isLoggedIn, error, handleLogin } = useAccounts();
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    isLoggedIn && router.push("/");
    if (token) {
      const decoded = decode(token);
      console.log(decoded);
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Login | Workchain</title>
      </Head>
      <WebLayout>
        <div className="relative my-10 max-w-sm mx-auto border rounded-lg shadow ">
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
              Login
            </h3>

            <LoginForm
              handleSubmit={handleLogin}
              isSubmitted={isLoggedIn ? true : false}
            />
            <h6 className="text-center font-semibold text-neutral-400 my-4">
              OR
            </h6>
            <div className="flex justify-center">
              <GoogleLogin
                text="continue_with"
                width={320}
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  setToken(credentialResponse.credential);
                }}
                onError={() => console.log("Failed")}
              />
            </div>
          </div>
        </div>
      </WebLayout>
    </>
  );
}
