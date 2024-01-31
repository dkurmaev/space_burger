import Right from "@/components/icons/Right";

export default function MenuItem({
                                     image, name, description, basePrice,
                                     extras, beilagen, drinks
                                 }) {
    return (
        <div className="flex">
            <div className="p-8 rounded-lg text-center transition-all hover:shadow-xl hover:shadow-white/20 card">
                <h4 className="font-semibold text-xl my-2 uppercase">BURGERS</h4>
                <div className="overflow-hidden relative" style={{ width: "100%", height: "220px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        className="w-full h-full object-cover rounded-t-lg"
                        alt={"burgers"}
                    />
                </div>
                <div className="p-4 mt-8 items-center">
                    <div className="text-gray-400 font-bold text-xl mb-5">
                        {name}
                    </div>
                    <div>
                        <p className="text-gray-300 text-sm">{description}</p>
                        <button className="bg-primary flex
                  justify-center
                  items-center
                  uppercase
                  gap-4
                  mt-16
                  rounded-full
                  text-white
                  px-4
                  py-2
                  text-sm
                  w-full
                  hover:bg-orange-600">
                            Einlegen für 9.90€
                            <Right />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
