export default function AdressInputs({ adressProps, setAdressProps }) {
  const { phone, countryCode, country, city, plz, street } = adressProps;

  return (
    <>
      <label>Anschrift:*</label>
      <input
        type="text"
        placeholder="Straße und Hausnummer"
        className="avatar__btn mx-auto mt-2"
        value={street}
        onChange={(event) => setAdressProps("street", event.target.value)}
        required
      />
      <p className="text-red-900 italic mt-2 ml-2 text-sx">
        Bitte geben Sie die Anschrift ein!
      </p>
      <div className="flex gap-4 mt-8">
        <div>
          <label>Postleitzahl:*</label>
          <input
            type="text"
            placeholder="Postleitzahl"
            className="avatar__btn mx-auto mt-2"
            value={plz}
            onChange={(event) => setAdressProps("plz", event.target.value)}
            required
          />
          <p className="text-red-900 italic mt-2 ml-2 text-sx">
            Bitte geben Sie die Postleitzahl ein.
          </p>
        </div>
        <div className="grow">
          <label>Stadt:*</label>
          <input
            type="text"
            placeholder="Stadt"
            className="avatar__btn mx-auto mt-2"
            value={city}
            onChange={(event) => setAdressProps("city", event.target.value)}
            required
          />
          <p className="text-red-900 italic mt-2 ml-2 text-sx">
            Bitte geben Sie die Stadt ein.
          </p>
        </div>
      </div>
      <label>Land:*</label>
      <input
        type="text"
        placeholder="Land"
        className="avatar__btn mx-auto mt-2"
        value={country}
        onChange={(event) => setAdressProps("country", event.target.value)}
        required
      />
      <p className="text-red-900 italic mt-2 ml-2 text-sx">
        Bitte geben Sie die Land ein.
      </p>
      <label className="mt-12">Telefonnummer:*</label>
      <div className="text-gray-600 flex justify-start gap-4  ">
        <div>
          <select
            value={countryCode}
            onChange={(event) =>
              setAdressProps("countryCode", event.target.value)
            }
            className="avatar__btn rounded-xl bg-my_blue mx-auto px-2 h-12  mt-2 text-gray-600"
            defaultValue="+49"
            required
          >
            <option value="+49">+49</option>
            <option value="+1">+1 </option>
            <option value="+7">+7</option>
            <option value="+55">+55</option>
            <option value="+86">+86</option>
            <option value="+39">+39</option>
          </select>
        </div>
        <div className="grow">
          <input
            type="tel"
            placeholder="Telefonnummer"
            className="avatar__btn mt-2 text-gray-300  "
            value={phone}
            onChange={(event) => setAdressProps("phone", event.target.value)}
            required
          />
          <p className="text-red-900 mt-2 ml-2 text-sx">
            Bitte geben Sie die Telefonnummer ein.
          </p>
        </div>
      </div>
    </>
  );
}
