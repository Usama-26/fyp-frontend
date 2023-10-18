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
          <h3 className="text-xl font-semibold tracking-wider text-center mb-2">
            Reset Password
          </h3>
          <p className="text-sm mb-4 italic text-neutral-500">
            {
              "Provide you email address and we'll send a password reset link to that email address."
            }{" "}
          </p>
          <form className="space-y-4">
            <input
              className="form-input"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            <button type="submit" className="form-submit-btn">
              Reset Password
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
