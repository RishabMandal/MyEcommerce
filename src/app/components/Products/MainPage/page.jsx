"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      //   .get("https://fakestoreapi.com/products")
      .get("/api/MainPage")
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="p-5 pb-10 bg-gray-100">
        <div className="text-5xl my-10 text-center font-semibold">
          Available Products
        </div>
        <div className="flex flex-wrap gap-10 justify-center">
          {products?.map((product) => {
            return (
              <Link
                href={`/components/Products/ViewProductDetail/${product.id}`}
                key={product.id}
                className="border rounded-xl shadow-xl p-5 cursor-pointer bg-white"
              >
                <div>{product.id}</div>
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
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
