"use client";

import { GlobalContext } from "@/context";
import axios from "axios";
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
          console.log(response.data);
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
        <div className="flex flex-row justify-between">
          <div className="bg-white rounded-xl border shadow-xl p-10">
            <div className="text-3xl font-bold mb-10">Orders</div>
            {orders?.map((order) => {
              return (
                <div className="my-3 border-t">
                  <div className="text-3xl font-bold pt-4">{order.title}</div>
                  <div>{order.category}</div>
                  <img
                    src={order.image}
                    alt=""
                    className="max-h-[50vh] w-full object-contain mt-5"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-5 mt-5">
                    <div className="text-2xl font-bold">
                      Rs {order.price}.00
                    </div>
                    <div
                      // onClick={addToCart}
                      className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 font-bold text-xl"
                    >
                      Add to cart
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-xl border shadow-xl p-10">
            <div className="text-3xl font-bold mb-10">Account Details</div>
            <div className="text-2xl my-5">Name: {name}</div>
            <div className="text-2xl my-5">Email: {email}</div>
            <div className="text-2xl my-5">Contact: {contact}</div>
            {isAdmin && <div className="text-2xl my-5">Role: Admin</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
