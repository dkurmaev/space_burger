"use client";

import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";
import { useContext } from "react";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  return (
    <section className="mt-16 max-w-2xl mx-auto">
      <div className="text-center">
        <SectionHeaders mainHeader="Ihre Warenkorb" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-16">
        <div>
          {cartProducts?.length === 0 && <div>Ihr Warenkorb ist leer.</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product) => (
              <div
                className="flex gap-4 mb-4 border-b border-primary text-gray-200 text-sm uppercase italic py-4 items-center"
                key={product}
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={240}
                  />
                </div>
                <div>
                  <h3>{product.name}</h3>
                  <div className="text-sm mt-4">
                    {product.extras && (
                      <div className="text-gray-400 text-sm">
                        Extras:&nbsp;
                        <span className="text-primary">
                          {product.extras.name}
                        </span>
                      </div>
                    )}
                    {product.beilagen && (
                      <div className="text-gray-400 text-sm">
                        Beilagen:&nbsp;
                        <span className="text-primary">
                          {product.beilagen.name}
                        </span>
                      </div>
                    )}
                    {product.drinks && (
                      <div className="text-gray-400 text-sm">
                        Getränke:&nbsp;
                        <span className="text-primary">
                          {product.drinks.name}{" "}
                          <span className="text-my_blue">
                            + {product.drinks.price}€
                          </span>
                        </span>
                      </div>
                    )}
                    {/* {product.extras?.length > 0 && (
                        <div>
                            Extras: 
                            {product.extras.map((extra, index) => (
                                <div key={index}>{extra.name} {extra.price}€</div>
                            ))}
                        </div>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div>right</div>
      </div>
    </section>
  );
}
