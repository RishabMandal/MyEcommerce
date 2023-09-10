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
        <section class="bg-gray-100 body-font">
          <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div className="border p-5 m-5">
              <div>{process.env.MONGO_URL}</div>
              <Link
                href="/components/Login/User/SignUpPage"
                className="font-bold"
              >
                Go to Sign Up
              </Link>
            </div>
            <div className="bg-white lg:w-[50rem] w-full p-10 rounded-2xl border shadow-xl">
              <div className="text-5xl text-center font-bold py-10">Log In</div>
              <div className="flex flex-col gap-6 mt-10">
                <input
                  type="email"
                  ref={name}
                  className="border-4 p-3 rounded-lg text-2xl"
                  placeholder="Enter Email Address"
                />
                <input
                  ref={password}
                  type="password"
                  className="border-4 p-3 rounded-lg text-2xl"
                  placeholder="Enter Password"
                />
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
