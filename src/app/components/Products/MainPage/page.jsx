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
      <div className="p-5">
        <div className="text-5xl my-10">Available products</div>
        <div className="flex flex-wrap gap-10 justify-center">
          {products?.map((product) => {
            return (
              <Link
                href={`/components/Products/ViewProductDetail/${product.id}`}
                key={product.id}
                className="border p-5 cursor-pointer"
              >
                <div>{product.id}</div>
                <div className="text-2xl font-bold">{product.title}</div>
                <div>{product.category}</div>
                <img
                  src={product.image}
                  alt=""
                  className="max-h-[50vh] w-full object-contain"
                />
                <div>Rs {product.price}.00</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
