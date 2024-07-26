import React from "react";
import "../styles/menu.scss";

const Menu = () => {
  const posts = [
    {
      id: 1,
      title: "Exploring the Mountains",
      desc: "A thrilling adventure through the Rocky Mountains, capturing breathtaking views and stunning landscapes.",
      img: "https://www.w3schools.com/w3images/mountains.jpg",
    },
    {
      id: 2,
      title: "The Beauty of the Ocean",
      desc: "An exploration of the vibrant marine life and serene beauty of the ocean.",
      img: "https://www.w3schools.com/w3images/mountains.jpg",
    },
    {
      id: 3,
      title: "Urban Life Unveiled",
      desc: "A deep dive into the dynamic and bustling life of the city streets.",
      img: "https://www.w3schools.com/w3images/mountains.jpg",
    },
    {
      id: 4,
      title: "Desert Wonders",
      desc: "Discover the unique and stunning landscapes of the desert, with its vast sand dunes and rocky outcrops.",
      img: "https://www.w3schools.com/w3images/mountains.jpg",
    },
    {
      id: 5,
      title: "Serenity in the Forest",
      desc: "A peaceful journey through lush green forests and tranquil woodland paths.",
      img: "https://www.w3schools.com/w3images/mountains.jpg",
    },
  ];
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
