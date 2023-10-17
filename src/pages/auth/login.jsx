import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Workchain</title>
      </Head>
      <main>
        <NavBar />
        <div className="mt-20 max-w-sm mx-auto border rounded-lg shadow p-8">
          <div className="text-center mb-12">
            <Logo />
          </div>
          <form className="space-y-4">
            <input
              className="form-input"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <input
              className="form-input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <div className="text-end mb-10">
              <Link
                href={"/auth/forgot_password"}
                className="text-sm italic text-neutral-500 hover:text-primary-500 hover:underline underline-offset-2"
              >
                Forgot password ?
              </Link>
            </div>
            <button type="submit" className="form-submit-btn">
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
