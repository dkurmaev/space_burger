"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import Logo from "@/components/icons/Logo";
import { CartContext } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Image from "next/image";

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
    <header >
      <div className="hidden md:flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center mx-auto justify-center gap-12 grow text-gray-400 font-semibold text-lg">
          <Link href={"/"}>
            <span className=" hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300">
              Home
            </span>
          </Link>
          <Link href={"/menu"}>
            <span className=" hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300">
              Menü
            </span>
          </Link>
          {/*  <Link href={"/"}>
          <span
            className=" hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300"
            onClick={() => scrollToSection("our__story")}
          >
            Über uns
          </span>
        </Link> */}
          <Link href={"/"}>
            <span
              className=" hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300 "
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
                className="text-my_blue whitespace-nowrap glow flex  items-center hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300"
                href={"/profile"}
              >
                {`Hi! `}
                {userName}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-primary rounded-full text-white  py-2 flex items-center justify-center header-menu__link menu-link hover:text-my_blue hover:border-b-2 border-white hover:rounded-full p-2 transition-all duration-300"
              >
                Abmelden
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link
                href={"/login"}
                className="bg-my_blue rounded-full text-white px-8 py-2 hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300"
              >
                Anmelden
              </Link>
              <Link
                href={"/register"}
                className="bg-primary rounded-full text-white px-8 py-2 header-menu__link menu-link hover:text-my_blue hover:border-b-2 border-white hover:rounded-full p-2 transition-all duration-300 "
              >
                Registrieren
              </Link>
            </>
          )}
          <Link
            className="hover:text-primary hover:border-b-2 flex items-center justify-center border-primary rounded-full p-2 transition-all duration-300"
            href={"/cart"}
          >
            <div className="relative cart">
              <ShoppingCart />
              {cartProducts?.length > 0 && (
                <div className="bg-primary text-gray-200 rounded-full ml-6 text-sm absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center">
                  {cartProducts.length}
                </div>
              )}
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
}
