"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
// import { adminNavOptions, navOptions } from "@/utils";
import { GlobalContext } from "@/context";
import Link from "next/link";
import axios from "axios";
import AdminModal from "../AdminModal.jsx";
import Cookies from "js-cookie";

const Navbar = () => {
  // const isAuthUser = false;
  // const [isAuthUser, setIsAuthUser] = useState(false);
  const { isAuthUser, setIsAuthUser } = useContext(GlobalContext);
  const [isAdminView, setIsAdminView] = useState(false);
  // const [isAdminView, setIsAdminView] = useState(true);
  const [Name, setName] = useState();
  // const user = {
  //   role: "admin",
  // };

  axios.defaults.withCredentials = true;
  const { setEmail } = useContext(GlobalContext);
  async function handleSession() {
    try {
      const response = await axios
        .get("https://my-ecommerce-api-2.vercel.app/test")
        // .get("http://localhost:5001/test")
        .catch((error) => console.log(error));
      console.log(response.data);
      const { username, email, isAdmin, loggedIn } = response.data;
      // console.log(username, email, isAdmin, loggedIn);
      // alert(username, email, isAdmin, loggedIn);
      if (response.data.email) {
        setIsAuthUser(loggedIn);
        setIsAdminView(isAdmin);
        setName(username);
        setEmail(email);
      }
    } catch (error) {
      console.error("Session error:", error);
      // alert("Session error:", error);
    }
  }

  useEffect(() => {
    handleSession();
  }, []);

  // const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const { Cart, setCart, email } = useContext(GlobalContext);
  useEffect(() => {
    try {
      if (email) {
        axios
          .post("/api/Cart", { operation: "get", email: email })
          .then((res) => {
            // console.log(res.data);
            setCart(res.data);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  const [openModal, setOpenModal] = useState(false);

  const [Products, setProducts] = useState();
  const [searchBar, setSearchBar] = useState(false);

  const handleSearch = (inputValue) => {
    axios
      .get("/api/MainPage")
      .then((res) => {
        // console.log(res);
        setProducts(
          res.data?.filter((product) => {
            return (
              product && product?.title?.toLowerCase()?.includes(inputValue)
            );
          })
        );
      })
      .catch((err) => console.log(err));
  };

  // Check if cookies are enabled
  useEffect(() => {
    // Attempt to set a test cookie
    Cookies.set("thirdPartyCookieName", "testValue", { expires: 1 });
    // Attempt to read the test cookie
    const testCookieValue = Cookies.get("thirdPartyCookieName", {
      domain: "https://myecommerce-seven.vercel.app",
    });
    // Check if the test cookie was successfully set and read
    if (!testCookieValue) {
      alert(
        "Cookies are not enabled, please allow cookies for this website to work."
      ); // Cookies are disabled
    }
    // else {
    //   alert("Cookie enabled");
    // }
    // Remove the test cookie
    Cookies.remove("testCookie");
  }, []);

  return (
    <>
      <nav className="bg-[#121212] text-white sticky w-full z-20 top-0 left-0">
        <div className="flex flex-col lg:flex-row px-2 py-3 justify-between items-center">
          <div className="text-2xl font-bold">PowerBilla Ecommerce</div>
          {/* <div className="cursor-pointer" onClick={() => handleSession()}>
            Click to check session
          </div> */}
          <div className="flex flex-wrap items-center">
            <Link
              href="/components/Products/MainPage"
              className={`font-semibold mx-5 text-base hover:scale-105 hover:text-red-600 duration-200`}
            >
              Home
            </Link>
            <Link
              href="/components/Products/Categories"
              className={`font-semibold mx-5 text-base hover:scale-105 hover:text-red-600 duration-200`}
            >
              Categories
            </Link>
            <Link
              href="/components/Products/MainPage"
              className={`font-semibold mx-5 text-base hover:scale-105 hover:text-red-600 duration-200`}
            >
              Sale
            </Link>
            <Link
              href="/components/Products/Payment/AddOrderToDB"
              className={`font-semibold text-red-500 mx-5 text-base hover:scale-105 hover:text-red-600 duration-200`}
            >
              Payment check
            </Link>
            {/* <button
              onClick={() => setSearchBar(!searchBar)}
              className={`font-semibold mx-5 text-base hover:text-red-600 duration-200`}
            >
              Search
            </button> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-7 h-7 inline-block mx-5 cursor-pointer hover:scale-110 duration-200"
              onClick={() => setSearchBar(!searchBar)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <div className="flex items-center">
            {/* <div className="text-base font-semibold mr-2">
              User: {Name || "Error"}
            </div> */}
            {isAuthUser && (
              <Link
                href="/components/Account"
                className="bg-red-600 hover:bg-red-700 duration-200 text-sm font-semibold text-white rounded-lg p-2 mx-2"
              >
                {Name || "Account"}
              </Link>
            )}
            <Link
              href="/components/Products/Cart"
              className="bg-red-600 hover:bg-red-700 duration-200 text-sm font-semibold text-white rounded-lg p-2 mx-2"
            >
              Cart ({Cart && Cart.length})
            </Link>
            {isAdminView && (
              <>
                <button
                  onClick={() => setOpenModal(!openModal)}
                  className="bg-red-600 hover:bg-red-700 duration-200 text-sm font-semibold text-white rounded-lg p-2 mx-2"
                >
                  Admin View
                </button>
                {/* <Link
                  href="/"
                  className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white rounded-lg p-2 mx-2"
                >
                  User View
                </Link> */}
              </>
            )}
            {!isAuthUser ? (
              <Link
                href="/components/Login/User/LoginPage"
                className="bg-red-600 hover:bg-red-700 duration-200 text-sm font-semibold text-white rounded-lg p-2 mx-2"
              >
                Login
              </Link>
            ) : (
              <button
                href="/"
                onClick={() =>
                  window.confirm("Are you sure you want to Logout?")
                }
                className="bg-red-600 hover:bg-red-700 duration-200 text-sm font-semibold text-white rounded-lg p-2 mx-2"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <AdminModal open={openModal} setOpen={setOpenModal} />
        {searchBar && (
          <div className="p-2 pt-0 w-[80vw] mx-auto">
            {/* <div>Search bar</div> */}
            <div className="flex flex-row items-center gap-5">
              <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                className="text-black block outline-none w-[80vw] p-2 text-base font-semibold rounded-xl"
                placeholder="Type to search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-7 h-7 cursor-pointer hover:scale-110 duration-200"
                onClick={() => setSearchBar(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            {/* <div>Search Results</div> */}
            <div className="max-h-[40vh] overflow-y-scroll">
              {Products?.map((product) => {
                // console.log(Products);
                return (
                  <Link
                    href={`/components/Products/ViewProductDetail/${product.id}`}
                    key={product?.id}
                    className="my-1 py-1 px-2 rounded-lg block hover:bg-gray-700"
                  >
                    {product?.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
