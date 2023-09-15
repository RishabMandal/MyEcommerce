"use client";

import { GlobalContext } from "@/context";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { email, setEmail } = useContext(GlobalContext);

  const [name, setName] = useState();
  const [contact, setContact] = useState();
  const [isAdmin, setisAdmin] = useState(false);
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (email) {
      axios
        .post("/api/Account", { email: email })
        .then((response) => {
          //   console.log(response.data);
          if (response.data && response.data.length == 1) {
            setName(response.data[0].name);
            setContact(response.data[0].contact);
            setisAdmin(response.data[0].isAdmin);
          }
        })
        .catch((error) => console.error(error));
      axios
        .post("/api/Orders", { email: email })
        .then((response) => {
          //   console.log(response.data);
          setOrders(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <div>
      <div className="bg-gray-100 p-5 min-h-[70vh]">
        <div className="flex flex-col-reverse lg:flex-row gap-5 justify-between">
          <div className="bg-white rounded-xl flex-1 border shadow-xl p-10">
            <div className="text-xl font-bold mb-10">Orders</div>
            {orders ? (
              orders.map((order) => {
                return (
                  <div className="my-3 border-t">
                    <div
                      key={order?.id}
                      className="flex flex-col justify-between rounded-xl hover:scale-105 duration-200 p-5 cursor-pointer bg-white"
                    >
                      <Link
                        href={`/components/Products/ViewProductDetail/${order?.id}`}
                        className="cursor-pointer"
                      >
                        <div className="text-xl font-bold">{order?.title}</div>
                        <div>{order?.category}</div>
                        <img
                          src={order?.image}
                          alt=""
                          className="max-h-[50vh] w-full object-contain mt-5"
                        />
                      </Link>
                      <div className="flex flex-wrap items-center h-max justify-between gap-5 mt-5">
                        <div className="text-lg font-bold">
                          Rs {order?.price}.00
                        </div>
                        <div
                          // onClick={() => {
                          //   if (product) {
                          //     if (Cart.length === 0) setCart([product]);
                          //     else setCart([...Cart, product]);
                          //     setToast(true);
                          //     setCustomAlertState(true);
                          //     customAlert("Error adding to cart");
                          //   } else {
                          //     alert("Error adding to cart");
                          //   }
                          // }}
                          className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 font-bold text-base"
                        >
                          Add to cart
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="min-h-[80vh] w-full flex justify-center items-center">
                <div className="text-2xl text-center font-bold">
                  {/* Loading the product... */}
                  <CircularProgress color="error" size={80} />
                </div>
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl border shadow-xl p-10">
            <div className="text-xl font-bold mb-10">Account Details</div>
            <div className="text-lg my-5">
              <a className="font-semibold">Name:</a> {name}
            </div>
            <div className="text-lg my-5">
              <a className="font-semibold">Email:</a> {email}
            </div>
            <div className="text-lg my-5">
              <a className="font-semibold">Contact:</a> {contact}
            </div>
            {isAdmin && (
              <div className="text-lg my-5">
                <a className="font-semibold">Role:</a> Admin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
