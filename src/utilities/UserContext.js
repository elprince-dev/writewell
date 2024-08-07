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
    console.log("Signin attempt with inputs:", inputs);
    const res = await axios.post("/api/auth/signin", inputs);
    console.log("Signin response:", res.data);
    setCurrentUser(res.data);
    window.localStorage.setItem("user", JSON.stringify(res.data));
  } catch (err) {
    console.error("Signin failed:", err);
    if (err.response) {
      console.error("Error response data:", err.response.data);
      console.error("Error response status:", err.response.status);
    }
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
