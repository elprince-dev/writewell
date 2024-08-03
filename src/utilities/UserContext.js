"use client";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem("user") || null);
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const signin = async (inputs) => {
    try {
      const res = await axios.post("/api/auth/signin", inputs);
      setCurrentUser(res.data);
      window.localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Signin failed", err);
    }
  };

  const signout = async () => {
    try {
      await axios.post("/api/auth/signout");
      setCurrentUser(null);
      window.localStorage.removeItem("user");
    } catch (err) {
      console.error("Signout failed", err);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
};
