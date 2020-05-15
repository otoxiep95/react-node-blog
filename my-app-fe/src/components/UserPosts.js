import React, { useState, useEffect } from "react";

export default function UserPosts() {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:9090/api/blogposts/getuserposts", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("hello");
        console.log(data);
        setUserPosts(data);
      });
  }, []);

  return (
    <div>
      <h1>My Posts</h1>
      <div>
        <ul>
          {userPosts.map((item) => (
            <div className="user-blog-post">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <p>
                By: {item.user.first_name} {item.user.last_name}
              </p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
