import React from "react";
import "../styles/signin.scss";
import Link from "next/link";

const Signin = () => {
  return (
    <div className="auth">
      <h1>Sign in</h1>
      <form>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>Sign in</button>
        <p>This is an error!</p>
        <span>
          Don't you have an account? <Link href="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Signin;
