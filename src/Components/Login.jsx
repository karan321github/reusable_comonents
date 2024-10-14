import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { showToast } from "./Toast";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) {
      navigate("/dragDrop");
    }
  }, [user, navigate]);

  const successMessage = (response) => {
    const userData = { email: response.profileObj.email, role: "user" }; // Defaulting role to 'user'
    handleLoginSuccess(userData);
  };

  const errorMessage = (error) => {
    console.error("Login Failed:", error);
    showToast("Google login failed. Please try again.", "error");
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLoginSuccess = (userData) => {
    login(userData);
    showToast("Logged in successfully", "success");
    navigate("/dragDrop");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = { email, role: "user" }; // You can modify role here if needed
      handleLoginSuccess(userData);
    }
  };

  return (
    <div className="container max-w-md mx-auto p-6 bg-stone-200 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
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
            Login
          </button>
          <div className="mt-4">
            <GoogleLogin onSuccess={successMessage} onError={errorMessage} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
