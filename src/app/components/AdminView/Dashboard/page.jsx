"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState([]);
  const [totalPriceDay, settotalPriceDay] = useState(0);
  const [totalOrdersDay, settotalOrdersDay] = useState(0);
  const [totalPriceTillNow, settotalPriceTillNow] = useState(0);
  const [totalOrdersTillNow, settotalOrdersTillNow] = useState(0);
  const date = new Date();
  useEffect(() => {
    axios
      .post("/api/Orders", { email: "all" })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    data.forEach((product) => {
      if (
        date.toString().substring(0, 15) ===
        product?.date.toString().substring(0, 15)
      ) {
        settotalPriceDay((prev) => prev + product.price);
      }
    });
    data.forEach((product) => {
      if (
        date.toString().substring(0, 15) ===
        product?.date.toString().substring(0, 15)
      ) {
        settotalOrdersDay((prev) => prev + 1);
      }
    });
    // settotalOrdersDay(data.length);
    data.forEach((product) => {
      settotalPriceTillNow((prev) => prev + product.price);
    });
    settotalOrdersTillNow(data.length);
    // alert(date.toString().substring(0,15));
  }, [data]);

  return (
    <div>
      <div className="bg-gray-100 min-h-[70vh] p-5">
        <div className="text-xl">
          Hello, <a className="font-bold">Admin</a>
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <div className="text-xl font-semibold pt-10 pb-5">Orders</div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white p-10 rounded-xl border shadow-xl text-center">
                <div className="text-[#121212] text-lg font-bold">TODAY</div>
                <div className="text-red-700 text-2xl font-bold my-2">
                  {totalOrdersDay}
                </div>
                <div className="text-gray-500 text-base">
                  {totalOrdersDay} order(s) today
                </div>
              </div>
              <div className="bg-white p-10 rounded-xl border shadow-xl text-center">
                <div className="text-[#121212] text-lg font-bold">TOTAL</div>
                <div className="text-red-700 text-2xl font-bold my-2">
                  {totalOrdersTillNow}
                </div>
                <div className="text-gray-500 text-base">
                  {totalOrdersTillNow} order(s) till now
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold pt-10 pb-5">Revenue</div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white p-10 rounded-xl border shadow-xl text-center">
                <div className="text-[#121212] text-lg font-bold">TODAY</div>
                <div className="text-red-700 text-2xl font-bold my-2">
                  ₹ {totalPriceDay}
                </div>
                <div className="text-gray-500 text-base">
                  {totalOrdersDay} order(s) today
                </div>
              </div>
              <div className="bg-white p-10 rounded-xl border shadow-xl text-center">
                <div className="text-[#121212] text-lg font-bold">TOTAL</div>
                <div className="text-red-700 text-2xl font-bold my-2">
                  ₹ {totalPriceTillNow}
                </div>
                <div className="text-gray-500 text-base">
                  {totalOrdersTillNow} order(s) till now
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="text-xl font-semibold pt-10 pb-5">
              Most Ordered Products
            </div>
            <div className="flex flex-row">
              <div className="bg-white p-10 rounded-xl border shadow-xl text-center">
                <div className="text-[#121212] text-lg font-bold">TODAY</div>
                <div className="text-red-700 text-2xl font-bold my-2">
                  ₹{totalPriceDay}.00
                </div>
                <div className="text-gray-500 text-base">
                  {totalOrdersDay} order(s) today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
