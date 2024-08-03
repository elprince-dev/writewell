"use client";
import React, { useContext } from "react";
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
  const router = useRouter();
  if (!currentUser) {
    router.push("/signin");
  }
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
            <img src={currentUser.img ? currentUser.img : "/default.png"} />
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
