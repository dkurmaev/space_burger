"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section className="ml-3">
      <div className="text-center mt-8">
        <SectionHeaders
          /* subHeader={"check out"} */
          mainHeader={"spacebox bestsellers"}
        ></SectionHeaders>
      </div>
      <div className="md:grid mr-4 grid-cols-3 gap-8 ">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
