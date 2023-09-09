"use client";

import { GlobalContext } from "@/context";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";

const page = () => {
  const { isAuthUser, setIsAuthUser } = useContext(GlobalContext);
  const { email, setEmail } = useContext(GlobalContext);
  const [Name, setName] = useState();
  const [Password, setPassword] = useState();

  const name = useRef();
  const password = useRef();

  function handleSubmit() {
    setName(name.current.value);
    setPassword(password.current.value);
    // console.log(Name, Password);
    if (name.current.value && password.current.value) {
      axios
        .post("/api/LoginPage", {
          email: name.current.value,
          password: password.current.value,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data && response.data.length == 1) {
            setIsAuthUser(true);
            setEmail(name.current.value);
          }
        })
        .catch((error) => console.error(error));
    }
  }
  return (
    <div>
      <div>
        <div className="flex flex-col items-center">
          <div className="border p-5 m-5">
            <Link
              href="/components/Login/User/SignUpPage"
              className="font-bold"
            >
              Go to Sign Up
            </Link>
          </div>
          <div className="text-4xl">Login Page</div>
          <div className="flex flex-col gap-3 mt-10">
            <input
              type="email"
              ref={name}
              className="border-4 p-3"
              placeholder="Enter Email"
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
    </div>
  );
};

export default page;
