import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function WritePost() {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const history = useHistory();

  function writePost() {
    fetch("http://127.0.0.1:9090/api/blogposts/", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
      }),
    }).then((res) => {
      console.log(res);
      history.push("/");
    });
  }

  return (
    <div>
      <form action="">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        ></input>
        <input
          type="textarea"
          name="content"
          placeholder="Write your post here"
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        ></input>
        <button type="button" onClick={writePost}>
          POST
        </button>
      </form>
    </div>
  );
}
