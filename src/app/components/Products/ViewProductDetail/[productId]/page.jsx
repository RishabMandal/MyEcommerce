"use client";

import { GlobalContext } from "@/context";
import axios from "axios";
// import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const page = ({ params }) => {
  const { Cart, setCart } = useContext(GlobalContext);
  const [product, setProduct] = useState();
  const [productID, setProductID] = useState(params.productId);
  useEffect(() => {
    axios
      .post("/api/ViewProductDetail", { id: params.productId })
      .then((response) => {
        // console.log(response.data);
        setProduct(response.data[0]);
      })
      .catch((error) => console.log(error));
  }, [productID]);

  const addToCart = () => {
    if (Cart.length === 0) setCart([product]);
    else setCart([...Cart, product]);
    alert("Added to cart successfully");
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-[90vh] gap-5 p-5 bg-gray-100">
        {/* <div>{productID}</div> */}
        {product && (
          // <div className="flex flex-row">
          <div className="flex flex-row items-center justify-between">
            <img
              src={product.image}
              alt="Product Image"
              className="max-h-[70vh] w-full object-contain rounded-2xl border shadow-xl bg-white p-1"
            />
            <div className="p-10">
              {/* <div>{product.id}</div> */}
              <div className="text-5xl font-bold mb-4">{product.title}</div>
              <div>{product.category}</div>
              <div className="my-8 font-semibold text-2xl">{product.description}</div>
              <div className="flex flex-wrap items-center gap-5">
                <div className="text-3xl font-bold">Rs {product.price}.00</div>
                <div
                  onClick={addToCart}
                  className="cursor-pointer text-center bg-red-600 hover:bg-red-700 duration-200 text-white rounded-lg p-3 my-5 font-bold text-xl"
                >
                  Add to cart
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
