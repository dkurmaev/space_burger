"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;

  if (cartProduct.extras) {
    price += cartProduct.extras.price;
  }
  if (cartProduct.beilagen) {
    price += cartProduct.beilagen.price;
  }
  if (cartProduct.drinks) {
    price += cartProduct.drinks.price;
  }

  if (isNaN(price)) {
    console.error(`NaN detected for basePrice of product: ${cartProduct.name}`);
    console.log("Cart Product:", cartProduct);
    return cartProduct.basePrice;
  }

  console.log("Product Price:", price);
  return price;
}


export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const lokalStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (lokalStorage && lokalStorage.getItem("cart")) {
      setCartProducts(JSON.parse(lokalStorage.getItem("cart")));
    }
  }, [lokalStorage]);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeFromCart(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (value, index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);

      return newCartProducts;
    });
    toast.success("Produkt entfernt");
  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (lokalStorage) {
      lokalStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(
    product,
    extras = null,
    beilagen =[],
    drinks =[]
  ) {
    setCartProducts((prevProducts) => {
      const cartProduct = {
        ...product,
        extras,
        beilagen,
        drinks,
      };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeFromCart,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
