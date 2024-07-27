"use client";
import React, { useState } from "react";
import "../styles/signin.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/signin", inputs);
      setSuccess("You have signed in successfully successfully!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.response.data);
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
          Don't you have an account? <Link href="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Signin;
