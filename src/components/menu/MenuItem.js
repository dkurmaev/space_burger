import Right from "@/components/icons/Right";

export default function MenuItem({
                                     image, name, description, basePrice,
                                     extras, beilagen, drinks
                                 }) {
    return (
        <div className="card mt-14 bg-gray-200 p-4 rounded-lg text-center group hover:shadow-xl hover:shadow-white/20 transition-all">
            <h4 className="font-semibold text-xl my-3 uppercase">BURGERS</h4>
            <div className="text-center mx-auto mt-8" style={{ width: "290px", height: "210px", filter: "drop-shadow(2px 2px 60px #5A5A5A)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="image" className="max-h-auto  block " />
            </div>
            <div className="font-semibold my-3 font-bold text-xl ">
                {name}
            </div>
            <p className="text-gray-300 mt-4 text-sm line-clamp-2 ">{description}</p>
            <button className="bg-primary justify-center
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
                  hover:bg-orange-600">Einlegen für <span className="text-red-800 font-bold font-semibold">{basePrice.toFixed(2)}€</span>
                <Right /></button>
        </div>
    );
}
