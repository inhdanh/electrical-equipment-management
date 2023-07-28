"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  carts: Cart[];
  setCarts: Dispatch<SetStateAction<Cart[]>>;
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType>({
  carts: [],
  setCarts: () => {},
  openDrawer: false,
  setOpenDrawer: () => {},
});

interface PropsType {
  children: ReactNode;
}

const useCartContext = () => useContext(CartContext);

const getInitialStorage = (): Cart[] => {
  let carts: Cart[] = [];

  if (typeof window !== "undefined") {
    carts =
      (JSON.parse(
        localStorage.getItem("carts") as string
      ) as unknown as Cart[]) ?? [];
  }

  return carts;
};

const CartProvider = (props: PropsType) => {
  const [carts, setCarts] = useState<Cart[]>(getInitialStorage);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  return (
    <CartContext.Provider
      value={{ carts, setCarts, openDrawer, setOpenDrawer }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { useCartContext, CartProvider };
