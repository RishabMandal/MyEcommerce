import * as React from "react";
import Modal from "@mui/material/Modal";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen }) {
  //   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <div className="flex justify-center items-center min-h-[70vh] gap-5">
            <Link
              href="/components/AdminView/Dashboard"
              onClick={() => setOpen(false)}
              className="bg-red-600 text-3xl p-5 text-white font-bold rounded-xl"
            >
              Dashboard
            </Link>
            <Link
              href="/components/AdminView/AvailableProducts"
              onClick={() => setOpen(false)}
              className="bg-red-600 text-3xl p-5 text-white font-bold rounded-xl"
            >
              Products
            </Link>
            <Link
              href="/components/AdminView/AvailableProducts"
              onClick={() => setOpen(false)}
              className="bg-red-600 text-3xl p-5 text-white font-bold rounded-xl"
            >
              Categories
            </Link>
            <Link
              href="/components/AdminView/Orders"
              onClick={() => setOpen(false)}
              className="bg-red-600 text-3xl p-5 text-white font-bold rounded-xl"
            >
              Orders
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
