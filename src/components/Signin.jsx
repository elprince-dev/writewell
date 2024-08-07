"use client";
import React, { useContext, useState, useEffect } from "react";
import "../styles/signin.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/utilities/UserContext";

const Signin = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { currentUser, signin } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before attempting sign in

    try {
      // await axios.post("/api/auth/signin", inputs);
      await signin(inputs);
      setSuccess("You have signed in successfully!");
      setTimeout(() => {
        if (isClient) {
          // Only use router.push on the client-side
          router.push("/");
        }
      }, 100000);
    } catch (err) {
      console.error("Sign-in error:", err); // Log error for debugging
      if (err.response) {
        setError(err.response.data); // Display error message if available
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="auth">
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Sign in</button>
        {err && <p>{err}</p>}
        {success && <p>{success}</p>}
        <span>
          Don&apos;t you have an account? <Link href="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Signin;
