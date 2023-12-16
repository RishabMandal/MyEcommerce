"use client";

import { GlobalContext } from "@/context";
import React, { useContext, useEffect } from "react";

const page = () => {
  const { Coupons, setCoupons } = useContext(GlobalContext);
  useEffect(() => {
    alert("This page is still under development");
  }, []);

  return (
    <div>
      <div>Available Coupons</div>
      <div>
        {Coupons.map((coupon) => {
          return (
            <div>
              <div>{coupon}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
