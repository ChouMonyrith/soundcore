"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../_context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const AuthForm = ({ type = "sign-in" }) => {
  const router = useRouter();
  const { login, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "", // Only for registration
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      let url, dataToSend;
      if (type === "sign-in") {
        url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
        dataToSend = { email: formData.email, password: formData.password };
      } else {
        // register
        url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
        dataToSend = {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        };
      }

      const response = await axios.post(url, dataToSend);

      // Store the token (example using localStorage)
      localStorage.setItem("api_token", response.data.access_token);

      // Store user info
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Update the context state directly
      updateUser(response.data.user);
      
      // Redirect to home or previous page
      router.push("/"); // Or router.back()
    } catch (error) {
      console.error(`${type} error:`, error);
      if (error.response && error.response.data) {
        setErrors(
          error.response.data.errors || {
            general: error.response.data.message || "An error occurred.",
          }
        );
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-4 p-10 bg-white rounded border-2 shadow-2xl transform transition-all duration-300 hover:scale-105">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {type === "sign-in"
            ? "Sign in to your account"
            : "Create a new account"}
        </h2>
      </div>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.general}
          </div>
        )}

        {type === "sign-up" && (
          <>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-all duration-200"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-all duration-200"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username[0]}
                </p>
              )}
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-all duration-200"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="email"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-all duration-200 pr-10" // Added pr-10 for button space
          />
          {formData.password && (
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute inset-y-0 right-0 top-6 flex items-center px-3 text-md h-10 w-10 leading-5 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          )}
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>
          )}
        </div>

        {type === "sign-up" && (
          <div className="relative">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm transition-all duration-200"
            />
            {formData.password_confirmation && (
              <button
                type="button"
                onClick={handleShowConfirmPassword}
                className="absolute inset-y-0 right-0 top-6 flex items-center px-3 text-md h-10 w-10 leading-5 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            )}
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-md font-semibold rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading
              ? "Processing..."
              : type === "sign-in"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </div>
      </form>
      {type === "sign-in" ? (
        <div className="flex flex-col items-center text-xs mt-4 text-center">
          <p>New to SoundCore?</p>
          <Link href="/sign-up" className="hover:underline">
            Create an account now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center text-xs mt-4 text-center">
          <p>Already have an account?</p>
          <Link href="/sign-in" className="hover:underline">
            Sign in now
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
