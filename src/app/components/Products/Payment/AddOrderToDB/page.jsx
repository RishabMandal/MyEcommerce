"use client";

import { GlobalContext } from "@/context";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const date = new Date();
  console.log(date);
  const { Cart, email } = useContext(GlobalContext);
  useEffect(() => {
    try {
      goForward();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function goForward() {
    // Cart
    //   ? Cart?.length > 0 &&
    //     (await Cart.forEach((product) => {
    //       if (email)
    //         axios
    //           .post("/api/AddOrderToDB", {
    //             email: email,
    //             date: "",
    //             id: product.id,
    //             title: product.title,
    //             price: product.price,
    //             description: product.description,
    //             category: product.category,
    //             image: product.image,
    //             rating: product.rating,
    //           })
    //           .then((res) => console.log(res))
    //           .catch((error) => console.log(error));
    //       else console.log("Email error");
    //     }))
    //   : console.log("Cart is empty");
    // // Wait for all axios requests to complete before navigating
    // await Promise.all(axiosRequests);

    // router.push("/components/Products/Delivery");
    try {
      if (Cart && Cart.length > 0) {
        // Create an array of promises for the axios requests
        const axiosRequests = Cart.map((product) => {
          if (email) {
            return axios
              .post("/api/AddOrderToDB", {
                email: email,
                date: date,
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: product.rating,
              })
              .then((res) => {
                console.log(res);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("Email error");
            return Promise.resolve(); // Return a resolved promise to avoid issues with Promise.all
          }
        });

        // Wait for all axios requests to complete before navigating
        await Promise.all(axiosRequests);

        // Once all axios requests have completed, navigate to the next page
        router.push("/components/Products/Delivery");
      } else {
        console.log("Cart is empty");
        router.push("/components/Products/Delivery");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center bg-gray-100 text-center text-base">
      <div className="text-2xl mb-2 font-bold">Processing...</div>
      <div className="text-base font-semibold text-red-600">
        Please do not close the browser!
      </div>
    </div>
  );
};

export default page;
