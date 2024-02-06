export default function AddressInputs({
  addressProps,
  setAddressProps,
  disabled = false,
}) {
  const { phone, countryCode, country, city, plz, street } = addressProps;

  return (
    <>
      <label>Anschrift:*</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Straße und Hausnummer"
        className="avatar__btn mx-auto mt-2"
        value={street}
        onChange={(event) => setAddressProps("street", event.target.value)}
        required
      />
      <p className="text-red-900 italic ml-2 text-xs">
        Bitte geben Sie die Anschrift ein!
      </p>
      <div className="flex gap-4 mt-8">
        <div>
          <label>Postleitzahl:*</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postleitzahl"
            className="avatar__btn mx-auto mt-2"
            value={plz}
            onChange={(event) => setAddressProps("plz", event.target.value)}
            required
          />
          <p className="text-red-900 italic ml-2 text-xs">
            Bitte geben Sie die Postleitzahl ein.
          </p>
        </div>
        <div className="grow">
          <label>Stadt:*</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Stadt"
            className="avatar__btn mx-auto mt-2"
            value={city}
            onChange={(event) => setAddressProps("city", event.target.value)}
            required
          />
          <p className="text-red-900 italic ml-2 text-xs">
            Bitte geben Sie die Stadt ein.
          </p>
        </div>
      </div>
      <label>Land:*</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Land"
        className="avatar__btn mx-auto mt-2"
        value={country}
        onChange={(event) => setAddressProps("country", event.target.value)}
        required
      />
      <p className="text-red-900 italic ml-2 text-xs">
        Bitte geben Sie die Land ein.
      </p>
      <label className="mt-12">Telefonnummer:*</label>
      <div className="text-gray-600 flex justify-start gap-4  ">
        <div>
          <select
            value={countryCode}
            onChange={(event) =>
              setAddressProps("countryCode", event.target.value)
            }
            className="avatar__btn rounded-xl bg-my_blue mx-auto px-2 h-12  mt-2 text-gray-600"
            defaultValue="+49"
            required
            disabled={disabled}
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
            disabled={disabled}
            type="tel"
            placeholder="Telefonnummer"
            className="avatar__btn mt-2 text-gray-300  "
            value={phone}
            onChange={(event) => setAddressProps("phone", event.target.value)}
            required
          />
          <p className="text-red-900 italic ml-2 text-xs">
            Bitte geben Sie die Telefonnummer ein.
          </p>
        </div>
      </div>
    </>
  );
}
