"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [Cart, setCart] = useState([]);
  return (
    <GlobalContext.Provider
      value={{ showNavModal, setShowNavModal, Cart, setCart }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
