"use client";

import { GlobalContext } from "@/context";
import Link from "next/link";
import React, { useContext } from "react";

const page = () => {
  const { Cart, setCart } = useContext(GlobalContext);
  return (
    <div>
      <div className="p-5 bg-gray-100 min-h-[70vh]">
        <div className="text-5xl text-center my-5 font-bold">YOUR SHOPPING CART</div>
        <div className="flex flex-wrap justify-between">
          <div>
            <div className="text-3xl text-center font-semibold">Cart items</div>
            <div className="flex flex-wrap gap-10 justify-center">
              {Cart && Cart.length > 0 ? (
                Cart.map((product) => {
                  return (
                    <div key={product.id} className="border rounded-xl shadow-xl p-5 cursor-pointer bg-white">
                      <div className="text-3xl font-bold">{product.title}</div>
                      <div>{product.category}</div>
                      <img
                        src={product.image}
                        alt=""
                        className="max-h-[50vh] w-full object-contain mt-5"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-5 mt-5">
                        <div className="text-2xl font-bold">
                          Rs {product.price}.00
                        </div>
                        <div
                          // onClick={addToCart}
                          className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 font-bold text-xl"
                        >
                          Remove
                        </div>
                      </div>
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
