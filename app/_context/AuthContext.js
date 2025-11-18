"use client";

import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

axios.defaults.withCredentials = true; // important for cookies

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user on app load
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const profile = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      { withCredentials: true }
    );

    setUser(profile.data.user);
  };

  const updateUser = async (user) => {
    // await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
    //   withCredentials: true,
    // });
    setUser(user);
  };

  const logout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
