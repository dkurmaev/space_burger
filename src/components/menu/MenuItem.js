import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import CloseButton from "@/components/icons/CloseButton";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, extras, beilagen, drinks } =
    menuItem;

  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if (extras.length === 0 && beilagen.length === 0 && drinks.length === 0) {
      addToCart(menuItem);
      toast.success("Artikel zum Warenkorb hinzugefügt");
    } else {
      setShowPopup(true);
    }
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  return (
    <>
      {showPopup && (
        <div className=" fixed inset-0 bg-black/90 z-40 flex items-center justify-center">
          <div className=" frame__glow rounded-lg  shadow-my_rahme max-w-md p-4">
            <button
              onClick={handleClosePopup}
              style={{ backgroundColor: "transparent", border: "none" }}
              className=" flex items-baseline justify-end ml-6 text-gray-500 hover:text-my_blue"
            >
              <CloseButton />
            </button>
            <Image
              src={image}
              alt={name}
              width={530}
              height={530}
              style={{ objectFit: "contain" }}
              className="mx-auto food__image"
            />
            <h2 className="text-xl font-bold text-center mb-4 text-gray-200">
              {name}
            </h2>
            <p className="font-bold text-center italic mb-2 ">{description}</p>
            {extras?.length > 0 &&
              beilagen?.length > 0 &&
              drinks?.length > 0 && (
                <div className="bg-secondary  rounded-md p-2 ">
                  <h3>Extras</h3>
                  <h3>Beilagen</h3>
                  <h3>Drinks</h3>
                  <label>
                    <input type="radio" /> {extras.name} {extras.price}
                  </label>
                </div>
              )}
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
