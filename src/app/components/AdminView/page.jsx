import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-[70vh] gap-5">
        <Link
          href="/components/AdminView/Dashboard"
          className="bg-red-600 text-xl p-5 text-white font-bold rounded-xl"
        >
          Dashboard
        </Link>
        <Link
          href="/components/AdminView/AvailableProducts"
          className="bg-red-600 text-xl p-5 text-white font-bold rounded-xl"
        >
          Products
        </Link>
        <Link
          href="/components/AdminView/AvailableProducts"
          className="bg-red-600 text-xl p-5 text-white font-bold rounded-xl"
        >
          Categories
        </Link>
        <Link
          href="/components/AdminView/Orders"
          className="bg-red-600 text-xl p-5 text-white font-bold rounded-xl"
        >
          Orders
        </Link>
      </div>
    </div>
  );
};

export default page;
