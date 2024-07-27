"use client";
import React, { useState } from "react";
import "../styles/register.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
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
      await axios.post("/api/auth/register", inputs);
      setSuccess("User has been registered successfully!");
      setTimeout(() => {router.push("/signin");}, 2000);
      
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="first name"
          name="first_name"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="last name"
          name="last_name"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} type="submit">
          Register
        </button>
        {err && <p>{err}</p>}
        {success && <p>{success}</p>}
        <span>
          Do you have an account? <Link href="/signin">Sign in</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
