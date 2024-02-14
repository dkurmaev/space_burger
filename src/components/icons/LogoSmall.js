import Image from "next/image";
export default function LogoSmall() {
  return (
    <Image
      className="logo_small"
      src={"/img/logo_small.png"}
      width={90}
      height={90}
      style={{ objectFit: "contain" }}
      alt={"logo"}
      href={"/"}
    />
  );
}
