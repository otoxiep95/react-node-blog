import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import BlogPosts from "./components/BlogPosts";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import UserPosts from "./components/UserPosts";
import ForgotPassword from "./components/ForgotPassoword";
import PasswordReset from "./components/PasswordReset";
import WritePost from "./components/WritePost";
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

  const PrivateRoute = ({ component: Component }) => (
    <Route
      render={(props) => (isLogged ? <Component /> : <Redirect to="/login" />)}
    />
  );

  return (
    <Router>
      <div id="app">
        {isLogged ? <h1>Hello User</h1> : <h1>Please Login</h1>}

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isLogged ? (
              <div>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/forgotpassword">ForgotPassoword</Link>
                </li>
              </div>
            ) : (
              <div>
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
                <li>
                  <Link to="/writepost">Write Blog Post</Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
        <main>
          <Switch>
            <PrivateRoute exact path="/" component={BlogPosts} />
            <PrivateRoute exact path="/myposts" component={UserPosts} />
            <Route
              path="/login"
              component={(props) => (
                <Login {...props} setIsLogged={setIsLogged} />
              )}
            />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/myprofile" component={Profile} />
            <PrivateRoute path="/writepost" component={WritePost} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/passwordreset" component={PasswordReset} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
