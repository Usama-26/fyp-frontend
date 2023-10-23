import { Form, Formik } from "formik";
import { IoMdEye } from "react-icons/io";
import * as Yup from "yup";
export function SignupForm({ userType }) {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPass: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Set a password"),
        confirmPass: Yup.string().required(
          "Re-enter your password for confirmation"
        ),
      })}
    >
      <Form className="space-y-4">
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
      </Form>
    </Formik>
  );
}
