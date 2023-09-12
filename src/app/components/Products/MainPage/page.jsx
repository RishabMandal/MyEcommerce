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
      .get("/api/MainPage")
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { Cart, setCart } = useContext(GlobalContext);

  const [toast, setToast] = useState(false);

  return (
    <div>
      <div className="bg-[#121212] text-white p-5">
        <div className="flex flex-row my-28 justify-evenly">
          <div>
            <div className="text-6xl font-bold">iPhone 15 Ultra</div>
            <div className="text-2xl text-gray-200 my-10">
              Supercharged by A17, taking its power and efficieny further than
              ever. Unleash the beast.
            </div>
            <div className="flex flex-row gap-5">
              <div
                onClick={() =>
                  window.location.replace("https://www.apple.com/in/")
                }
                className="cursor-pointer border-2 border-white hover:text-gray-300 duration-200 ease-in-out rounded-xl p-4 text-xl font-bold"
              >
                Read More
              </div>
              <div
                onClick={() =>
                  window.location.replace("https://www.apple.com/in/")
                }
                className="cursor-pointer rounded-xl p-4 text-xl font-bold bg-white hover:bg-gray-300 duration-200 ease-in-out text-black"
              >
                Coming Soon
              </div>
            </div>
          </div>
          <img
            src="data:image/png;base64,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"
            alt="Product Image"
            className="object-contain cursor-pointer"
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
        <div className="text-5xl my-10 text-center font-semibold">
          Available Products
        </div>
        <div className="flex flex-wrap gap-10 justify-center">
          {products ? (
            products.length > 0 &&
            products?.map((product) => {
              return (
                <div
                  // href={`/components/Products/ViewProductDetail/${product.id}`}
                  key={product.id}
                  className="border flex flex-col justify-between rounded-xl hover:scale-105 duration-200 shadow-xl p-5 cursor-pointer bg-white lg:w-1/4 md:w-1/2 w-full"
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
                  <div className="flex flex-wrap items-center h-max justify-between gap-5 mt-5">
                    <div className="text-2xl font-bold">
                      Rs {product.price}.00
                    </div>
                    <div
                      onClick={() => {
                        if (product) {
                          if (Cart.length === 0) setCart([product]);
                          else setCart([...Cart, product]);
                          setToast(true);
                          setCustomAlertState(true);
                          customAlert("Error adding to cart");
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
            <div>Rushing database to Load...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
