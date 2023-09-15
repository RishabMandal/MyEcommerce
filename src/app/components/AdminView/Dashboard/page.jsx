"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState([]);
  const [totalPriceDay, settotalPriceDay] = useState(0);
  const [totalOrdersDay, settotalOrdersDay] = useState(0);
  useEffect(() => {
    axios
      .post("/api/Orders", { email: "all" })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    data.forEach((product) => {
      settotalPriceDay((prev) => prev + product.price);
    });
    settotalOrdersDay(data.length);
  }, [data]);

  return (
    <div>
      <div className="bg-gray-100 min-h-[70vh] p-5">
        <div className="text-xl">
          Hello, <a className="font-bold">Admin</a>
        </div>
        <div className="flex flex-wrap gap-10">
          <div>
            <div className="text-xl font-semibold pt-10 pb-5">Orders</div>
            <div className="flex flex-row">
              <div className="bg-white p-10 rounded-xl border shadow-xl text-center">
                <div className="text-[#121212] text-lg font-bold">TODAY</div>
                <div className="text-red-700 text-2xl font-bold my-2">
                  {totalOrdersDay}
                </div>
                <div className="text-gray-500 text-base">2 order(s) today</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xl font-semibold pt-10 pb-5">Revenue</div>
            <div className="flex flex-row">
              <div className="bg-white p-10 rounded-xl border shadow-xl text-center">
                <div className="text-[#121212] text-lg font-bold">TODAY</div>
                <div className="text-red-700 text-2xl font-bold my-2">
                  ₹ {totalPriceDay}
                </div>
                <div className="text-gray-500 text-base">2 order(s) today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
