"use client";
import React, { useContext, useEffect, useState } from "react";
import "../styles/single.scss";
import Link from "next/link";
import Menu from "@/components/Menu";
import axios from "axios";
import moment from "moment";
import { UserContext } from "@/utilities/UserContext";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
const Single = ({ id }) => {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(UserContext);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();

  if (!currentUser) {
    if (isClient) {
      // Only use router.push on the client-side
      router.push("/signin");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (e) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      if (isClient) {
        // Only use router.push on the client-side

        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} />
        <div className="user">
          <img src={post.userImg ? post.userImg : "/default.png"} />

          <div className="info">
            <span>
              {post.first_name} {post.last_name}
            </span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link
                href={{
                  pathname: "/write",
                  query: {
                    id: id,
                    title: post.title,
                    desc: post.desc,
                    img: post.img,
                    cat: post.cat,
                  },
                }}
              >
                <img src="/edit.png" />
              </Link>

              <img src="/delete.png" onClick={handleDelete} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>

      <Menu cat={post?.cat} />
    </div>
  );
};

export default Single;
