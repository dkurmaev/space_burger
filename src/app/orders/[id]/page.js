"use client";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      });
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="mt-16 mx-auto">
      <div className="text-center">
        <SectionHeaders mainHeader="Ihre Bestellung" />
        <div className="my-4">
          <p>Vielen Dank für Ihre Bestellung!</p>
          <p>Wir rufen Sie an, wenn Ihre Bestellung unterwegs ist</p>
        </div>
      </div>
      {loadingOrder && (
        <div>
          <p className="text-center mt-16">Wird geladen...</p>
          <span className="flex justify-center mx-auto mt-16 loader-profile"></span>
        </div>
      )}
      <div className="grid grid-cols-2 mt-16 gap-8">
        {order && (
          <div className="w-full ">
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className=" text-primary font-semibold text-glow py-4  gap-4 flex justify-end items-center">
              Gesamt:&nbsp;
              <br />
              Lieferung:&nbsp;
              <br />
              Insgesamt:
              <div className="text-lg text-my_blue font-semibold text-right">
                <span> &nbsp;{subtotal.toFixed(2)}€</span>
                <br />
                <span>&nbsp; 4.90€</span>
                <br />
                <span>{(subtotal + 4.9).toFixed(2)}€</span>
              </div>
            </div>
          </div>
        )}
        {order && (
        <div className="bg-bg frame__glow p-8 rounded-lg">
          <AddressInputs disabled={true} addressProps={order} />
        </div>
        )}
      </div>
    </section>
  );
}
