"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { UseProfile } from "@/components/UseProfile";

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CartPage() {
  const { cartProducts, removeFromCart } = useContext(CartContext);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [address, setAddress] = useState({});
  const { data: profileData } = UseProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Bezahlung fehlgeschlagen 😔");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, countryCode, country, city, plz, street } = profileData;
      const addressFromProfile = {
        phone,
        countryCode,
        country,
        city,
        plz,
        street,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  useEffect(() => {
    const kasse = document.getElementById("saveButton");
    if (kasse) {
      kasse.disabled = !termsAccepted;
    }
  }, [termsAccepted]);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Ihre Bestellung wird vorbereitet...",
      success: "Weiterleitung zur Zahlung...",
      error:
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <>
        <div >
          <SectionHeaders mainHeader="Ihr Warenkorb" />
        </div>

        <div className="mt-12 flex items-center justify-center">
          <div className="bg-bg frame__glow p-8 rounded-lg  text-center">
            <h1 className="text-3xl text-primary text-glow font-bold mb-4 items-center">
              Ihr Warenkorb ist leer.😔
            </h1>
            <p className="text-gray-400">
              Wählen Sie Ihre Produkte im
              <Link href="/menu">
                <span className="text-my_blue underline font-semibold ml-1 hover:underline">
                  Menü
                </span>
              </Link>
              &nbsp;aus.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="mt-16 w-full  mx-auto">
      <div className="text-center">
        <SectionHeaders mainHeader="Ihr Warenkorb" />
      </div>
      <div className="mt-16">
        {cartProducts?.length === 0 && (
          <div className="mt-12 flex items-center justify-center">
            <div className="bg-bg frame__glow p-8 rounded-lg  text-center">
              <h1 className="text-3xl text-primary text-glow font-bold mb-4 items-center">
                Ihr Warenkorb ist leer.😔
              </h1>
              <p className="text-gray-400">
                Wählen Sie Ihre Produkte im
                <Link href="/menu">
                  <span className="text-my_blue underline font-semibold ml-1 hover:underline">
                    Menü
                  </span>
                </Link>
                &nbsp;aus.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-12 mt-16">
        <div className="grid grid-cols-2">
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                onRemove={removeFromCart}
              />
            ))}

          {cartProducts?.length > 0 && (
            <div className=" text-primary font-semibold text-glow py-4 pr-16 gap-4 flex justify-end items-center">
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
          )}
        </div>
        {cartProducts?.length > 0 && (
          <div className="frame__glow rounded-lg p-4 text-gray-100 text-base flex flex-col justify-between">
            <h2 className=" mb-4 text-center text-lg text-glow">
              Bitte füllen Sie alle Felder aus!
            </h2>
            <form
              onSubmit={proceedToCheckout}
              className="flex flex-col justify-between h-full"
            >
              <AddressInputs
                addressProps={address}
                setAddressProps={handleAddressChange}
              />
              <p className=" ml-2 mt-8 text-md text-gray-600">
                <input
                  className="text-gray-200"
                  type="checkbox"
                  required
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                />
                <span className="text-gray-200">
                  &nbsp;Indem Sie auf&nbsp;
                  <span className="text-primary" href="/#">
                    Zur Kasse
                  </span>
                  &nbsp; klicken, stimmen Sie unseren&nbsp;
                  <a href="#" className="underline text-rose-800">
                    Datenschutzerklärung
                  </a>
                  &nbsp;zu!
                </span>
              </p>
              <div className="mt-auto ">
                <button
                  id="kasse"
                  type="submit"
                  className="bg-primary rounded-full  justify-center text-gray-150  text-md "
                  disabled={!termsAccepted}
                >
                  Zur Kasse &nbsp;{(subtotal + 4.9).toFixed(2)}€
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
