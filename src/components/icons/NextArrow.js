import Image from "next/image";

export default function UpButton() {
  return (
    <Image
      src={"/img/arrow_right.png"}
      width={30}
      height={30}
      className="object-contain hover:shadow-xl rounded-full hover:shadow-my_blue"
      alt={"up_scroll"}
    />
  );
}
