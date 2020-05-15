import React, { useState, useEffect } from "react";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function register() {
    fetch("http://127.0.0.1:9090/api/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }),
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <form action="">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          onBlur={(e) => {
            setFirstName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          onBlur={(e) => {
            setLastName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onBlur={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onBlur={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          onBlur={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
        <button type="button" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
}
