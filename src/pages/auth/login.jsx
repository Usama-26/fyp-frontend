import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";
import Head from "next/head";
import WebLayout from "@/layouts/WebLayout";
import { useAccounts } from "@/context/AccountContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleLoginBtn } from "@/components/GoogleLoginBtn";
import withAuthRouteProtect from "@/helpers/withAuthRouteProtect";
import Error from "@/components/Messages/Error";

function Login() {
  const { isLoggedIn, error, isLoading, handleLogin } = useAccounts();
  const router = useRouter();
  useEffect(() => {
    isLoggedIn && router.push("/");
  }, []);
  return (
    <>
      <Head>
        <title>Login | Workchain</title>
      </Head>
      <WebLayout>
        <div className="relative my-8 max-w-sm mx-auto border rounded-lg shadow ">
          {error && <Error message={error} />}

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
              isLoading={isLoading}
            />
            <h6 className="text-center font-semibold text-neutral-400 my-4">OR</h6>
            <div className="flex justify-center">
              <GoogleLoginBtn userType={"client"} />
            </div>
          </div>
        </div>
      </WebLayout>
    </>
  );
}
export default withAuthRouteProtect(Login);
