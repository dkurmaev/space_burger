"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { UseProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { loading: profileLoading, data: profileData } = UseProfile();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders").then(res => {
      res.json().then(orders => {
       
        setOrders(orders);
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
    <section className=" mt-16 mx-auto max-w-3xl">
      <UserTabs isAdmin={profileData.admin} />
      <div className="mt-16">
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order.id}
              className=" frame__glow mb-8 p-4 rounded-lg grid grid-cols-3 "
            >
              <div className="text-my_blue">{order.userEmail}</div>
              <div className="text-center">
                <span
                  className={
                    (order.paid ? "bg-my_blue " : "bg-red-400 ") +
                    "p-2 rounded-md text-white"
                  }
                >
                  {order.paid ? "Bezahlt" : "Nicht bezahlt"}
                </span>
              </div>

              <div>{order.createdAt}</div>
            </div>
          ))}
      </div>
    </section>
  );
}
