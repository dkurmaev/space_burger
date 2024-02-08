

import React, { useContext } from "react";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Image from "next/image";
import Trash from "@/components/icons/Trash";

export default function CartProduct({
  product,
  index,
  isTrashDisabled = false,
}) {
  const { removeFromCart, isOrderPaid } = useContext(CartContext);

  const handleRemoveFromCart = () => {
    if (!isOrderPaid) {
      removeFromCart(index);
    }
  };

  return (
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
        <h3 className="uppercase italic font-semibold text-glow">
          {product.name}
        </h3>
        <p className="text-gray-600 text-xs italic">
          Basispreis:{" "}
          <span className="text-primary/25">
            {product.basePrice.toFixed(2)}€
          </span>
        </p>
        <div className="mt-4">
          {product.extras && (
            <div className="text-gray-400 text-xs">
              Extras:&nbsp;
              <span className="text-primary text-xs">
                {product.extras.name}
                <span className="text-xs">&nbsp;+ {product.extras.price}€</span>
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
        {!isOrderPaid && (
          <button
            type="button"
            onClick={handleRemoveFromCart}
            className="p-2 bg-transparent"
            disabled={isTrashDisabled}
          >
            <Trash />
          </button>
        )}
      </div>
    </div>
  );
}
