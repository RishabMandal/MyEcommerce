"use client";

import { GlobalContext } from "@/context";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState();
  const [Sort, setSort] = useState("none");
  const [Categories, setCategories] = useState("men's clothing");

  useEffect(() => {
    axios
      .post("/api/Categories", { category: Categories, sort: Sort })
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
    // alert("ok");
  }, [Categories, Sort]);

  const { Cart, setCart } = useContext(GlobalContext);
  const [toast, setToast] = useState(false);

  return (
    <div>
      {/* // */}
      <div className="bg-[#121212] text-white p-5">
        <div className="lg:flex flex-row my-28 items-center justify-evenly">
          <div>
            <div className="text-6xl font-bold">Happy Ganesh Chaturthi !!</div>
            <div className="text-2xl text-gray-200 my-10">
              Upto 70% off on selected Lehengas.
            </div>
            <div className="flex flex-row gap-5">
              <div
                onClick={() => setCategories("women's clothing")}
                className="cursor-pointer border-2 border-white hover:text-gray-300 duration-200 ease-in-out rounded-xl p-4 text-xl font-bold"
              >
                Go to sale
              </div>
              {/* <div
                onClick={() =>
                  window.location.replace("https://www.apple.com/in/")
                }
                className="cursor-pointer rounded-xl p-4 text-xl font-bold bg-white hover:bg-gray-300 duration-200 ease-in-out text-black"
              >
                Coming Soon
              </div> */}
            </div>
          </div>
          <img
            src="https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-net-lehenga-in-sea-green-v1-lyc2512.jpg"
            alt="Product Image"
            // className="object-contain cursor-pointer h-[30vh] w-fit rounded-xl"
            className="object-contain object-center cursor-pointer mx-auto lg:mx-0 h-[38vh] w-fit mt-5 lg:-mt-16 -mb-10 rounded-xl"
            onClick={() => setCategories("women's clothing")}
          />
        </div>
      </div>
      {/* // */}
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
      <div className="p-5 pb-10 bg-gray-100 min-h-[70vh]">
        <div className="text-5xl my-10 text-center font-semibold">
          Categories
        </div>
        <div className="flex flex-wrap justify-center mb-10 gap-5">
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("men's clothing")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">Men's Clothing</div>
            </div>
          </div>
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("women's clothing")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">Women's Clothing</div>
            </div>
          </div>
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("smartphone")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">SmartPhones</div>
            </div>
          </div>
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("jewelery")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">Jewellery</div>
            </div>
          </div>
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("electronics")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">Electronics</div>
            </div>
          </div>
          <div
            className="cursor-pointer flex flex-row items-center border-l-4 pl-5"
            onClick={() => {
              if (Sort === undefined || Sort === "none") setSort("Ascending");
              else if (Sort === "Ascending") setSort("Descending");
              else setSort("none");
            }}
          >
            <div className="text-2xl font-semibold">Sort</div>
            {Sort === "Ascending" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                />
              </svg>
            )}
            {Sort === "Descending" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-10 justify-center">
          {products && products.length > 0 ? (
            products.map((product) => {
              return (
                <div
                  // href={`/components/Products/ViewProductDetail/${product.id}`}
                  key={product.id}
                  className="border flex flex-col justify-between rounded-xl hover:scale-105 duration-200 shadow-xl p-5 cursor-pointer bg-white lg:w-1/4 md:w-1/2 w-full"
                >
                  <Link
                    href={`/components/Products/ViewProductDetail/${product.id}`}
                    className="cursor-pointer h-full"
                  >
                    <div>
                      <div className="text-3xl font-bold">{product.title}</div>
                      <div>{product.category}</div>
                    </div>
                    {/* <img
                      src={product.image}
                      alt=""
                      className="max-h-[50vh] w-full h-full object-center object-contain pt-5"
                    /> */}
                    {/* <div className="flex items-center h-[25rem] justify-center pt-5"> */}
                      <img
                        src={product.image}
                        alt=""
                        className="max-h-[50vh] w-full object-center object-contain py-5"
                      />
                    {/* </div> */}
                  </Link>
                  <div className="flex flex-wrap items-center h-max justify-between gap-5 mt-5">
                    <div className="flex flex-wrap">
                      {product?.title?.toLowerCase()?.includes("lehenga") && (
                        <div className="text-2xl font-bold text-red-600 line-through mr-2">
                          ₹{Math.ceil(product.price * 3.1)}.00
                        </div>
                      )}
                      <div className="text-2xl font-bold">
                        ₹{product.price}.00
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        if (product) {
                          if (Cart.length === 0) setCart([product]);
                          else setCart([...Cart, product]);
                          setToast(true);
                        } else {
                          alert("Error adding to cart");
                        }
                      }}
                      className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 font-bold text-xl"
                    >
                      Add to cart
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <div>No product found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
