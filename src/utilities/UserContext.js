"use client";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurerntUser] = useState(null);
//   const [currentUser, setCurerntUser] = useState(JSON.parse(localStorage.getItem("user") ||null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if the code is running in the browser
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setCurerntUser(storedUser);
      }
    }
  }, []);

  const signin = async (inputs) => {
    const res = await axios.post("/api/auth/signin", inputs);
    setCurerntUser(res.data);
  };

  const signout = async (inputs) => {
    const res = await axios.post("/api/auth/signout");
    setCurerntUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <userContext.Provider value={{ currentUser, signin, signout }}>
      {children}
    </userContext.Provider>
  );
};
