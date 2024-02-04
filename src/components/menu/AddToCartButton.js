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
        <FlyingButton targetTop={"5%"} targetRight={"95%"} src={image}>
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
    <button type="button" onClick={onClick} className="flying-button-cart">
      <span>
        Einlegen für (aus
        <span className="text-red-800 font-semibold">
          &nbsp;{basePrice.toFixed(2)}€
        </span>
        )
      </span>
    </button>
  );
}
