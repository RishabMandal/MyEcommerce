"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [email, setEmail] = useState();
  const [Cart, setCart] = useState([]);
  const [Coupons, setCoupons] = useState(["MERRYCHRISTMAS", "HAPPYNEWYEAR"]);
  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        Cart,
        setCart,
        Coupons,
        setCoupons,
        isAuthUser,
        setIsAuthUser,
        email,
        setEmail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
