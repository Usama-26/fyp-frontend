import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { GoogleLogin } from "@react-oauth/google";
import { IoMdEye } from "react-icons/io";
import Footer from "@/components/Footer";
export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Workchain</title>
      </Head>
      <NavBar />
      <main>
        <div className="my-10 max-w-lg mx-auto border rounded-lg shadow p-8">
          <div className="text-center mb-6">
            <Logo />
          </div>
          <h3 className="text-xl font-semibold tracking-wider text-center mb-4">
            Join as a Client
          </h3>
          <SignupForm />

          <h6 className="text-center text-neutral-400 my-4">OR</h6>
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

function SignupForm({}) {
  return (
    <form className="space-y-4">
      <div className="flex md:flex-row flex-col space-between gap-4">
        <input
          className="form-input"
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
        />
        <input
          className="form-input"
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
        />
      </div>
      <input
        className="form-input"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
      />
      <div className="flex md:flex-row flex-col space-between gap-4">
        <div className="relative w-full">
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
        <input
          className="form-input"
          type="password"
          name="confirmPass"
          id="confirmPass"
          placeholder="Confirm Password"
        />
      </div>
      <button type="submit" className="form-submit-btn">
        Join
      </button>
    </form>
  );
}
