import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const history = useHistory();

  function forgotPassword() {
    fetch("http://127.0.0.1:9090/api/users/forgotpassword", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <div>
      <form action="">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            console.log(e.target.value);
            setEmail(e.target.value);
          }}
        ></input>

        <button type="button" onClick={forgotPassword}>
          Send Email
        </button>
      </form>
    </div>
  );
}
