"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/write.scss";
import { categories } from "@/components/Navbar";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import moment from "moment";

const Write = ({}) => {
  const searchParams = useSearchParams();
  const initialTitle = searchParams.get("title");
  const initialDesc = searchParams.get("desc");
  const initialCat = searchParams.get("cat");
  const id = searchParams.get("id");

  const [value, setValue] = useState(initialDesc || "");
  const [title, setTitle] = useState(initialTitle || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(initialCat || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData);
      console.log("this function is excuted");
      return res.data;
    } catch (err) {
      console.log("error happened");
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filename = await upload();
    const imgUrl = `/uplods/${filename}`;

    try {
      id
        ? await axios.put(`/api/posts/${id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/api/posts`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          });
    } catch (err) {}
  };
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="editor"
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {categories.map((category) => (
            <div key={category} className="cat">
              <input
                type="radio"
                name="cat"
                value={cat}
                id={category}
                checked={category === cat}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
