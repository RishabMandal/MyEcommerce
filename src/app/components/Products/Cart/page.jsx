"use client";

import { GlobalContext } from "@/context";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { checkout } from "../Payment/stripe";
import axios from "axios";

const page = () => {
  const { Cart, setCart } = useContext(GlobalContext);
  // console.log(Cart);
  const [totalPriceDay, settotalPriceDay] = useState(0);
  useEffect(() => {
    Cart.forEach((product) => {
      settotalPriceDay((prev) => prev + product.price);
    });
  }, [Cart]);
  return (
    <div>
      <div className="p-5 bg-gray-100 min-h-[70vh]">
        <div className="text-5xl text-center my-5 font-bold">
          YOUR SHOPPING CART
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <div className="text-3xl text-center font-semibold">Cart items</div>
            <div className="flex flex-wrap gap-5 justify-center">
              {Cart && Cart.length > 0 ? (
                Cart.map((product) => {
                  return (
                    <div
                      key={product?.id}
                      className="border rounded-xl shadow-xl p-5 cursor-pointer bg-white lg:w-1/4 md:w-1/2 w-full"
                    >
                      <div className="text-3xl font-bold">{product?.title}</div>
                      <div>{product?.category}</div>
                      <img
                        src={product?.image}
                        alt=""
                        className="max-h-[50vh] w-full object-contain mt-5"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-5 mt-5">
                        <div className="text-2xl font-bold">
                          Rs {product?.price}.00
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
          <div className="bg-white p-5 shadow-xl border rounded-xl">
            <div className="text-2xl font-bold py-5">Order Details</div>
            <div className="text-xl">Order Total: ₹{totalPriceDay || 0}.00</div>
            <div className="text-xl">CGST: ₹{totalPriceDay * 0.9 || 0.0}</div>
            <div className="text-xl">SGST: ₹{totalPriceDay * 0.9 || 0.0}</div>
            <div className="text-xl">Other taxes: ₹0.00</div>
            <div className="text-xl">
              Discount: -₹{totalPriceDay * 0.18 || 0.0}
            </div>
            <div className="text-xl">
              Total Payable: ₹{totalPriceDay || 0}.00
            </div>
            {/* <Link
              href="/components/Products/MainPage"
              className="block bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white text-center rounded-lg p-3 mx-auto"
            >
              Proceed to Pay
            </Link> */}
            <button
              onClick={() => {
                checkout({
                  lineItems: [
                    { price: "price_1Np80oSHBnKtF1MbmfiUoPRE", quantity: 1 },
                  ],
                });
              }}
              className="block bg-red-600 hover:bg-red-700 duration-200 font-semibold text-white text-center rounded-lg p-3 my-5 mx-auto"
            >
              Proceed to Pay
            </button>
            or
            <Link
              href="/components/Products/MainPage"
              className="ml-1 text-red-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
          {/* // )} */}
        </div>
      </div>
    </div>
  );
};

export default page;
