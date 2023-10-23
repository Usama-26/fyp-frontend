import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { IoMdEye } from "react-icons/io";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import Footer from "@/components/Footer";
export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Workchain</title>
      </Head>
      <NavBar />
      <main>
        <div className="my-10 max-w-sm mx-auto border rounded-lg shadow p-8">
          <div className="text-center mb-6">
            <Logo />
          </div>
          <h3 className="text-xl font-semibold tracking-wider text-center mb-4">
            Login
          </h3>

          <LoginForm />
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
      </main>
      <Footer />
    </>
  );
}

function LoginForm({}) {
  return (
    <form className="space-y-4">
      <input
        className="form-input"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      />
      <div className="relative">
        <input
          className="form-input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button type="button" className="absolute right-2 top-2.5">
          <IoMdEye className="w-6 h-6 fill-neutral-500" />
        </button>
      </div>
      <div className="text-end mb-10">
        <Link
          href={"/auth/reset_password"}
          className="text-sm italic text-neutral-500 hover:text-primary-500 hover:underline underline-offset-2"
        >
          Forgot password ?
        </Link>
      </div>
      <button type="submit" className="form-submit-btn">
        Login
      </button>
    </form>
  );
}
