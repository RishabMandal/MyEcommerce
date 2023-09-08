"use client";

import { GlobalContext } from "@/context";
import React, { useContext } from "react";

const page = () => {
  const { Cart, setCart } = useContext(GlobalContext);
  return (
    <div>
      <div className="p-5">
        <div className="text-5xl">Cart items</div>
        <div className="flex flex-wrap gap-10">
          {Cart?.map((product) => {
            return (
              <div key={product.id} className="border p-5 cursor-pointer">
                <div>{product.id}</div>
                <div className="text-2xl font-bold">{product.title}</div>
                <div>{product.category}</div>
                <img src={product.image} alt="" />
                <div>Rs {product.price * 100}.00</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
