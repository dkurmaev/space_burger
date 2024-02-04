import AddToCartButton from "@/components/menu/AddToCartButton";
export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, extras, beilagen, drinks } = item;
  const hasExtrasOrDrinkWithBeilagen =  extras?.length > 0 || beilagen?.length > 0 || drinks?.length > 0 
  
  return (
    <div className="frame__glow my-8 gap-16 p-4 rounded-lg text-center group hover:shadow-xl hover:shadow-white/20 ">
      <div className="font-semibold my-3  text-xl ">{name}</div>
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
      <AddToCartButton 
      image = {image}
      hasExtrasOrDrinkWithBeilagen = {hasExtrasOrDrinkWithBeilagen}
      onClick={onAddToCart}
      basePrice = {basePrice}
        />
    </div>
  );
}
