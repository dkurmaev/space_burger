import Image from "next/image";
export default function CloseButton() {
  return (
    <Image
      className="cursor-pointer"
      src={"/img/close.png"}
      width={40}
      height={40}
      style={{ objectFit: "contain" }}
      alt={"close"}
    />
  );
}
