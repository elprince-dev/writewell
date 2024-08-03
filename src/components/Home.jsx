"use client";
import React, { useEffect, useState } from "react";
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
  // const posts = [
  //   {
  //     id: 1,
  //     title: "Exploring the Mountains",
  //     desc: "A thrilling adventure through the Rocky Mountains, capturing breathtaking views and stunning landscapes.",
  //     img: "https://www.w3schools.com/w3images/mountains.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "The Beauty of the Ocean",
  //     desc: "An exploration of the vibrant marine life and serene beauty of the ocean.",
  //     img: "https://www.w3schools.com/w3images/ocean.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "Urban Life Unveiled",
  //     desc: "A deep dive into the dynamic and bustling life of the city streets.",
  //     img: "https://www.w3schools.com/w3images/city.jpg",
  //   },
  //   {
  //     id: 4,
  //     title: "Desert Wonders",
  //     desc: "Discover the unique and stunning landscapes of the desert, with its vast sand dunes and rocky outcrops.",
  //     img: "https://www.w3schools.com/w3images/desert.jpg",
  //   },
  //   {
  //     id: 5,
  //     title: "Serenity in the Forest",
  //     desc: "A peaceful journey through lush green forests and tranquil woodland paths.",
  //     img: "https://www.w3schools.com/w3images/forest.jpg",
  //   },
  // ];

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
                    useEffect(() => {
                      router.push(`/post/${post.id}`);
                    }, []);
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
