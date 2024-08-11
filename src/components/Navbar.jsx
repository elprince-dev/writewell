"use client";
import React, { useContext, useState, useEffect } from "react";
import "../styles/navbar.scss";
import Link from "next/link";
import { UserContext } from "@/utilities/UserContext";
import { IoMdMenu, IoMdClose } from "react-icons/io";

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
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [navbar, setNavbar] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar_container">
        <div className="logoButton">
          <div className="logo">
            <Link href="/">
              <img src="/logo.png" alt="" />
            </Link>
          </div>
          <div className="button">
            <div onClick={() => setNavbar(!navbar)}>
              {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            </div>
          </div>
        </div>
        <div className={`links ${navbar ? "block" : "hidden"}`}>
          {categories.map((cat, idx) => (
            <Link
              href={`/?cat=${cat}`}
              key={idx}
              className="link"
              onClick={() => setNavbar(!navbar)}
            >
              <h6>{cat.toUpperCase()}</h6>
            </Link>
          ))}

          {currentUser ? (
            <Link href="/editProfile" className="profile_img link">
              <img
                src={currentUser.img ? currentUser.img : "/default.png"}
                alt=""
              />
            </Link>
          ) : // <img
          //   src={currentUser.img ? currentUser.img : "/default.png"}
          //   alt=""
          // />
          null}

          <Link href="/myBlogs" className="myBlogs link">
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
          <div className="write_container">
            <div className="write">
              <Link className="link" href="/write">
                Write
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
