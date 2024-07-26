import React from "react";
import "../styles/navbar.scss";
import Link from "next/link";

export const categories = ["art", "science", "technology", "cinema", "design", "food"];

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_container">
        <div className="logo">
          <img src="/logo.png" alt="" />
        </div>
        <div className="links">
          {categories.map((cat, idx) => (
            <Link href={`/?cat=${cat}`} key={idx} className="link">
              <h6>{cat.toUpperCase()}</h6>
            </Link>
          ))}
          <span>Mohamed</span>
          <span>Sign out</span>
          <span className="write">
            <Link className="link" href="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
