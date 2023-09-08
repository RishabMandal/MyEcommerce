"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get("/api/MainPage")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit() {}

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="p-5">
          <div className="text-5xl my-10">Available products</div>
          <div className="flex flex-wrap gap-10">
            {products?.map((product) => {
              return (
                <div key={product.id} className="border p-5 cursor-pointer">
                  <div>{product.id}</div>
                  <div className="text-2xl font-bold">{product.title}</div>
                  <div>{product.category}</div>
                  <img
                    src={product.image}
                    alt=""
                    className="max-h-[50vh] w-full"
                  />
                  <div>Rs {product.price * 100}.00</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="">
          <div className="text-5xl my-10">Add new product</div>
          <input
            type="number"
            placeholder="Enter ID"
            // ref={}
            className="border-4 rounded-lg p-3 m-3 text-xl"
          />
          <input
            type="text"
            placeholder="Enter Title"
            // ref={}
            className="border-4 rounded-lg p-3 m-3 text-xl"
          />
          <input
            type="number"
            placeholder="Enter Price"
            // ref={}
            className="border-4 rounded-lg p-3 m-3 text-xl"
          />
          <input
            type="text"
            placeholder="Enter Description"
            // ref={}
            className="border-4 rounded-lg p-3 m-3 text-xl"
          />
          <input
            type="text"
            placeholder="Enter Category"
            // ref={}
            className="border-4 rounded-lg p-3 m-3 text-xl"
          />
          <input
            type="text"
            placeholder="Enter Image"
            // ref={}
            className="border-4 rounded-lg p-3 m-3 text-xl"
          />
          <input
            type="number"
            placeholder="Enter Rating Rate"
            // ref={}
            className="border-4 rounded-lg p-3 m-3 text-xl"
          />
          <input
            type="number"
            placeholder="Enter Rating Count"
            // ref={}
            className="border-4 rounded-lg p-3 m-3 text-xl"
          />
          <div className="cursor-pointer bg-red-600 text-white rounded-lg p-3 mx-2">
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
