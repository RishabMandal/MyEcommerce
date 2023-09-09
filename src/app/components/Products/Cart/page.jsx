"use client";

import { GlobalContext } from "@/context";
import Link from "next/link";
import React, { useContext } from "react";

const page = () => {
  const { Cart, setCart } = useContext(GlobalContext);
  return (
    <div>
      <div className="p-5">
        <div className="text-5xl text-center my-5">YOUR SHOPPING CART</div>
        <div className="flex flex-wrap justify-between">
          <div>
            <div className="text-3xl text-center">Cart items</div>
            <div className="flex flex-wrap gap-10 justify-center">
              {Cart && Cart.length > 0 ? (
                Cart.map((product) => {
                  return (
                    <div key={product.id} className="border p-5 cursor-pointer">
                      <div>{product.id}</div>
                      <div className="text-2xl font-bold">{product.title}</div>
                      <div>{product.category}</div>
                      <img
                        src={product.image}
                        alt=""
                        className="max-h-[50vh] w-full"
                      />
                      <div>Rs {product.price}.00</div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div className="py-10 text-center">No items in Cart</div>
                  <Link
                    href="/components/Products/MainPage"
                    className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white rounded-lg p-3 mx-auto"
                  >
                    Move to Products
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* {Cart && Cart.length > 0 && ( */}
          <div>
            <div className="text-2xl">Order Details</div>
            <Link
              href="/components/Products/MainPage"
              className="block bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white text-center rounded-lg p-3 mx-auto"
            >
              Proceed to Pay
            </Link>
          </div>
          {/* // )} */}
        </div>
      </div>
    </div>
  );
};

export default page;
