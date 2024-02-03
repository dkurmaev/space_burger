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
        <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center">
          <div className="frame__glow rounded-lg shadow-my_rahme p-8 overflow-x-hidden overflow-auto">
            <button
              onClick={handleClosePopup}
              style={{ backgroundColor: "transparent", border: "none" }}
              className="justify-end p-4"
            >
              <CloseButton />
            </button>
            <Image
              src={image}
              alt={name}
              width={350}
              height={350}
              style={{ objectFit: "contain" }}
              className=" mt-2 mx-auto food__image"
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
                  <h3 className="text-primary">Extras</h3>
                  {extras.map((extra) => (
                    <div key={extra.name} className="flex items-center gap-2 ">
                      <label>
                        <input type="radio" name="extras" /> {extra.name}
                        {extra.price ? ` +${extra.price}€` : ""}
                      </label>
                    </div>
                  ))}
                  <h3 className="text-primary">Beilagen</h3>
                  {beilagen.map((beilage) => (
                    <div key={beilage.name} className="p-0">
                      <label>
                        <input type="radio" name="beilagen" /> {beilage.name}
                        {beilage.price ? ` +${beilage.price}€` : ""}
                      </label>
                    </div>
                  ))}
                  <h3 className="text-primary">Getränke</h3>
                  {drinks.map((drink) => (
                    <div key={drink.name} className="p-0">
                      <label>
                        <input type="radio" name="drinks" /> {drink.name}
                        {drink.price ? ` +${drink.price}€` : ""}
                      </label>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
