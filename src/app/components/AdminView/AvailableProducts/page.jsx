"use client";

import { TextField } from "@mui/material";
import axios from "axios";
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
      <div className="flex flex-wrap bg-gray-100">
        <div className="p-5 md:w-[20vw] lg:w-[35vw]">
          <div className="text-5xl my-10 font-bold">Available Products</div>
          <div className="flex flex-col gap-10">
            {products?.map((product) => {
              return (
                <div
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
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 duration-200 hover:bg-red-700 text-center font-bold text-white rounded-lg p-3 mx-2"
                    >
                      Delete this product
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="fixed top-0 right-0 w-[60vw] mt-32">
          <div className="text-5xl my-10 font-bold">Add new product</div>
          <div className="text-2xl my-10 font-semibold">
            Enter product details
          </div>
          {/* <input
            type="number"
            placeholder="Enter ID"
            ref={id}
            className="border-4 rounded-lg p-3 m-3 text-xl bg-white"
          /> */}
          <TextField
            id="outlined-basic"
            type="number"
            inputRef={id}
            label="Product ID"
            variant="outlined"
            // color="red"
            className="border-4 rounded-lg m-3 text-xl bg-white"
          />
          <TextField
            id="outlined-basic"
            type="text"
            inputRef={title}
            label="Product Title"
            variant="outlined"
            // color="red"
            className="border-4 rounded-lg m-3 text-xl bg-white"
          />
          <TextField
            id="outlined-basic"
            type="number"
            inputRef={price}
            label="Product Price"
            variant="outlined"
            // color="red"
            className="border-4 rounded-lg m-3 text-xl bg-white"
          />
          <TextField
            id="outlined-basic"
            type="text"
            inputRef={description}
            label="Product Description"
            variant="outlined"
            // color="red"
            className="border-4 rounded-lg m-3 text-xl bg-white"
          />
          <TextField
            id="outlined-basic"
            type="text"
            inputRef={category}
            label="Product Category"
            variant="outlined"
            // color="red"
            className="border-4 rounded-lg m-3 text-xl bg-white"
          />
          <TextField
            id="outlined-basic"
            type="text"
            inputRef={imageUrl}
            label="Image URL"
            variant="outlined"
            className="border-4 rounded-lg m-3 text-xl bg-white"
          />
          <TextField
            id="outlined-basic"
            type="number"
            inputRef={ratingRate}
            label="Rating Rate"
            variant="outlined"
            className="border-4 rounded-lg m-3 text-xl bg-white"
          />
          <TextField
            id="outlined-basic"
            type="number"
            inputRef={ratingCount}
            label="Rating Count"
            variant="outlined"
            className="border-4 rounded-lg m-3 text-xl bg-white"
          />
          {/* <input
            type="text"
            placeholder="Enter Title"
            ref={title}
            className="border-4 rounded-lg p-3 m-3 text-xl bg-white"
          />
          <input
            type="number"
            placeholder="Enter Price"
            ref={price}
            className="border-4 rounded-lg p-3 m-3 text-xl bg-white"
          />
          <input
            type="text"
            placeholder="Enter Description"
            ref={description}
            className="border-4 rounded-lg p-3 m-3 text-xl bg-white"
          />
          <input
            type="text"
            placeholder="Enter Category"
            ref={category}
            className="border-4 rounded-lg p-3 m-3 text-xl bg-white"
          />
          <input
            type="text"
            placeholder="Enter Image URL"
            ref={imageUrl}
            className="border-4 rounded-lg p-3 m-3 text-xl bg-white"
          />
          <input
            type="number"
            placeholder="Enter Rating Rate"
            ref={ratingRate}
            className="border-4 rounded-lg p-3 m-3 text-xl bg-white"
          />
          <input
            type="number"
            placeholder="Enter Rating Count"
            ref={ratingCount}
            className="border-4 rounded-lg p-3 m-3 text-xl bg-white"
          /> */}
          <div
            onClick={handleSubmit}
            className="text-center font-bold text-2xl cursor-pointer bg-red-600 duration-200 hover:bg-red-700 text-white rounded-lg p-3 m-2"
          >
            Add this product
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
