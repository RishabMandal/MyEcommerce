"use client";

import { GlobalContext } from "@/context";
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

  return (
    <div>
      <div className="p-5 pb-10 bg-gray-100 min-h-[70vh]">
        <div className="text-5xl my-10 text-center font-semibold">
          Categories
        </div>
        <div className="flex flex-wrap justify-center mb-10 gap-5">
          <div
            className="cursor-pointer"
            onClick={() => setCategories("men's clothing")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">Men's Clothing</div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setCategories("women's clothing")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">Women's Clothing</div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setCategories("smartphone")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">SmartPhones</div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setCategories("jewelery")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              {/* <img src="" alt="Category Image" /> */}
              <div className="text-3xl font-bold">Jewellery</div>
            </div>
          </div>
          <div
            className="cursor-pointer"
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
                  key={product.id}
                  className="border rounded-xl shadow-xl p-5 cursor-pointer bg-white lg:w-1/4 md:w-1/2 w-full"
                >
                  {/* <div>{product.id}</div> */}
                  <Link
                    href={`/components/Products/ViewProductDetail/${product.id}`}
                    className="cursor-pointer"
                  >
                    <div className="text-3xl font-bold">{product.title}</div>
                    <div>{product.category}</div>
                    <img
                      src={product.image}
                      alt=""
                      className="max-h-[50vh] w-full object-contain mt-5"
                    />
                  </Link>
                  <div className="flex flex-wrap items-center justify-between gap-5 mt-5">
                    <div className="text-2xl font-bold">
                      Rs {product.price}.00
                    </div>
                    <div
                      onClick={() => {
                        if (product) {
                          if (Cart.length === 0) setCart([product]);
                          else setCart([...Cart, product]);
                          alert("Added to cart successfully");
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
