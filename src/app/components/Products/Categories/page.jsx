"use client";

import { GlobalContext } from "@/context";
import { Alert, MenuItem, Select, Snackbar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const { Cart, setCart, email } = useContext(GlobalContext);
  const [toast, setToast] = useState(false);

  const handleCategoryChange = (event) => {
    // setCategory(event.target.value);
    setCategories(event.target.value);
  };

  return (
    <div>
      {/* // */}
      <div className="bg-[#121212] text-white p-5">
        <div className="lg:flex flex-row mt-6 mb-14 md:my-14 items-center justify-evenly gap-5">
          <motion.div
            initial={{ x: "-100vw" }}
            transition={{
              duration: 0.7,
              type: "spring",
              bounce: 0.3,
            }}
            animate={{ x: 0, position: "" }}
          >
            <div className="text-4xl font-bold">Zero Hour Sale !!</div>
            <div className="text-lg text-gray-200 my-3">
              Upto 70% off on selected Lehengas.
            </div>
            <div className="flex flex-row gap-5">
              <div
                onClick={() => setCategories("women's clothing")}
                className="cursor-pointer border-2 border-white hover:text-gray-300 duration-200 ease-in-out rounded-xl p-3 text-base font-bold"
              >
                Go to sale
              </div>
            </div>
          </motion.div>
          <motion.img
            initial={{ x: "100vw" }}
            transition={{
              duration: 0.7,
              type: "spring",
              bounce: 0.3,
              delay: 0.3,
            }}
            animate={{ x: 0, position: "" }}
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
        <div className="text-3xl my-5 text-center font-semibold">
          Categories
        </div>
        <div className="flex flex-wrap justify-center mb-5 gap-5">
          <Select
            labelId="category-label"
            id="category"
            value={Categories}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="men's clothing">Men's Clothing</MenuItem>
            <MenuItem value="women's clothing">Women's Clothing</MenuItem>
            <MenuItem value="smartphone">Smartphones</MenuItem>
            <MenuItem value="jewelery">Jewellery</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
          </Select>
          {/* <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("men's clothing")}
          >
            <div className="border shadow-xl px-4 py-3 bg-white rounded-xl">
              <div className="text-xl font-bold">Men's Clothing</div>
            </div>
          </div>
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("women's clothing")}
          >
            <div className="border shadow-xl px-4 py-3 bg-white rounded-xl">
              <div className="text-xl font-bold">Women's Clothing</div>
            </div>
          </div>
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("smartphone")}
          >
            <div className="border shadow-xl px-4 py-3 bg-white rounded-xl">
              <div className="text-xl font-bold">SmartPhones</div>
            </div>
          </div>
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("jewelery")}
          >
            <div className="border shadow-xl px-4 py-3 bg-white rounded-xl">
              <div className="text-xl font-bold">Jewellery</div>
            </div>
          </div>
          <div
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => setCategories("electronics")}
          >
            <div className="border shadow-xl px-4 py-3 bg-white rounded-xl">
              <div className="text-xl font-bold">Electronics</div>
            </div>
          </div> */}
          <div
            className="cursor-pointer flex flex-row items-center border-l-4 pl-5"
            onClick={() => {
              if (Sort === undefined || Sort === "none") setSort("Ascending");
              else if (Sort === "Ascending") setSort("Descending");
              else setSort("none");
            }}
          >
            <div className="text-lg font-semibold">Sort</div>
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
        <div className="flex flex-wrap gap-5 justify-center">
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
                      <div className="text-xl font-bold">{product.title}</div>
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
                        <div className="text-lg font-bold text-red-600 line-through mr-2">
                          ₹{Math.ceil(product.price * 3.1)}.00
                        </div>
                      )}
                      <div className="text-lg font-bold">
                        ₹{product.price}.00
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        if (product) {
                          if (Cart.length === 0) setCart([product]);
                          else setCart([...Cart, product]);
                          try {
                            if (product) {
                              axios
                                .post("/api/Cart", {
                                  email: email.trim(),
                                  date: "",
                                  id: product.id,
                                  operation: "post",
                                  operation2: "add",
                                })
                                // .then((response) =>
                                //   alert("Product successfully added to cart")
                                // )
                                .catch((error) => alert(error));
                            }
                          } catch (error) {
                            console.log(error);
                          }
                          setToast(true);
                        } else {
                          alert("Error adding to cart");
                        }
                      }}
                      className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 font-bold text-base"
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
