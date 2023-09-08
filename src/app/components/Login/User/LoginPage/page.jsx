"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";

const page = () => {
  const [Name, setName] = useState();
  const [Password, setPassword] = useState();

  const name = useRef();
  const password = useRef();

  function handleSubmit() {
    setName(name.current.value);
    setPassword(password.current.value);
    console.log(Name, Password);
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
              type="text"
              ref={name}
              className="border-4 p-3"
              placeholder="Enter Name"
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
