import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-[70vh] gap-5">
        <Link
          href="/components/Login/User/LoginPage"
          className="bg-red-600 text-3xl p-5 text-white font-bold rounded-xl"
        >
          User
        </Link>
        <Link
          href="/components/Login/Admin/LoginPage"
          className="bg-red-600 text-3xl p-5 text-white font-bold rounded-xl"
        >
          Admin
        </Link>
      </div>
    </div>
  );
};

export default page;
