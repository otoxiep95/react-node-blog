import React, { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  function getUserPosts() {
    fetch("http://127.0.0.1:9090/api/blogposts/getuserposts", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("hello");
        console.log(data);
        setUserPosts(data);
      });
  }

  useEffect(() => {
    fetch("http://127.0.0.1:9090/api/users/getloggeduser", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getUserPosts();
        setUser(data);
      });
  }, []);

  return (
    <div className="profile-container">
      <h1>Name:</h1>
      <h1>Email:</h1>
      <button type="button">Delete Profile</button>
      <div>
        <h2>My blog posts</h2>
        <ul></ul>
      </div>
    </div>
  );
}
