"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import Logo from "@/components/icons/Logo";
import { CartContext } from "@/components/AppContext";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  if (userName && typeof userName === "string" && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="flex items-center ">
      <div className="flex">
        <Logo />
      </div>
      <nav className="flex items-center mx-auto justify-center gap-8 grow text-gray-400 font-semibold text-lg">
        <Link href={"/"}>
          <span className=" hover:text-primary ">Home</span>
        </Link>
        <Link href={"/menu"}>
          <span className=" hover:text-primary">Menü</span>
        </Link>
        <Link href={"/"}>
          <span
            className=" hover:text-primary"
            onClick={() => scrollToSection("our__story")}
          >
            Über uns
          </span>
        </Link>
        <Link href={"/"}>
          <span
            className=" hover:text-primary "
            onClick={() => scrollToSection("contact")}
          >
            Kontakt
          </span>
        </Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-400 font-semi-bold text-base w-fit">
        {status === "authenticated" && (
          <>
            <Link
              className="text-white whitespace-nowrap glow flex  items-center"
              href={"/profile"}
            >
              {`Hi! `}
              {userName}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-primary rounded-full text-white px-8 py-2 header-menu__link menu-link"
            >
              Abmelden
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link
              href={"/login"}
              className="bg-my_blue rounded-full text-white px-8 py-2 "
            >
              Anmelden
            </Link>
            <Link
              href={"/register"}
              className="bg-primary rounded-full text-white px-8 py-2 "
            >
              Registrieren
            </Link>
          </>
        )}
        <Link href={"/cart"}>Warenkorb ({cartProducts.length})</Link>
      </nav>
    </header>
  );
}
