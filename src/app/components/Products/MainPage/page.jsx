"use client";

import axios from "axios";
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
        <div className="flex flex-wrap gap-10">
          {products?.map((product) => {
            return (
              <div key={product.id} className="border p-5 cursor-pointer">
                <div>{product.id}</div>
                <div className="text-2xl font-bold">{product.title}</div>
                <div>{product.category}</div>
                <img src={product.image} alt="" className="max-h-[50vh] w-full" />
                <div>Rs {product.price * 100}.00</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
