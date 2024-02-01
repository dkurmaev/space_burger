import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Right from "@/components/icons/Right";
import { CartContext } from "@/components/AppContext";


export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, extras, beilagen, drinks } =
    menuItem;

  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if (extras.length === 0 && beilagen.length === 0 && drinks.length === 0) {
      addToCart(menuItem);
      toast.success("Artikel zum Warenkorb hinzugefügt");
    }else {
      setShowPopup(true);

    }
  }

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-bg/80 flex items-center justify-center">
          <div className=" bg-bg p-4 rounded-lg shadow-md ring ring-my_rahme/20 shadow-my_rahme/50">
            test
          </div>
        </div>
      )}
      <div className="card mt-4 bg-gray-200 p-4 rounded-lg text-center group hover:shadow-xl hover:shadow-white/20 transition-all">
        <div className="font-semibold my-3 font-bold text-xl ">{name}</div>
        <div
          className="text-center mx-auto mt-4"
          style={{
            width: "290px",
            height: "210px",
            filter: "drop-shadow(2px 2px 60px #5A5A5A)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="image" className="max-h-auto  block " />
        </div>

        <p className="text-gray-300 mt-4 text-sm line-clamp-1 italic ">
          {description}
        </p>
        <button
          type="button"
          onClick={handleAddToCartButtonClick}
          className="bg-primary justify-center
                  items-center
                  uppercase
                  gap-4
                  mt-8
                  rounded-full
                  text-white
                  px-4
                  py-2
                  text-sm
                  w-full
                  hover:bg-orange-600"
        >
          Einlegen für{" "}
          <span className="text-red-800  font-bold font-semibold">
            {basePrice.toFixed(2)}€
          </span>
          <Right />
        </button>
      </div>
    </>
  );
}
