"use client";

import { TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get("/api/AvailableProducts")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Input refs
  const id = useRef();
  const title = useRef();
  const price = useRef();
  const description = useRef();
  const category = useRef();
  const imageUrl = useRef();
  const ratingRate = useRef();
  const ratingCount = useRef();

  const handleSubmit = () => {
    axios
      .post("/api/AvailableProducts", {
        operation: "add",
        id: id.current.value,
        title: title.current.value,
        price: price.current.value,
        description: description.current.value,
        category: category.current.value,
        image: imageUrl.current.value,
        rating: {
          rate: ratingRate.current.value,
          count: ratingCount.current.value,
        },
      })
      .then(() => alert("Product successfully added"))
      .catch((error) => alert(error));
  };

  const handleDelete = (id) => {
    axios
      .post("/api/AvailableProducts", { operation: "delete", id: id })
      .then((response) => alert("Product successfully deleted"))
      .catch((error) => alert(error));
  };

  return (
    <div>
      {/* <div className="grid grid-cols-2 bg-gray-100"> */}
      <div className="flex flex-col-reverse md:flex-wrap bg-gray-100 min-h-[80vh]">
        <div className="p-5 md:w-[20vw] lg:w-[35vw]">
          <div className="text-3xl my-5 font-bold">Available Products</div>
          <div className="flex flex-col gap-5">
            {products ? (
              products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="border rounded-xl shadow-xl p-5 cursor-pointer bg-white"
                  >
                    <div className="text-sm">Product ID: {product.id}</div>
                    {/* <div className="text-xl font-bold">{product.title}</div> */}
                    <Link
                      href={`/components/Products/ViewProductDetail/${product.id}`}
                      className="cursor-pointer h-full"
                    >
                      <div>
                        <div className="text-xl font-bold">{product.title}</div>
                        <div>{product.category}</div>
                      </div>
                      <img
                        src={product.image}
                        alt=""
                        className="max-h-[50vh] w-full object-center object-contain py-5"
                      />
                      {/* </div> */}
                    </Link>
                    {/* <div>{product.category}</div>
                    <img
                      src={product.image}
                      alt=""
                      className="max-h-[50vh] w-full object-contain"
                    /> */}
                    <div className="flex flex-wrap items-center justify-between gap-5 mt-5">
                      <div className="text-lg font-bold">
                        ₹{product.price}.00
                      </div>
                      <div
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 duration-200 hover:bg-red-700 text-center font-bold text-white rounded-lg p-3 mx-2"
                      >
                        Delete this product
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Taking a moment to load this...</div>
            )}
          </div>
        </div>
        <div className="md:fixed md:top-0 md:right-0 md:w-[60vw] mt-8 px-5 md:px-0 md:mt-20">
          <div className="text-3xl my-5 font-bold">Add new product</div>
          <div className="text-lg my-5 font-semibold">
            Enter product details
          </div>
          <div className="flex flex-wrap gap-3">
            {/* <input
            type="number"
            placeholder="Enter ID"
            ref={id}
            className="border-4 rounded-lg p-3 m-3 text-base bg-white"
          /> */}
            <TextField
              id="outlined-basic"
              type="number"
              inputRef={id}
              label="Product ID"
              variant="outlined"
              // color="red"
              className="border-4 rounded-lg text-base bg-white shadow-lg"
            />
            <TextField
              id="outlined-basic"
              type="text"
              inputRef={title}
              label="Product Title"
              variant="outlined"
              // color="red"
              className="border-4 rounded-lg text-base bg-white shadow-lg"
            />
            <TextField
              id="outlined-basic"
              type="number"
              inputRef={price}
              label="Product Price"
              variant="outlined"
              // color="red"
              className="border-4 rounded-lg text-base bg-white shadow-lg"
            />
            <TextField
              id="outlined-basic"
              type="text"
              inputRef={description}
              label="Product Description"
              variant="outlined"
              // color="red"
              className="border-4 rounded-lg text-base bg-white shadow-lg"
            />
            <TextField
              id="outlined-basic"
              type="text"
              inputRef={category}
              label="Product Category"
              variant="outlined"
              // color="red"
              className="border-4 rounded-lg text-base bg-white shadow-lg"
            />
            <TextField
              id="outlined-basic"
              type="text"
              inputRef={imageUrl}
              label="Image URL"
              variant="outlined"
              className="border-4 rounded-lg text-base bg-white shadow-lg"
            />
            <TextField
              id="outlined-basic"
              type="number"
              inputRef={ratingRate}
              label="Rating Rate"
              variant="outlined"
              className="border-4 rounded-lg text-base bg-white shadow-lg"
            />
            <TextField
              id="outlined-basic"
              type="number"
              inputRef={ratingCount}
              label="Rating Count"
              variant="outlined"
              className="border-4 rounded-lg text-base bg-white shadow-lg"
            />
            {/* <input
            type="text"
            placeholder="Enter Title"
            ref={title}
            className="border-4 rounded-lg p-3 m-3 text-base bg-white"
          />
          <input
            type="number"
            placeholder="Enter Price"
            ref={price}
            className="border-4 rounded-lg p-3 m-3 text-base bg-white"
          />
          <input
            type="text"
            placeholder="Enter Description"
            ref={description}
            className="border-4 rounded-lg p-3 m-3 text-base bg-white"
          />
          <input
            type="text"
            placeholder="Enter Category"
            ref={category}
            className="border-4 rounded-lg p-3 m-3 text-base bg-white"
          />
          <input
            type="text"
            placeholder="Enter Image URL"
            ref={imageUrl}
            className="border-4 rounded-lg p-3 m-3 text-base bg-white"
          />
          <input
            type="number"
            placeholder="Enter Rating Rate"
            ref={ratingRate}
            className="border-4 rounded-lg p-3 m-3 text-base bg-white"
          />
          <input
            type="number"
            placeholder="Enter Rating Count"
            ref={ratingCount}
            className="border-4 rounded-lg p-3 m-3 text-base bg-white"
          /> */}
          </div>
          <div className="my-5">
            <div
              onClick={handleSubmit}
              className="text-center inline-block font-bold text-lg cursor-pointer shadow-xl bg-white border duration-200 hover:text-red-700 rounded-lg p-2 mr-2"
            >
              Cancel
            </div>
            <div
              onClick={handleSubmit}
              className="text-center inline-block font-bold text-lg cursor-pointer bg-red-600 duration-200 hover:bg-red-700 text-white rounded-lg p-2 mr-2"
            >
              Add this product
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
