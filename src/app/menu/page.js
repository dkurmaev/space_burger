"use client";
import { useEffect, useState } from "react";

import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { UseProfile } from "@/components/UseProfile";


export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
     const { loading: profileLoading, data: profileData } = UseProfile();

    useEffect(() => {
        fetch("/api/categories").then (response => {
            response.json().then(categories => setCategories(categories))
        });
        fetch("/api/menu-items").then (response => {
            response.json().then(menuItems => setMenuItems(menuItems))
        });
    }, [])

    if (profileLoading) {
      return (
        <>
          <p className="text-center mt-16">Info werden geladen...</p>
          <span className="flex justify-center mx-auto mt-16 loader-profile"></span>
        </>
      );
    }

    return (
      <section className="mt-16">
        {categories?.length > 0 &&
          categories.map((c, index) => (
            <div key={index}>
              <div className="text-center ">
                <SectionHeaders mainHeader={c.name} />
              </div>
              <div className="grid grid-cols-3 gap-8 mt-4 mb-8">
                {menuItems
                  .filter((item) => item.category === c._id)
                  .map((item) => (
                    <MenuItem key={item._id} {...item} />
                  ))}
              </div>
            </div>
          ))}
      </section>
    );
}