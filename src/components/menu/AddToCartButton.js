import FlyingButton from "react-flying-item";
export default function AddToCartButton({
  hasExtrasOrDrinkWithBeilagen,
  onClick,
  basePrice,
  image,
}) {
  if (!hasExtrasOrDrinkWithBeilagen) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton targetTop={"5%"} targetRight={"5%"} src={image}>
          <div onClick={onClick}>
            Einlegen für&nbsp;
            <span className="text-red-800 font-semibold">
              &nbsp;{basePrice.toFixed(2)}€
            </span>
          </div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
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
      {hasExtrasOrDrinkWithBeilagen ? (
        <span>
          Einlegen für (aus
          <span className="text-red-800 font-semibold">
            &nbsp;{basePrice.toFixed(2)}€
          </span>
          )
        </span>
      ) : (
        <span>
          Einlegen für&nbsp;
          <span className="text-red-800 font-semibold">
            &nbsp;{basePrice.toFixed(2)}€
          </span>
        </span>
      )}
    </button>
  );
}
