"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Logo from "@/components/icons/Logo";
import LogoSmall from "@/components/icons/LogoSmall";
import { CartContext } from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";
import Hamburger from "@/components/icons/Hamburger";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link
          className="text-my_blue glow  hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300"
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
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link
          href={"/login"}
          className="bg-my_blue rounded-full text-white px-8 py-2 hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300"
        >
          Anmelden
        </Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full text-white px-5 py-2 header-menu__link menu-link hover:text-my_blue hover:border-b-2 border-white hover:rounded-full p-2 transition-all duration-300 "
        >
          Registrieren
        </Link>
      </>
    );
  }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    
    if (status === "unauthenticated") {
      setCartProducts([]);
    }
  }, [status]);

  useEffect(() => {
   
    if (status === "authenticated") {
     
     
      const unpaidProducts = []; 
      
      setCartProducts(unpaidProducts);
    }
  }, [status]);

  if (userName && typeof userName === "string" && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header>
      <div className="flex items-center justify-between md:hidden">
        <div className="flex gap-12 justify-center items-center">
          <Link href="/">
            <LogoSmall className="logo_small" />
          </Link>
          <Link
            className="text-my_blue glow  hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300"
            href={"/profile"}
          >
            {`Hi! `}
            {userName}
          </Link>
        </div>

        <div className="flex gap-2 items-center">
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
          <button
            className={`p-2 bg-transparent ${
              isOpen ? "rotate-90" : ""
            } hamburger`}
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Hamburger
              className={`w-10 h-10 text-gray-400 ${
                isOpen ? "text-my_blue" : ""
              }`}
            />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 flex flex-col justify-center text-center gap-4 mt-2"
        >
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

          <div>
            <span className="hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300">
              Kontakt:
            </span>
            <div className="grid text-sm text-primary border-b-2 border-primary rounded-full p-2 transition-all duration-300 justify-center">
              <span>
                &nbsp;<ul>+49 (0) 176-22-99-77-56 </ul>
              </span>
              <span>
                &nbsp;<ul>info@spacebox-burger.de</ul>
              </span>
            </div>
          </div>

          <AuthLinks status={status} userName={userName} />
        </div>
      )}

      <div className="hidden md:flex items-center mx-auto justify-center gap-10 grow text-gray-400 font-semibold text-lg">
        <Link href="/">
          <Logo className="logo" />
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

          <Link href={"/"}>
            <span
              className=" hover:text-primary hover:border-b-2 border-primary hover:rounded-full p-2 transition-all duration-300 "
              onClick={() => scrollToSection("contact")}
            >
              Kontakt
            </span>
          </Link>
        </nav>
        <nav className="grid grid-cols-2 text-center justify-center items-center gap-4 text-gray-400 text-base ">
          <AuthLinks status={status} userName={userName} />
        </nav>
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
      </div>
    </header>
  );
}
