"use client";

import * as React from "react";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { usePathname } from "next/navigation";

const style = {
  position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
};

export default function SideNavbar({
  open,
  setOpen,
  name,
  isAdminView,
  openAdminModal,
  setOpenAdminModal,
}) {
  //   const handleOpen = () => setOpen(true);
  const route = usePathname();
  const handleClose = () => setOpen(false);

  return (
    // <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={style}
    >
      <div className="bg-gray-800 rounded-r-xl text-white shadow-xl py-5 pr-5 min-h-screen w-fit">
        <div className="text-center font-bold text-2xl pl-5 pb-5">
          {name || "Not Logged In"}
        </div>
        <div className="max-w-[90vw]">
          <Link
            href="/components/Products/MainPage"
            onClick={() => setOpen(false)}
            className={`border-l-4  text-lg ${
              route === "/components/Products/MainPage"
                ? "border-red-600"
                : "border-gray-800"
            } flex flex-row hover:border-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <div className="ml-2">Home</div>
          </Link>
          <Link
            href="/components/Products/Categories"
            onClick={() => setOpen(false)}
            className={`border-l-4 ${
              route === "/components/Products/Categories"
                ? "border-red-600"
                : "border-gray-800"
            } text-lg flex flex-row hover:border-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
              />
            </svg>
            <div className="ml-2">Categories</div>
          </Link>
          <Link
            href="/components/Account"
            onClick={() => setOpen(false)}
            className={`border-l-4 ${
              route === "/components/Account"
                ? "border-red-600"
                : "border-gray-800"
            } text-lg flex flex-row hover:border-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div className="ml-2">Account</div>
          </Link>
          {isAdminView && (
            <button
              onClick={() => setOpenAdminModal(!openAdminModal)}
              className={`border-l-4 ${
                route === "/components/AdminView"
                  ? "border-red-600"
                  : "border-gray-800"
              } text-lg flex flex-row hover:border-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>
              <div className="ml-2">Admin View</div>
            </button>
          )}
          <Link
            href="/components/Login/User/LoginPage"
            onClick={() => setOpen(false)}
            className={`border-l-4 ${
              route === "/components/Login/User/LoginPage"
                ? "border-red-600"
                : "border-gray-800"
            } text-lg flex flex-row hover:border-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <div className="ml-2">{!name ? "Login" : "Logout"}</div>
          </Link>
          <Link
            href="/components/Products/MainPager"
            onClick={() => setOpen(false)}
            className={`border-l-4 border-gray-800 text-lg flex flex-row hover:border-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <div className="ml-2">Contact Us</div>
          </Link>
        </div>
      </div>
    </Modal>
    // </div>
  );
}
