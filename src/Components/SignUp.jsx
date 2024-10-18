import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { showToast } from "./Toast";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../Store/userSlice";

function SignUp() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const successMessage = (response) => {
    const userData = { email: response.profileObj.email, role: "user" }; // Defaulting role to 'user'
    handleLoginSuccess(userData);
  };

  const errorMessage = (error) => {
    console.error("Login Failed:", error);
    showToast("Google login failed. Please try again.", "error");
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "", confirmPassword: "" };
    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required ";
    } else if (password.length < 8) {
      newErrors.password = "Password must be atleast 8 characters";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "password and confirmpassword not matched";
    }

    setErrors(newErrors);
    return (
      !newErrors.email && !newErrors.password && !newErrors.confirmPassword
    );
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(validateForm());
      showToast("SignUp success");
    } else {
      ShowToast("User validation failed");
    }
  };

  return (
    <div className="container max-w-md mx-auto p-6 bg-stone-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        SignUp
      </h1>

      <form className="space-y-4" onSubmit={handleSignUp}>
        <div>
          <label>Name</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter your full Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="text-right">
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            SignUp
          </button>
          <div className="mt-4">
            <GoogleLogin onSuccess={successMessage} onError={errorMessage} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
