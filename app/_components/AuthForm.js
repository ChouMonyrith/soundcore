"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "../_context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

axios.defaults.withCredentials = true; // important for cookies

const AuthForm = ({ type = "sign-in" }) => {
  const router = useRouter();
  const { login, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      let url, payload;

      if (type === "sign-in") {
        url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
        payload = {
          email: formData.email,
          password: formData.password,
        };
      } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
        payload = {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        };
      }

      const res = await axios.post(url, payload, {
        withCredentials: true,
      });

      // Update context with user data
      updateUser(res.data.user);

      // Redirect
      router.push("/");
    } catch (error) {
      console.error("Auth error:", error);

      if (error.response?.data) {
        setErrors(
          error.response.data.errors || {
            general: error.response.data.message || "Something went wrong.",
          }
        );
      } else {
        setErrors({
          general: "Network error. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-4 p-10 bg-white rounded border-2 shadow-2xl transform transition-all duration-300 hover:scale-105">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        {type === "sign-in"
          ? "Sign in to your account"
          : "Create a new account"}
      </h2>

      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "sign-up" && (
          <>
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username[0]}</p>
              )}
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>

          {errors.password && (
            <p className="text-red-500">{errors.password[0]}</p>
          )}
        </div>

        {type === "sign-up" && (
          <div className="relative">
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              name="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </button>

            {errors.password_confirmation && (
              <p className="text-red-500">{errors.password_confirmation[0]}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? "bg-gray-300" : "bg-black hover:bg-gray-800"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
        >
          {loading
            ? "Processing..."
            : type === "sign-in"
            ? "Sign In"
            : "Sign Up"}
        </button>
      </form>

      {type === "sign-in" ? (
        <div className="text-xs text-center mt-4">
          <p>New to SoundCore?</p>
          <Link href="/sign-up" className="hover:underline">
            Create an account
          </Link>
        </div>
      ) : (
        <div className="text-xs text-center mt-4">
          <p>Already have an account?</p>
          <Link href="/sign-in" className="hover:underline">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
