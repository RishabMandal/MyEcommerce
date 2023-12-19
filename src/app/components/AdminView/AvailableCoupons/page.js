"use client";

import { GlobalContext } from "@/context";
import React, { useContext, useEffect, useRef } from "react";

const page = () => {
  const { Coupons, setCoupons } = useContext(GlobalContext);
  const inputRef = useRef();
  useEffect(() => {
    alert("This page is still under development");
  }, []);

  const addCoupon = () => {
    if (inputRef.current.value) {
      if (Coupons.includes(inputRef.current.value)) {
        alert("Coupon already exists");
      } else {
        setCoupons([...Coupons, inputRef.current.value]);
        alert("Coupon added successfully");
      }
    } else alert("Invalid or empty coupon");
  };

  return (
    <div className="p-5">
      <div className="text-center text-3xl mt-5 mb-10 font-bold">
        Available Coupons
      </div>
      <div className="flex flex-wrap justify-betwen gap-5">
        {Coupons?.map((coupon) => {
          return (
            <div className="flex flex-row gap-5 border-2 border-red-600 rounded-lg px-2 py-1">
              <div className="font-semibold">{coupon}</div>
              <button>Delete</button>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-5 my-5">
        <input
          type="text"
          ref={inputRef}
          className="border-2 text-red-600 border-red-600 rounded-lg px-2 py-1"
          placeholder="Type Coupon Code"
        />
        <button onClick={addCoupon}>Add new coupon</button>
      </div>
    </div>
  );
};

export default page;
