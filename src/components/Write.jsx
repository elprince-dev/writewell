"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/write.scss";
import { categories } from "@/components/Navbar";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const filename = file ? await upload() : undefined;

    let imgUrl;
    if (file) {
      const filename = await upload();
      imgUrl = filename.filePath;
    } else if (!id) {
      // New post without an uploaded image
      imgUrl = "/default-post.jpg";
    }

    const postData = {
      title,
      desc: value,
      cat,
      img: imgUrl,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };
    // const imgUrl = filename
    //   ? `/uploads/${filename.filename}`
    //   : id
    //   ? undefined
    //   : "/logo-color.png";

    try {
      if (id) {
        // Editing an existing post
        await axios.put(`/api/posts/${id}`, {
          ...postData,
          img: file ? imgUrl : undefined, // Only update image if a new one is uploaded
        });
      } else {
        // Creating a new post
        const response = await axios.post(`/api/posts`, postData);
        console.log("This is done");
        console.log("response is: " + response);
      }

      if (isClient) {
        // Only use router.push on the client-side

        router.push("/");
      }
    } catch (err) {
      console.error("Error object:", err);
      if (err.response && err.response.status === 401) {
        console.error("Redirecting due to 401 error");
        router.push("/"); // Redirect to the home page
      }
    }
  };

  /// edit   --- upload new--- upload
  //         --- no upload  --- no change
  ///new     ---- upload ---- upload
  //         ----- no upload --- default pic
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
            required
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
                value={category}
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
