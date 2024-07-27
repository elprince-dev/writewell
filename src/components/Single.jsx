"use client";
import React, { useContext, useEffect, useState } from "react";
import "../styles/single.scss";
import Link from "next/link";
import Menu from "@/components/Menu";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import moment from "moment";
import { userContext } from "@/utilities/UserContext";
const Single = ({ id }) => {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);
  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} />
        <div className="user">
          <img src="https://www.w3schools.com/w3images/mountains.jpg" />
          <div className="info">
            <span>
              {post.first_name} {post.last_name}
            </span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link href={`/write?edit=${id}`}>
                <img src="/edit.png" />
              </Link>

              <img src="/delete.png" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {post.desc}
      </div>

      <Menu />
    </div>
  );
};

export default Single;
