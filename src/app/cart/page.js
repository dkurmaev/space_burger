"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import { UseProfile } from "@/components/UseProfile";


export default function CartPage() {
  const { cartProducts, removeFromCart } = useContext(CartContext);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [address, setAddress] = useState({});
  const { data: profileData } = UseProfile();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("canceled=1")) {
        toast.error("Payment failed 😔");
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
    // address and shopping cart products

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
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
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
                Ihr Warenkorb ist leer.
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
        <div>
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                className="flex gap-8 mb-4 border-b border-primary text-gray-200 py-4 items-center"
                key={product._id || index}
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={340}
                    height={340}
                  />
                </div>
                <div className="grow">
                  <h3 className="uppercase  italic font-semibold text-glow">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs italic">
                    Basispreis: <span className="text-primary/25">{product.basePrice.toFixed(2)}€</span>
                  </p>
                  <div className="mt-4">
                    {product.extras && (
                      <div className="text-gray-400 text-xs">
                        Extras:&nbsp;
                        <span className="text-primary text-xs">
                          {product.extras.name}
                          <span className=" text-xs">
                            &nbsp;+ {product.extras.price}€
                          </span>
                        </span>
                      </div>
                    )}
                    {product.beilagen && (
                      <div className="text-gray-400 text-xs">
                        Beilagen:&nbsp;
                        <span className="text-primary text-xs">
                          {product.beilagen.name}
                          <span className="text-xs">
                            &nbsp; + {product.beilagen.price}€
                          </span>
                        </span>
                      </div>
                    )}
                    {product.drinks && (
                      <div className="text-gray-400 text-xs">
                        Getränke:&nbsp;
                        <span className="text-primary text-xs">
                          {product.drinks.name}
                          <span className="text-xs">
                            &nbsp; + {product.drinks.price}€
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-lg font-semibold text-glow">
                  {cartProductPrice(product).toFixed(2)}€
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeFromCart(index)}
                    className="p-2 bg-transparent "
                  >
                    <Trash />
                  </button>
                </div>
              </div>
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
                  className="text-submit"
                  type="checkbox"
                  required
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                />
                &nbsp;Indem Sie auf&nbsp;
                <span className="text-primary" href="/#">
                  Zur Kasse
                </span>
                &nbsp; klicken, stimmen Sie unseren&nbsp;
                <a href="#" className="underline text-rose-800">
                  Datenschutzerklärung
                </a>
                &nbsp;zu!
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
