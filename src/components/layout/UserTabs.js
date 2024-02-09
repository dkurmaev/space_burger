"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  
    return (
      <div className="flex items-center mx-auto text-gray-400 justify-between gap-4 tabs flex-wrap">
        <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
          Profile
        </Link>
        {isAdmin && (
          <>
            <Link
              href={"/categories"}
              className={path === "/categories" ? "active" : ""}
            >
              Kategorien
            </Link>
            <Link
              href={"/menu-items"}
              className={/menu-items/.test(path) ? "active" : ""}
            >
              Menüartikel
            </Link>
            <Link
              href={"/users"}
              className={path.includes("/users") ? "active" : ""}
            >
              Users
            </Link>
          </>
        )}
        <Link href={"/orders"} className={path === "/orders" ? "active" : ""}>
          Bestellungen
        </Link>
      </div>
    );
}