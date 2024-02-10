import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ onSignup }) {
  const [error, setError] = useState({});
  const [showError, setShowError] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "", rePassword: "" },
    onSubmit: async (values) => {
      if (Object.keys(error).length != 0) {
        setShowError(true);
      } else {
        axios
          .post("http://localhost:3001/api/user/signup", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            const userData = res.data;
            localStorage.setItem("User", JSON.stringify(userData));
            onSignup(userData);
            navigate("/");
          })
          .catch((err) => {
            setSignupError(err.response.data.error);
          });
      }
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email";
      }

      if (!values.password) {
        errors.password = "Password required";
      } else if (values.password.length <= 3) {
        errors.password = "Password length should be greater than 3";
      } else if (values.password.length > 20) {
        errors.password = "Paassword length should be less than 20";
      }

      if (!values.rePassword) {
        errors.rePassword = "Re-Enter the password";
      } else if (values.password != values.rePassword) {
        errors.rePassword = "Passwords are not matching";
      }

      setError(errors);
    },
  });

  return (
    <div className="w-screen h-screen bg-blue-500">
      <form
        onSubmit={formik.handleSubmit}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center content-stretch flex-col flex-wrap bg-white p-10 px-16 rounded-lg w-1/3"
      >
        {signupError && (
          <div className="text-red-500 font-medium bg-red-200 py-4 px-6 border-2 border-red-500 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <div className="mx-6">{signupError}</div>
          </div>
        )}
        <div className="flex flex-col my-4">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="hover:border-blue-500 focus:outline-none focus:border-blue-500 border-b-2 my-4"
          />
          {showError && error.email && (
            <div className="text-red-500 font-medium">{error.email}</div>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="hover:border-blue-500 focus:outline-none focus:border-blue-500 border-b-2 my-2"
          />
          {showError && error.password && (
            <div className="text-red-500 font-medium">{error.password}</div>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="password" className="font-semibold">
            Re-Enter Password
          </label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            className="hover:border-blue-500 focus:outline-none focus:border-blue-500 border-b-2 my-2"
          />
          {showError && error.rePassword && (
            <div className="text-red-500 font-medium">{error.rePassword}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-md font-medium"
        >
          Signup
        </button>
        <div className="text-center mt-6">
          Already a user ?{" "}
          <Link to={"/login"} className="text-blue-500 font-medium">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
