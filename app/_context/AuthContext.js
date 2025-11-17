"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("api_token");
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (email, password) => {
    // Example login function
    try {
      // Call your Laravel login API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      // Assuming API returns { user: {...}, token: '...' }
      const { user: userData, token } = response.data;

      // Store token and user info
      localStorage.setItem("api_token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update context state
      setUser(userData);

      // Redirect after successful login
      router.push("/dashboard"); // Or wherever you want to go
      router.refresh(); // Optional: Refresh to update UI state based on new user state
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error (e.g., show message)
      throw error; // Re-throw or handle as needed by your login form
    }
  };

  const updateUser = (userData) => {
    // Directly update user state without making API call
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Clear tokens and user info
    localStorage.removeItem("api_token");
    localStorage.removeItem("user");

    // Update context state
    setUser(null);

    // Redirect after logout
    router.push("/"); // Or login page
    router.refresh(); // Refresh to update UI state based on new user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
