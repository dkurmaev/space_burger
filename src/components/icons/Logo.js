import Image from "next/image";
export default function Logo() {
  return (
    <Image
      className="cursor-pointer"
      src={"/img/Logo_full.png"}
      width={260}
      height={260}
      style={{ objectFit: "contain" }}
      alt={"logo"}
      href={"/"}
    />
  );
}
