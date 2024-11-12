import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase.init";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // reset status
    setErrorMessage("");
    setSuccess(false);

    // User Login
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);

        // email verification
        if (!result.user.emailVerified) {
          setErrorMessage("Please verify your email.");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  // Handle forget password
  const handleForgetPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      setErrorMessage("Please provide a valid password.");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("Reset email sent, please check your email.");
      });
    }
  };

  return (
    <div className="w-4/12 mx-auto shadow-md bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mt-5 text-center pt-10">Login</h2>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label onClick={handleForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}
        {success && <p className="text-green-600 mt-5">Login Successful!</p>}
      </form>
    </div>
  );
};

export default Login;
