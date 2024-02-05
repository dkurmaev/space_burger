"use client";
import React, { useEffect } from "react";
import { useCart } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function FloatingCart() {
  const { cartProducts } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const cartElement = document.getElementById("floating-cart");
      if (cartElement) {
        const isScrolled = window.scrollY > 0;
        cartElement.classList.toggle("fixed-cart", isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="floating-cart" className="cart">
      <ShoppingCart />
      <div className="bg-my_blue text-gray-800 rounded-full ml-6 text-sm absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center">
        {cartProducts.length}
      </div>
    </div>
  );
}
