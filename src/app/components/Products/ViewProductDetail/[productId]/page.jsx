"use client";

import { GlobalContext } from "@/context";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
// import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import MultiImageCarousel from "@/components/MultiImageCarousel";
import "./carousel.css";

const page = ({ params }) => {
  const { Cart, setCart } = useContext(GlobalContext);
  const [product, setProduct] = useState();
  const [productID, setProductID] = useState(params.productId);
  useEffect(() => {
    axios
      .post("/api/ViewProductDetail", { id: params.productId })
      .then((response) => {
        // console.log(response.data);
        setProduct(response.data[0]);
      })
      .catch((error) => console.log(error));
  }, [productID]);

  const addToCart = () => {
    if (Cart.length === 0) setCart([product]);
    else setCart([...Cart, product]);
    setToast(true);
  };

  const [toast, setToast] = useState(false);

  return (
    <div>
      <Snackbar
        open={toast}
        autoHideDuration={2500}
        onClose={() => setToast(false)}
      >
        <Alert
          onClose={() => setToast(false)}
          variant="filled"
          severity="success"
          sx={{
            width: "fit-content",
            fontWeight: "bold",
          }}
        >
          Added to Cart Successfully!
        </Alert>
      </Snackbar>
      <div className="min-h-[90vh] bg-gray-100">
        {/* <div>{productID}</div> */}
        <div className="min-h-[85vh]">
          {product ? (
            <section class="text-[#121212] body-font overflow-hidden">
              <div class="container px-5 py-20 mx-auto">
                <div class="lg:w-full mx-auto flex flex-wrap">
                  {product?.otherImages ? (
                    <MultiImageCarousel images={product?.otherImages} />
                  ) : (
                    <img
                      alt="ecommerce"
                      class="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded cursor-pointer hover:scale-125 duration-200 ease-in-out"
                      src={product?.image}
                    />
                  )}
                  <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 class="text-sm title-font text-gray-500 tracking-widest">
                      {product.category}
                    </h2>
                    <div className="text-5xl font-bold mb-4">
                      {product.title}
                    </div>
                    <div class="flex mb-4">
                      <span class="flex items-center">
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span class="text-gray-600 ml-3">
                          {product.rating.count} Reviews
                        </span>
                      </span>
                      <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                        <a class="text-gray-500">
                          <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </a>
                        <a class="text-gray-500">
                          <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                          </svg>
                        </a>
                        <a class="text-gray-500">
                          <svg
                            fill="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                          </svg>
                        </a>
                      </span>
                    </div>
                    <p class="leading-relaxed my-8 font-semibold text-2xl">
                      {product.description}
                    </p>
                    <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                      <div class="flex">
                        <span class="mr-3">Color</span>
                        <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                        <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        <button class="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      </div>
                      <div class="flex ml-6 items-center">
                        <span class="mr-3">Size</span>
                        <div class="relative">
                          <select class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                            <option>SM</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                          </select>
                          <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              class="w-4 h-4"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-5">
                      <div className="text-3xl font-bold">
                        ₹{product.price}.00
                      </div>
                      <div
                        onClick={addToCart}
                        className="cursor-pointer flex flex-row text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 my-5 font-bold text-xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                        Add to cart
                      </div>
                      <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <svg
                          fill="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="min-h-[80vh] flex justify-center items-center">
              <div className="text-4xl text-center font-bold">
                Loading the product...
              </div>
            </div>
          )}
        </div>
        <div className="container mx-auto pb-20">
          <div className="text-4xl font-bold py-5">Reviews</div>
          <div className="flex flex-row gap-10">
            <div className="p-10 w-full bg-white border shadow-xl rounded-xl">
              <div className="font-semibold text-3xl my-5">Add a review</div>
              <input
                type="text"
                className="w-full p-3 text-2xl border-4 my-2 rounded-xl"
                placeholder="Title"
              />
              <input
                type="text"
                className="w-full p-3 text-2xl border-4 my-2 rounded-xl"
                placeholder="Was it good? Pros? Cons?"
              />
              <button className="cursor-pointer my-5 border-2 bg-[#121212] text-white border-white hover:text-gray-300 duration-200 ease-in-out rounded-xl p-4 text-xl font-bold">
                Submit your response
              </button>
            </div>
            <div className="p-10 w-full bg-white border shadow-xl rounded-xl">
              <div className="font-semibold text-3xl">No reviews yet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
