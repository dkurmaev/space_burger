"use client";

import {SessionProvider} from "next-auth/react"
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export function AppProvider ({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    const lokalStorage =  typeof window !== "undefined" ? window.localStorage : null;

    useEffect(() => {
      if(lokalStorage && lokalStorage.getItem("cart")){
          setCartProducts(JSON.parse(lokalStorage.getItem("cart")));
      }  
    }, [lokalStorage]);

    function clearCart() {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    function removeFromCart(indexToRemove){
        setCartProducts(prevCartProducts => {
        const newCartProducts = prevCartProducts
        .filter((value, index) => index !== indexToRemove);
        saveCartProductsToLocalStorage(newCartProducts);
        return newCartProducts;
        });
    }
  

    function saveCartProductsToLocalStorage(cartProducts){
        if(lokalStorage){
            lokalStorage.setItem("cart", JSON.stringify(cartProducts));
        }
    }

    function addToCart(product, extras = [] , beilagen = [], drinks = []) {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product, extras, beilagen, drinks };
            const newProducts = [...prevProducts, cartProduct ];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;

        });
        
    }
    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,
                setCartProducts,
                addToCart,
                removeFromCart,
                clearCart
            }}>
            {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}