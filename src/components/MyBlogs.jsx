"use client";
import React, { useState, useEffect } from "react";
import "../styles/myBlogs.scss";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/me`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);
  return (
    <div className="myBlogs_container">
      <div className="header">
        <h1>My Blogs</h1>
      </div>
      <div className="blogs">
        {/* Render blogs here */}
        {posts ? (
          posts.map((post) => (
            <Link href={`/post/${post.id}`} className="blogLink" key={post.id}>
              <div className="blog">
                <div className="title">
                  <h3>{post.title}</h3>
                </div>

                <img
                  src={post.img ? post.img : "/default-post.jpg"}
                  width={110}
                  height={110}
                  alt=""
                />
              </div>
            </Link>
          ))
        ) : (
          <h3>You have no blogs.</h3>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
