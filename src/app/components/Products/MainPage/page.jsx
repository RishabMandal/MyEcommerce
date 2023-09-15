"use client";

import { GlobalContext } from "@/context";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

//
// export async function getStaticProps() {
//   try {
//     // console.log("Hi");
//     const res = await axios.get("/api/MainPage");
//     const products = res.data;
//     console.log(res);
//     return {
//       props: {
//         products,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         products: [], // Return an empty array or handle the error as needed
//       },
//     };
//   }
// }
//

// const page = ({ products }) => {
const page = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      //   .get("https://fakestoreapi.com/products")
      // .get("/api/MainPage")
      // .get("http://localhost:5000/MainPage")
      .get("https://my-ecommerce-api-2.vercel.app/MainPage")
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { Cart, setCart } = useContext(GlobalContext);

  const [toast, setToast] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  // Calculate the index of the first and last product to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products?.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="bg-[#121212] text-white p-5">
        <div className="lg:flex flex-row my-14 justify-evenly items-center gap-5">
          <div>
            <div className="text-4xl font-bold">iPhone 15 Pro Max</div>
            <div className="text-lg text-gray-200 my-5">
              Supercharged by A17 Pro, taking its power and efficieny further
              than ever. Unleash the beast.
            </div>
            <div className="flex flex-row gap-5">
              <div
                onClick={() =>
                  window.location.replace("https://www.apple.com/in/")
                }
                className="cursor-pointer border-2 border-white hover:text-gray-300 duration-200 ease-in-out rounded-xl p-3 text-base font-bold"
              >
                Read More
              </div>
              <Link
                href="/components/Products/ViewProductDetail/200"
                // onClick={() =>
                //   window.location.replace("https://www.apple.com/in/")
                // }
                className="cursor-pointer rounded-xl p-3 text-base font-bold bg-white hover:bg-gray-300 duration-200 ease-in-out text-black"
              >
                View Pricing
              </Link>
            </div>
            <div className="text-xl mb-3 mt-7 font-bold">From ₹159990.00*</div>
            <div className="text-base font-semibold text-gray-400">
              Pre-order starting at 5:30 PM IST on 15 September <br />{" "}
              Available  from 22 September
            </div>
          </div>
          <img
            // src="https://www.apple.com/v/iphone-15-pro/a/images/overview/welcome/hero__iztc7m63bfiy_small_2x.jpg"
            src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009283815"
            alt="Product Image"
            // className="object-contain cursor-pointer h-[30vh] w-fit rounded-xl"
            className="object-cover object-center cursor-pointer h-[35vh] w-[45vh] mx-auto lg:mx-0 lg:-mt-10 rounded-xl"
            onClick={() => window.location.replace("https://www.apple.com/in/")}
          />
        </div>
      </div>
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
      <div className="p-5 pb-10 bg-gray-100 min-h-[80vh]">
        <div className="text-3xl my-10 text-center font-semibold">
          Available Products
        </div>
        <div className="flex flex-wrap gap-5 justify-center">
          {/* {products ? (
            products.length > 0 &&
            products?.map((product) => {
              return ( */}
          {currentProducts?.length > 0 ? (
            currentProducts.map((product) => {
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
                      className="max-h-[50vh] w-full border-4 object-center object-contain py-5"
                    /> */}
                    {/* <div className="flex items-center h-[25rem] justify-center pt-5"> */}
                    <img
                      src={product.image}
                      alt=""
                      className="max-h-[50vh] w-full object-center object-contain py-5"
                    />
                    {/* </div> */}
                  </Link>
                  <div className="flex flex-wrap items-center h-max justify-between gap-3">
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
                            axios
                              .post("/api/Cart", {
                                email: email.trim(),
                                date: "",
                                id: product.id,
                                operation: "post",
                                operation2: "add",
                              })
                              .then((response) =>
                                alert("Product successfully added to cart")
                              )
                              .catch((error) => alert(error));
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
            <div>Rushing database to Load...</div>
          )}
        </div>
        <div className="text-center mt-10">
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  currentPage === index + 1 ? "bg-gray-300" : "bg-gray-200"
                } px-4 py-2 m-1 rounded-lg cursor-pointer hover:scale-110 duration-200`}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
