import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BlogPosts from "./components/BlogPosts";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import UserPosts from "./components/UserPosts";

import "./App.css";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  function logout() {
    fetch("http://127.0.0.1:9090/api/users/logout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setIsLogged(false);
        console.log("user logged out", res.response);
      }
    });
  }

  useEffect(() => {
    fetch("http://127.0.0.1:9090/api/users/isloggedin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.logged) {
          setIsLogged(true);
        }
      });
  }, [isLogged]);

  return (
    <Router>
      <div id="app">
        {isLogged ? <h1>Hello User</h1> : <h1>Please Login</h1>}

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <a onClick={logout} href="#">
                Logout
              </a>
            </li>
            <li>
              <Link to="/myprofile">My Profile</Link>
            </li>
            <li>
              <Link to="/myposts">My Blog Posts</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={BlogPosts} />
            <Route exact path="/myposts" component={UserPosts} />
            <Route
              path="/login"
              component={(props) => (
                <Login {...props} setIsLogged={setIsLogged} />
              )}
            />
            <Route path="/register" component={Register} />
            <Route path="/myprofile" component={Profile} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
