"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { UseProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dbTimeForHuman } from "@/libs/datetime";


export default function OrdersPage() {
  const { loading: profileLoading, data: profileData } = UseProfile();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders").then(res => {
      res.json().then(orders => {
       
        setOrders(orders.reverse());
      })
    })
  }, [])

  if (profileLoading) {
    return (
      <>
        <p className="text-center mt-16">Bestellung werden geladen...</p>
        <span className="flex justify-center mx-auto mt-16 loader-profile"></span>
      </>
    );
  }
  return (
    <section className=" mt-16 mx-auto max-w-full">
      <UserTabs isAdmin={profileData.admin} />
      <div className="mt-16">
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className=" frame__glow mb-8 p-4 gap-14 rounded-lg flex flex-col md:flex-row justify-between items-center"
            >
              <div className="grow flex flex-col md:flex-row gap-14 items-center">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-my_blue " : "bg-red-400 ") +
                      "p-2 rounded-md text-white w-36 text-center "
                    }
                  >
                    {order.paid ? "Bezahlt" : "Nicht bezahlt"}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-8 items-center mb-2">
                    <div className="text-my_blue grow">{order.userEmail}</div>
                    <div className="text-gray-500">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>

                  <div className="text-sm italic">
                    {order.cartProducts.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-8 items-center text-primary ">
                <Link
                  href={"/orders/" + order._id}
                  className="order rounded-lg justify-center flex items-center"
                >
                  Bestellung anzeigen
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
