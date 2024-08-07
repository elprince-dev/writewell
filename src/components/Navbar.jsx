"use client";
import React, { useContext, useState, useEffect } from "react";
import "../styles/navbar.scss";
import Link from "next/link";
import { UserContext } from "@/utilities/UserContext";
import { useRouter } from "next/navigation";

export const categories = [
  "art",
  "science",
  "technology",
  "cinema",
  "design",
  "food",
];

const Navbar = () => {
  const { currentUser, signout } = useContext(UserContext);
  console.log(currentUser);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar_container">
        <div className="logo">
          <Link href="/">
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <div className="links">
          {categories.map((cat, idx) => (
            <Link href={`/?cat=${cat}`} key={idx} className="link">
              <h6>{cat.toUpperCase()}</h6>
            </Link>
          ))}

          {currentUser ? (
            <img
              src={currentUser.img ? currentUser.img : "/default.png"}
              alt=""
            />
          ) : null}

          <Link href="/myBlogs" className="myBlogs">
            @{currentUser?.username}
          </Link>
          {currentUser ? (
            <Link onClick={signout} className="link" href="/signin">
              Sign out
            </Link>
          ) : (
            // <span onClick={signout}>Sign out</span>
            <Link className="link" href="/signin">
              Sign in
            </Link>
          )}
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
