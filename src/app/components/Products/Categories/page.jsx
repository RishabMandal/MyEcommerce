"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState();
  const [Categories, setCategories] = useState("men's clothing");

  useEffect(() => {
    axios
      //   .get("https://fakestoreapi.com/products")
      .post("/api/Categories", { category: Categories })
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [Categories]);

  return (
    <div>
      <div className="p-5 pb-10 bg-gray-100">
        <div className="text-5xl my-10 text-center font-semibold">
          Categories
        </div>
        <div className="flex flex-wrap justify-center mb-10 gap-5">
          <div
            className="cursor-pointer"
            onClick={() => setCategories("men's clothing")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              <img src="" alt="Category Image" />
              <div className="text-3xl font-bold">Men's Clothing</div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setCategories("women's clothing")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              <img src="" alt="Category Image" />
              <div className="text-3xl font-bold">Women's Clothing</div>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setCategories("smartphone")}
          >
            <div className="border shadow-xl p-5 bg-white rounded-xl">
              <img src="" alt="Category Image" />
              <div className="text-3xl font-bold">SmartPhones</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 justify-center">
          {products && products.length > 0 ? (
            products.map((product) => {
              return (
                <Link
                  href={`/components/Products/ViewProductDetail/${product.id}`}
                  key={product.id}
                  className="border rounded-xl shadow-xl p-5 cursor-pointer bg-white lg:w-1/4 md:w-1/2 w-full"
                >
                  {/* <div>{product.id}</div> */}
                  <div className="text-3xl font-bold">{product.title}</div>
                  <div>{product.category}</div>
                  <img
                    src={product.image}
                    alt=""
                    className="max-h-[50vh] w-full object-contain"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-5 mt-5">
                    <div className="text-2xl font-bold">
                      Rs {product.price}.00
                    </div>
                    <div
                      // onClick={addToCart}
                      className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 font-bold text-xl"
                    >
                      Add to cart
                    </div>
                  </div>
                </Link>
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
