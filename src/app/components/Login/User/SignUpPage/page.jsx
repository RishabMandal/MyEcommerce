"use client";

import React, { useRef, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

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
    try {
      axios
        .post("/api/SignUpPage", {
          name: name.current.value,
          contact: contact.current.value,
          email: email.current.value,
          password: password.current.value,
          isAdmin: false,
        })
        .then((response) => alert("Successful"))
        .catch((error) => alert(error.message));
    } catch (error) {
      console.error("Sign Up error:", error);
      alert("Sign Up error:", error);
    }
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
        name: name.current.value,
        email: email.current.value,
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
      <section class="bg-gray-100 body-font">
        <div class="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
          <div className=" bg-white lg:w-[30rem] w-full p-5 rounded-2xl border shadow-xl">
            <div className="text-3xl text-center font-bold py-5">Sign Up</div>
            <div className="flex flex-col gap-3 mt-5">
              {/* <input
                type="text"
                ref={name}
                className="border-4 p-2 rounded-lg text-lg"
                placeholder="Enter Name"
              /> */}
              <TextField
                id="outlined-basic"
                inputRef={name}
                type="text"
                label="Name"
                placeholder="Enter Name"
                variant="outlined"
                // sx={{ border: "2px solid", color: "red" }}
                // sx={{ fontSize: "2rem", fontWeight: "semi-bold" }}
              />
              <TextField
                id="outlined-basic"
                inputRef={contact}
                type="number"
                label="Enter Contact Number"
                variant="outlined"
                // sx={{ border: "2px solid", color: "red" }}
                // sx={{ fontSize: "2rem", fontWeight: "semi-bold" }}
              />
              {/* <input
                type="number"
                ref={contact}
                className="border-4 p-2 rounded-lg text-lg"
                placeholder="Enter Contact Number"
                maxLength={10}
              /> */}
              <TextField
                id="outlined-basic"
                inputRef={email}
                type="email"
                label="Email Address"
                variant="outlined"
                placeholder="Enter Email Address"

                // sx={{ border: "2px solid", color: "red" }}
                // sx={{ fontSize: "2rem", fontWeight: "semi-bold" }}
              />
              {/* <input
                type="email"
                ref={email}
                className="border-4 p-2 rounded-lg text-lg"
                placeholder="Enter Email Address"
              /> */}
              <TextField
                id="outlined-basic"
                inputRef={password}
                type="password"
                label="Password"
                variant="outlined"
                placeholder="Enter Password"

                // sx={{ border: "2px solid", color: "red" }}
                // sx={{ fontSize: "2rem", fontWeight: "semi-bold" }}
              />
              {/* <input
                ref={password}
                type="password"
                className="border-4 p-2 rounded-lg text-lg"
                placeholder="Enter Password"
              /> */}
            </div>
            <div
              onClick={() => {
                handleSubmit();
              }}
              className="cursor-pointer text-lg font-bold text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-2 mt-8"
            >
              Sign Up
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
