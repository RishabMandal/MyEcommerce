"use client";

import { GlobalContext } from "@/context";
import { TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";

const page = () => {
  const { isAuthUser, setIsAuthUser } = useContext(GlobalContext);
  const { email, setEmail } = useContext(GlobalContext);
  // const [Name, setName] = useState();
  // const [Password, setPassword] = useState();

  const name = useRef();
  const password = useRef();

  function handleSubmit() {
    // setName(name.current.value);
    // setPassword(password.current.value);
    // console.log(Name, Password);
    if (name.current.value && password.current.value) {
      axios
        .post(
          "/api/LoginPage",
          {
            email: name.current.value,
            password: password.current.value,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // console.log(response.data);
          if (response.data && response.data.length == 1) {
            setIsAuthUser(true);
            setEmail(name.current.value);
          }
        })
        .catch((error) => console.error(error));
      handleSession();
    }
  }

  async function handleSession() {
    try {
      const response = await axios
        .post("http://localhost:5000/signup", {
          name: "Rishab Mandal",
          email: name.current.value,
          admin: true,
        })
        .catch((error) => console.error(error));
      // const { username, email, isAdmin, loggedIn } = response.data;
      //   console.log(username, email, isAdmin, loggedIn);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration error:", error);
    }
  }

  return (
    <div>
      <div>
        <section class="bg-gray-100 body-font">
          <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div className="border p-5 m-5">
              {/* <div>{process.env.MONGO_URL}</div> */}
              <Link
                href="/components/Login/User/SignUpPage"
                className="font-bold text-xl"
              >
                Go to Sign Up
              </Link>
            </div>
            <div className="bg-white lg:w-[50rem] w-full p-10 rounded-2xl border shadow-xl">
              <div className="text-5xl text-center font-bold py-10">Log In</div>
              <div className="flex flex-col gap-6 mt-10">
                {/* <input
                  type="email"
                  ref={name}
                  className="border-4 p-3 rounded-lg text-2xl"
                  placeholder="Enter Email Address"
                /> */}
                <TextField
                  id="outlined-basic"
                  inputRef={name}
                  type="text"
                  label="Email Address"
                  variant="outlined"
                  // sx={{ border: "2px solid", color: "red" }}
                  // sx={{ fontSize: "2rem", fontWeight: "semi-bold" }}
                />
                <TextField
                  id="outlined-basic"
                  inputRef={password}
                  type="password"
                  label="Password"
                  variant="outlined"
                  // sx={{ border: "2px solid", color: "red" }}
                  // sx={{ fontSize: "2rem", fontWeight: "semi-bold" }}
                />
                {/* <input
                  ref={password}
                  type="password"
                  className="border-4 p-3 rounded-lg text-2xl"
                  placeholder="Enter Password"
                /> */}
              </div>
              <div
                onClick={() => {
                  handleSubmit();
                }}
                className="cursor-pointer text-3xl font-bold text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 mt-16"
              >
                Log In
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
