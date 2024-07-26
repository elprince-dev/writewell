"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/write.scss";
import { categories } from "@/components/Navbar";
const Write = () => {
  const [value, setValue] = useState("");
  console.log(categories);
  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Title" />
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
          <input style={{ display: "none" }} type="file" id="file" />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {categories.map((cat) => (
            <div key={cat} className="cat">
              <input type="radio" name="cat" value={cat} id={cat} />
              <label htmlFor={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
