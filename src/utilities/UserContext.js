"use client";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") ||null ));
  //   const [currentUser, setCurerntUser] = useState(JSON.parse(localStorage.getItem("user") ||null);

  const signin = async (inputs) => {
    try {
      const res = await axios.post("/api/auth/signin", inputs);
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Signin failed", err);
    }
  };

  const signout = async () => {
    try {
      await axios.post("/api/auth/signout");
      setCurrentUser(null);
    } catch (err) {
      console.error("Signout failed", err);
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
};
