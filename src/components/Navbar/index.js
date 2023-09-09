"use client";

import React, { useContext, useEffect, useState } from "react";
// import { adminNavOptions, navOptions } from "@/utils";
import { GlobalContext } from "@/context";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
  // const isAuthUser = false;
  // const [isAuthUser, setIsAuthUser] = useState(false);
  const { isAuthUser, setIsAuthUser } = useContext(GlobalContext);
  const [isAdminView, setIsAdminView] = useState(false);
  // const isAdminView = false;
  const [Name, setName] = useState();
  const user = {
    role: "admin",
  };

  axios.defaults.withCredentials = true;
  async function handleSession() {
    // axios.post("http://localhost/5000/signup", {
    //   Name,
    //   Contact,
    //   Email,
    //   Password,
    // });
    try {
      // const response = await axios.post("http://localhost:5000/signup", {
      //   // name: Name,
      //   // // Contact,
      //   // email: Email,
      //   name: "John",
      //   email: "John@example.com",
      //   admin: true,
      //   // password: Password,
      // });
      const response = await axios.get("http://localhost:5000/test");
      console.log(response.data);
      const { username, email, isAdmin, loggedIn } = response.data;
      // console.log(username, email, isAdmin, loggedIn);
      // alert(username, email, isAdmin, loggedIn);
      setIsAuthUser(loggedIn);
      setIsAdminView(isAdmin);
      setName(username);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration error:", error);
    }
  }

  useEffect(() => {
    handleSession();
  }, []);

  // const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const { Cart } = useContext(GlobalContext);
  return (
    <>
      <nav className="bg-[#121212] text-white sticky w-full z-20 top-0 left-0">
        <div className="flex flex-row px-4 py-5 justify-between items-center">
          <div className="text-4xl font-bold">PowerBilla Ecommerce</div>
          <div className="cursor-pointer" onClick={() => handleSession()}>
            Click to check session
          </div>
          <div>
            <Link
              href="/components/Products/MainPage"
              className={`font-semibold mx-5 text-xl hover:text-red-600 duration-200`}
            >
              Home
            </Link>
            <Link
              href="/components/Products/Categories"
              className={`font-semibold mx-5 text-xl hover:text-red-600 duration-200`}
            >
              Categories
            </Link>
            <Link
              href="/components/Products/MainPage"
              className={`font-semibold mx-5 text-xl hover:text-red-600 duration-200`}
            >
              Sale
            </Link>
          </div>
          <div className="flex items-center">
            <div className="text-xl font-semibold mr-2">
              User: {Name || "Error"}
            </div>
            <Link
              href="/components/Account"
              className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white rounded-lg p-3 mx-2"
            >
              Account
            </Link>
            <Link
              href="/components/Products/Cart"
              className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white rounded-lg p-3 mx-2"
            >
              Cart ({Cart && Cart.length})
            </Link>
            {isAdminView && (
              <>
                <Link
                  href="/components/AdminView"
                  className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white rounded-lg p-3 mx-2"
                >
                  Admin View
                </Link>
                <Link
                  href="/"
                  className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white rounded-lg p-3 mx-2"
                >
                  User View
                </Link>
              </>
            )}
            {!isAuthUser ? (
              <Link
                href="/components/Login"
                className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white rounded-lg p-3 mx-2"
              >
                Login
              </Link>
            ) : (
              <Link
                href="/"
                className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white rounded-lg p-3 mx-2"
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
