import React from "react";
import "../styles/signin.scss";
import Link from "next/link";

const Register = () => {
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder="username" />
        <input required type="email" placeholder="email" />
        <input required type="password" placeholder="password" />
        <button>Sign in</button>
        <p>This is an error!</p>
        <span>
          Do you have an account? <Link href="/signin">Sign in</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
