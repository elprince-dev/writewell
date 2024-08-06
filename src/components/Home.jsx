"use client";
import React, { useEffect, useState, useContext } from "react";
import "../styles/home.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className="link" href={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button
                onClick={() => {
                  if (isClient) {
                    // Only use router.push on the client-side
                    router.push(`/post/${post.id}`);
                  }
                }}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
