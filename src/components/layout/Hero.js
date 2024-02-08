import Image from "next/image";
import Right from "@/components/icons/Right";
import Link from "next/link";



export default function Hero() {
  return (
    <section className="hero md:mt-4 ">
      <div className=" py-8 md:py-12 ">
        <h1 className="text-2xl font-semibold mt-2 text-center leading-normal">
          SAFTIGSTE&nbsp;
          <br />
          <span className="text-primary text-6xl">SPACEBOX BURGER </span>
          <br />
          IN BERNAU BEI BERLIN
        </h1>
        <p className="my-6 text-gray-500 text-center">
          Entdecke den Saftigkeit unserer Burger! Bestelle jetzt und genieße
          erstklassiges Rindfleisch aus Deutschland und der Region Bernau bei
          Berlin. Schnell, frisch und voller Aktionen!
        </p>
        <div className="flex gap-6 ">
          <Link
            href={"/menu"}
            className="bg-primary flex
          justify-center 
          items-center 
          uppercase 
          gap-2 
          mt-2 
          rounded-full 
          text-white 
          px-4 
          py-2 
          text-sm 
          w-full 
          hover:shadow-md 
          hover:shadow-white"
          >
            WAHL&nbsp; AUS DER SPEISEKARTE
            <Right />
          </Link>
        </div>
      </div>
      <div className="relative pt-16 pb-1 hover:scale-110 transform transition-transform duration-300 ease-in-out hidden md:block">
        <Image
          className="animate-gravitation"
          src={"/img/space.png"}
          width={500}
          height={500}
          style={{ objectFit: "contain" }}
          alt={"burger"}
        />
      </div>
    </section>
  );
}