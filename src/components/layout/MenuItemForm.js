import { useEffect, useState } from "react";
import { NumericFormat }from "react-number-format";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriseProps from "@/components/layout/MenuItemPriseProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");  
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [extras, setExtras] = useState(menuItem?.extras || []);
  const [beilagen, setBeilagen] = useState(menuItem?.beilagen || []);
  const [drinks, setDrinks] = useState(menuItem?.drinks || []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");

  useEffect(() => {
    fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });

  }, [])

  

  return (
    <form
      onSubmit={(event) =>
        onSubmit(event, {
          image,
          name,
          description,
          basePrice,
          category,
          extras,
          beilagen,
          drinks,
        })
      }
      className="mt-8 mx-w-2xl mx-auto"
    >
      <div
        className="grid gap-6 items-start "
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label className="text-gray-400 px-2">Artikel Name</label>
          <input
            className="text-white"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label className="text-gray-400 px-2">Beschreibung</label>
          <input
            className="text-white"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label className="text-gray-400 px-2">Kategorie</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label className="text-gray-400 px-2">Regular Preis €</label>
          <NumericFormat
            className="text-white"
            value={basePrice}
            onValueChange={(values) => {
              const { floatValue } = values;
              setBasePrice(floatValue);
            }}
            thousandSeparator={true}
            prefix={"€"}
          />
          <MenuItemPriseProps
            name={"Extras"}
            addLabel={"Extras hinzufügen"}
            props={extras}
            setProps={setExtras}
          />
          <MenuItemPriseProps
            name={"Beilagen"}
            addLabel={"Beilagen hinzufügen"}
            props={beilagen}
            setProps={setBeilagen}
          />
          <MenuItemPriseProps
            name={"Getränke"}
            addLabel={"Getränke hinzufügen"}
            props={drinks}
            setProps={setDrinks}
          />
          <button
            className="save bg-primary mt-2 flex justify-center items-center"
            type="save"
          >
            Speichern
          </button>
        </div>
      </div>
    </form>
  );
}
