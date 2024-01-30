"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

import { UseProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItemPage() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading: profileLoading, data: profileData } = UseProfile();

  useEffect(() => {
    fetch("/api/menu-items/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((items) => {
        const item = items.find((item) => item._id === id);
        setMenuItem(item);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, [id]);


  async function handleFormSubmit(event, data) {
     event.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/menu-items", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        resolve();
      } catch (error) {
        console.error("Error during API request:", error);
        reject(error);
      }
    });
    await toast.promise(savingPromise, {
      loading: "Speichern...",
      success: "Gespeichert!",
      error: "Speichern fehlgeschlagen",
    });

    setRedirectToItems(true);
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Löschen...",
      success: "Artikel gelöscht!",
      error: "Löschen fehlgeschlagen",
    });
    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (profileLoading) {
    return (
      <>
        <p className="text-center mt-16">Info werden geladen...</p>
        <span className="flex justify-center mx-auto mt-16 loader-profile"></span>
      </>
    );
  }
  if (!profileData.admin) {
    return (
      <div className=" mt-12 flex items-center justify-center">
        <div className="bg-submit p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl text-primary font-bold mb-4 items-center">
            Sie sind kein Administrator!
          </h1>
          <p className="text-gray-400">
            Bitte melden Sie sich mit einem Administrator-Konto an, um auf diese
            Seite zuzugreifen.
          </p>
        </div>
      </div>
    );
  }
  return (
    <section className="mt-16 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button flex justify-center items-center gap-2"
          href={"/menu-items"}
        >
          <Left />
          <span className="text-gray-400 hover:text-white">
            Alle Artikel ansehen
          </span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-sm ml-auto mt-4">
        <DeleteButton
          label="Artikel löschen"          
          onDelete ={handleDeleteClick}
        />
      </div>
    </section>
  );
}
