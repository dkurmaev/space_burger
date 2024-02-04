import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import CloseButton from "@/components/icons/CloseButton";
import Right from "@/components/icons/Right";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, extras, beilagen, drinks } =
    menuItem;

  const [selectedExtras, setSelectedExtras] = useState(extras?.[0] || null);
  const [selectedBeilagen, setSelectedBeilagen] = useState(
    beilagen?.[0] || null
  );
  const [selectedDrinks, setSelectedDrinks] = useState(drinks?.[0] || null);

  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions =
      extras.length > 0 || beilagen.length > 0 || drinks.length > 0;
      if (hasOptions && !showPopup) {
        setShowPopup(true);
        return;
      }
      addToCart(menuItem, selectedExtras, selectedBeilagen, selectedDrinks);
      setShowPopup(false);
      toast.success("Artikel zum Warenkorb hinzugefügt");
    }
  

  let selectedPrice = basePrice;
  if (selectedExtras) {
    selectedPrice += selectedExtras.price;
  }
  if (selectedBeilagen) {
    selectedPrice += selectedBeilagen.price;
  }
  if (selectedDrinks) {
    selectedPrice += selectedDrinks.price;
  }


  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed top-0 left-0 right-0 bg-black/90 z-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="frame__glow rounded-lg shadow-my_rahme p-2 max-w-md my-12 "
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  filter: "drop-shadow(0 0 25px rgb(226, 151, 65, 0.7))",
                }}
                className="justify-end  sticky top-0 "
              >
                <CloseButton />
              </button>
              <Image
                src={image}
                alt={name}
                width={350}
                height={350}
                style={{ objectFit: "contain" }}
                className=" mt-2 mx-auto "
              />
              <h2 className="text-xl font-bold text-center mb-4 mt-4 text-my_blue">
                {name}
              </h2>
              <p className="text-center italic mb-2 ml-5 mx-auto">
                {description}
              </p>
              {extras?.length > 0 &&
                beilagen?.length > 0 &&
                drinks?.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-gray-300">Extras</h3>
                    {extras.map((extra) => (
                      <div
                        key={extra.name}
                        className="flex  items-center gap-2 p-4  rounded-md mt-2 mb-2"
                      >
                        <label>
                          <input
                            type="checkbox"
                            onChange={() => {
                              if (selectedExtras?.name === extra.name) {
                                setSelectedExtras(null);
                              } else {
                                setSelectedExtras((prev) => ({
                                  ...prev,
                                  name: extra.name,
                                  price: extra.price,
                                }));
                              }
                            }}
                            checked={selectedExtras?.name === extra.name}
                          />
                          {extra.name}
                          {extra.price ? ` +${extra.price}€` : ""}
                        </label>
                      </div>
                    ))}
                    <h3 className="text-gray-300">Beilagen</h3>
                    {beilagen.map((beilage) => (
                      <div
                        key={beilage.name}
                        className="flex  items-center gap-2 p-4  rounded-md mt-2 py-2 mb-2"
                      >
                        <label>
                          <input
                            type="checkbox"
                            onChange={() => {
                              if (selectedBeilagen?.name === beilage.name) {
                                setSelectedBeilagen(null);
                              } else {
                                setSelectedBeilagen((prev) => ({
                                  ...prev,
                                  name: beilage.name,
                                  price: beilage.price,
                                }));
                              }
                            }}
                            checked={selectedBeilagen?.name === beilage.name}
                          />
                          {beilage.name}
                          {beilage.price ? ` +${beilage.price}€` : ""}
                        </label>
                      </div>
                    ))}
                    <h3 className="text-gray-300">Getränke</h3>
                    {drinks.map((drink) => (
                      <div
                        key={drink.name}
                        className="flex  items-center gap-2 p-4  rounded-md mt-2 mb-2"
                      >
                        <label>
                          <input
                            type="checkbox"
                            onChange={() => {
                              if (selectedDrinks?.name === drink.name) {
                                setSelectedDrinks(null);
                              } else {
                                setSelectedDrinks((prev) => ({
                                  ...prev,
                                  name: drink.name,
                                  price: drink.price,
                                }));
                              }
                            }}
                            checked={selectedDrinks?.name === drink.name}
                          />
                          {drink.name}
                          {drink.price ? ` +${drink.price}€` : ""}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

              <button
                type="button"
                onClick={handleAddToCartButtonClick}
                className="bg-my_blue justify-center sticky bottom-2 items-center uppercase gap-4 mt-8 rounded-full text-white px-4 py-2 text-sm w-full hover:bg-orange-600"
              >
                Einlegen für
                <span className="text-red-800 font-semibold">
                  {selectedPrice.toFixed(2)}€
                </span>
                <Right />
              </button>
              <button
                type="remove"
                className=" mt-4 text-sm text-center rounded-full justify-center uppercase"
                onClick={() => setShowPopup(false)}
              >
                Aufheben
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
