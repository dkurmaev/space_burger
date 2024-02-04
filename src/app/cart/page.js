"use client";

import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { UseProfile } from "@/components/UseProfile";

export default function CartPage() {
  const { cartProducts, removeFromCart } = useContext(CartContext);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [address, setAddress] = useState({});
  const { data: profileData } = UseProfile();

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

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
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
  return (
    <section className="mt-16 w-full  mx-auto">
      <div className="text-center">
        <SectionHeaders mainHeader="Ihr Warenkorb" />
      </div>

      <div className="grid grid-cols-2 gap-12 mt-16">
        <div>
          {cartProducts?.length === 0 && <div>Ihr Warenkorb ist leer.</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div
                className="flex gap-8 mb-4 border-b border-primary text-gray-200 py-4 items-center"
                key={product}
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
                  {/* <div className="mt-4">
                    {product.extras && (
                      <div className="text-gray-400 text-xs">
                        Extras:&nbsp;
                        <span className="text-primary text-xs">
                          {product.extras.name}
                          <span className="text-my_blue text-xs">
                            + {product.extras.price}€
                          </span>
                        </span>
                      </div>
                    )}
                    {product.beilagen && (
                      <div className="text-gray-400 text-xs">
                        Beilagen:&nbsp;
                        <span className="text-primary text-xs">
                          {product.beilagen.name}
                          <span className="text-my_blue text-xs">
                            + {product.beilagen.price}€
                          </span>
                        </span>
                      </div>
                    )}
                    {product.drinks && (
                      <div className="text-gray-400 text-xs">
                        Getränke:&nbsp;
                        <span className="text-primary text-xs">
                          {product.drinks.name}
                          <span className="text-my_blue text-xs">
                            + {product.drinks.price}€
                          </span>
                        </span>
                      </div>
                    )}
                  </div> */}
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
          <div className="text-right text-primary font-semibold text-glow py-4 pr-16">
            Gesamt:&nbsp;
            <span className="text-lg text-my_blue font-semibold">
              &nbsp;{total.toFixed(2)}€{" "}
            </span>
          </div>
        </div>
        <div className="frame__glow rounded-lg p-4 text-gray-100 text-base flex flex-col justify-between">
          <h2 className=" mb-4 text-center text-lg text-glow">
            Bitte füllen Sie alle Felder aus!
          </h2>
          <form className="flex flex-col justify-between h-full">
            <AddressInputs
              adressProps={address}
              setAdressProps={handleAddressChange}
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
                Zur Kasse &nbsp;{total.toFixed(2)}€
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
