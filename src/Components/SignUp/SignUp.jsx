import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    console.log(email, password);

    // reset status
    setErrorMessage("");
    setSuccess(false);

    // terms and condition
    if (!terms) {
      setErrorMessage("You have not accepted our Terms and conditions.");
      return;
    }

    // password validation
    if (password < 6) {
      setErrorMessage("Password should be at least 6 characters.");
      return;
    }

    // Create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // send email verification
        sendEmailVerification(auth.currentUser).then(() => {
          alert("Sent email verification");
        });
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="w-4/12 mx-auto shadow-md bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mt-5 text-center pt-10">Sign Up</h2>
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
          <button
            type="button"
            className="absolute right-3 top-12"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </div>
        <label className="label cursor-pointer justify-start">
          <input name="terms" type="checkbox" className="checkbox" />
          <span className="label-text ml-2">
            Accept our Terms and conditions.
          </span>
        </label>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}
        {success && (
          <p className="text-green-600  mt-5">User creating is successful!</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
