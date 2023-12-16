import * as React from "react";
import Modal from "@mui/material/Modal";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
};

export default function BasicModal({ open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    // <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={style}
    >
      <div className="bg-white rounded-xl translate-y-1/2 shadow-xl p-5 w-fit mx-auto">
        <div className="text-center font-bold text-3xl pb-5">Admin Tools</div>
        <div className="flex flex-wrap max-w-[90vw] justify-center items-center gap-5">
          <Link
            href="/components/AdminView/Dashboard"
            onClick={() => setOpen(false)}
            className="bg-red-600 text-lg hover:bg-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold rounded-xl"
          >
            Dashboard
          </Link>
          <Link
            href="/components/AdminView/AvailableProducts"
            onClick={() => setOpen(false)}
            className="bg-red-600 text-lg hover:bg-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold rounded-xl"
          >
            Products
          </Link>
          {/* <Link
            href="/components/AdminView/AvailableProducts"
            onClick={() => setOpen(false)}
            className="bg-red-600 text-lg hover:bg-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold rounded-xl"
          >
            Categories
          </Link> */}
          <Link
            href="/components/AdminView/Orders"
            onClick={() => setOpen(false)}
            className="bg-red-600 text-lg hover:bg-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold rounded-xl"
          >
            Orders
          </Link>
          <Link
            href="/components/AdminView/AvailableCoupons"
            onClick={() => setOpen(false)}
            className="bg-red-600 text-lg hover:bg-red-700 hover:scale-105 duration-200 py-2 px-3 text-white font-bold rounded-xl"
          >
            Coupons
          </Link>
        </div>
      </div>
    </Modal>
    // </div>
  );
}
