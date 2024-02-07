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
        <p className="text-center mt-16">Info werden geladen...</p>
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
              key={order.id}
              className=" frame__glow mb-8 p-4 gap-8 rounded-lg flex justify-between items-center"
            >
              <div>
                <span
                  className={
                    (order.paid ? "bg-my_blue " : "bg-red-400 ") +
                    "p-2 rounded-md text-white"
                  }
                >
                  {order.paid ? "Bezahlt" : "Nicht bezahlt"}
                </span>
              </div>
              <div className="">
                <div className="text-my_blue ">{order.userEmail}</div>
                <div className="text-sm italic">{order.cartProducts.map((p) => p.name).join (", ")}</div>
              </div>
              <div className="flex justify-end gap-8 items-center text-primary ">
                {dbTimeForHuman(order.createdAt)}
                <Link href= {"/orders/" + order._id} className="button">View</Link> 
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
