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
    Cart?.forEach((product) => {
      settotalPriceDay((prev) => prev + product?.price);
    });
  }, [Cart]);

  function removeProduct(id) {
    const updatedItems = Cart.filter((item) => item.id !== id);
    settotalPriceDay(0);
    setCart(updatedItems);
    try {
      if (Cart && Cart.length > 0) {
        axios
          .post("/api/Cart", {
            id: id,
            operation: "post",
            operation2: "delete",
          })
          .then((response) => alert("Product successfully deleted"))
          .catch((error) => alert(error));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="p-5 bg-gray-100 min-h-[70vh]">
        <div className="text-3xl text-center mb-10 mt-5 font-bold">
          YOUR SHOPPING CART
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-evenly gap-5">
          <div className="border shadow-xl bg-white p-5 rounded-2xl w-full">
            {Cart?.length <= 0 ? (
              <div className="text-xl text-center font-bold py-5">
                Cart items
              </div>
            ) : (
              <div className="text-xl text-center font-bold py-5">
                {Cart?.length} item(s) in cart
              </div>
            )}
            <div className="flex flex-wrap gap-5 justify-center">
              {Cart && Cart.length > 0 ? (
                Cart.map((product) => {
                  return (
                    <div
                      key={product?.id}
                      className="border flex flex-col justify-between rounded-xl shadow-xl p-5 cursor-pointer hover:scale-105 duration-200 bg-white lg:w-1/4 md:w-1/2 w-full"
                    >
                      <div className="text-xl font-bold">{product?.title}</div>
                      <div>{product?.category}</div>
                      <img
                        src={product?.image}
                        alt=""
                        className="max-h-[50vh] w-full object-contain mt-5"
                      />
                      <div className="flex flex-wrap items-center h-max justify-between gap-5 mt-5">
                        <div className="text-lg font-bold">
                          ₹{product?.price}.00
                        </div>
                        <div
                          onClick={() => removeProduct(product?.id)}
                          className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 py-2 font-bold text-base"
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col justify-center">
                  <div className="py-10 text-center text-base font-semibold text-gray-800">
                    Your Cart is empty
                  </div>
                  <Link
                    href="/components/Products/MainPage"
                    className="bg-red-600 hover:bg-red-700 duration-200 font-semibold text-center text-white rounded-lg p-3"
                  >
                    Move to Products
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* {Cart && Cart.length > 0 && ( */}
          <div className="bg-white p-5 px-10 shadow-xl border rounded-2xl">
            <div className="text-xl font-bold py-5">Order Details</div>
            <div className="text-base py-1">
              Order Total: ₹{totalPriceDay || 0}.00
            </div>
            <div className="text-base py-1">
              CGST: ₹{Math.ceil(totalPriceDay * 0.09) || 0}.00
            </div>
            <div className="text-base py-1">
              SGST: ₹{Math.ceil(totalPriceDay * 0.09) || 0}.00
            </div>
            <div className="text-base py-1">Other taxes: ₹0.00</div>
            <div className="text-base py-1">
              Discount: -₹{Math.ceil(totalPriceDay * 0.18) || 0}.00
            </div>
            <div className="text-lg py-2 font-semibold">
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
                if (totalPriceDay === 0) alert("Cart is empty");
                else {
                  checkout({
                    lineItems: [
                      { price: "price_1Np80oSHBnKtF1MbmfiUoPRE", quantity: 1 },
                    ],
                  });
                }
              }}
              className={`block ${
                totalPriceDay > 0 ? "bg-red-600" : "bg-gray-400"
              } hover:bg-red-700 duration-200 font-semibold text-white text-center rounded-lg p-3 my-5 mx-auto`}
            >
              Proceed to Pay
            </button>
            <div className="flex flex-row justify-center items-center">
              <div>or</div>
              <Link
                href="/components/Products/MainPage"
                className="ml-1 block text-sm text-red-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
          {/* // )} */}
        </div>
      </div>
    </div>
  );
};

export default page;
