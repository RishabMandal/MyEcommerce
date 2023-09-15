import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="p-5 min-h-[90vh] bg-gray-100 text-center">
        {/* <div className="bg-green-600 text-3xl">Successful !!</div> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="green"
          className="w-16 h-16 mx-auto my-4 stroke-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>

        <div className="text-3xl font-bold">Thank You!</div>
        <div className="text-3xl font-bold text-green-600">
          Order Successfully Placed
        </div>
        <div className="mt-6 font-semibold">Estimated Delivery Date</div>
        <div className="mb-6">sat oct 8 2024</div>
        <div className="font-semibold">Payment Method</div>
        <div>Card</div>
        <Link
          href="/components/Products/MainPage"
          className="bg-red-600 text-white font-semibold mt-6 p-2 px-3 block w-fit mx-auto rounded-xl hover:bg-red-700 duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default page;
