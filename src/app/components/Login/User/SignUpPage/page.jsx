"use client";

import React, { useRef, useState } from "react";
import axios from "axios";

const page = () => {
  const [Name, setName] = useState();
  const [Contact, setContact] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();

  const name = useRef();
  const contact = useRef();
  const email = useRef();
  const password = useRef();

  function handleSubmit() {
    setName(name.current.value);
    setContact(contact.current.value);
    setEmail(email.current.value);
    setPassword(password.current.value);
    // console.log(Name, Contact, Email, Password);
    handleSession();
  }

  
  async function handleSession() {
    // axios.post("http://localhost/5000/signup", {
    //   Name,
    //   Contact,
    //   Email,
    //   Password,
    // });
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        // name: Name,
        // // Contact,
        // email: Email,
        name: "Krish BillaMan",
        email: "John@example.com",
        admin: true,
        // password: Password,
      });

      const { username, email, isAdmin, loggedIn } = response.data;

    //   console.log(username, email, isAdmin, loggedIn);
    //   alert(username, email, isAdmin, loggedIn);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration error:", error);
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="text-4xl">Sign Up Page</div>
        <div className="flex flex-col gap-3 mt-10">
          <input
            type="text"
            ref={name}
            className="border-4 p-3"
            placeholder="Enter Name"
          />
          <input
            type="number"
            ref={contact}
            className="border-4 p-3"
            placeholder="Enter Contact Number"
            maxLength={10}
          />
          <input
            type="email"
            ref={email}
            className="border-4 p-3"
            placeholder="Enter Email Address"
          />
          <input
            ref={password}
            type="text"
            className="border-4 p-3"
            placeholder="Enter Password"
          />
        </div>
        <div
          onClick={() => {
            handleSubmit();
          }}
          className="cursor-pointer bg-red-600 text-white rounded-lg p-3 m-2"
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default page;
