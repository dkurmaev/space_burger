import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section className="grid place-items-center mt-8">
        <div className="container flex flex-col items-center">
          <div className="text-center mt-2 text-gray-400 footer-info">
            <span>DIE BESTEN BURGER IN DER STADT</span>
            <br />
            Unsere besten Burger in der Stadt zeichnen sich durch die höchste
            Qualität und den einzigartigen Geschmack aus. Mit handverlesenen
            Zutaten und raffinierten Rezepten bieten wir nicht nur einen Burger,
            sondern ein unvergleichliches kulinarisches Erlebnis. Jeder Bissen
            ist eine Fusion aus Aromen, die die Sinne ansprechen und ein
            unvergessliches Genusserlebnis schaffen. Probieren Sie unsere Besten
            und überzeugen Sie sich selbst!
          </div>
          <div>
            <ul className="social flex flex-wrap gap-6">
              {/* Первый ряд */}
              <li className="group">
                <a href="https://www.instagram.com/" target="_blank">
                  <Image
                    width={30}
                    height={30}
                    className="mt-6 object-contain cursor-pointer group-hover:shadow-sm group-hover:shadow-primary"
                    src="/img/instagramm_img.png"
                    alt="Instagram"
                  />
                </a>
              </li>
              <li className="group">
                <a href="https://www.facebook.com/" target="_blank">
                  <Image
                    width={30}
                    height={30}
                    className="mt-6 object-contain cursor-pointer group-hover:shadow-sm group-hover:shadow-primary"
                    src="/img/facebook_img.png"
                    alt="facebook"
                  />
                </a>
              </li>
              <li className="group">
                <a href="https://www.whatsapp.com/" target="_blank">
                  <Image
                    width={30}
                    height={30}
                    className="mt-6 object-contain cursor-pointer group-hover:shadow-sm group-hover:shadow-primary"
                    src="/img/whatsup_img.png"
                    alt="WhatsApp"
                  />
                </a>
              </li>
              {/* <li className="group">
                <a href="https://telegram.org/" target="_blank">
                  <Image
                    width={30}
                    height={30}
                    className="mt-6 object-contain cursor-pointer group-hover:shadow-sm group-hover:shadow-primary"
                    src="/img/telegramm.png"
                    alt="Telegram"
                  />
                </a>
              </li> */}
            </ul>
          </div>

          <div
            className="relative max-h-auto mt-10 mx-auto w-full h-[160px] border-t border-orange-600 items-center "
            id="contact"
          >
            <div className="flex justify-between mt-12 items-center">
              <Link href="/">
                <Image
                  src="/img/Logo_full.png"
                  width={350}
                  height={350}
                  className="mt-6 object-contain cursor-pointer"
                  alt="footer_logo"
                />
              </Link>
              <div className="flex mx-auto gap-8 text-gray-400 justify-evenly items-center ">
                <div>
                  <Link
                    href={
                      "https://www.google.com/maps/place/Schönfelder+Weg+28-31,+16321+Bernau+bei+Berlin"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-primary text-base">Adresse: </h3>
                  </Link>
                  <ul>Schönfelder Weg 28 - 31 </ul>
                  <ul>16321 Bernau bei Berlin </ul>
                </div>
                <div>
                  <h3 className="text-primary text-base">Öffnungszeiten: </h3>
                  <ul>11:00 - 22.00 MO - SA </ul>
                  <ul>12:00 - 22:00 SO </ul>
                </div>
                <div>
                  <Link href={"/"}>
                    <h3 className="text-primary text-base">Kontakt: </h3>
                  </Link>
                  <ul>+49 (0) 176-22-99-77-56 </ul>
                  <ul>+49 (0) 176-22-99-77-56 </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t p-5 text-xs text-center text-gray-500 mt-16 border-orange-600">
        &copy; 2024&nbsp;
        <span className="bg-grey-500 text-grey-400 p-2 rounded-md">
          Im Projekt waren&nbsp;
          <a
            href="https://drive.google.com/file/d/1rygJuHmjO8pjMpBUzGdaMQ0PW2RCzJtI/view?usp=sharing"
            target="_blank"
            className="text-primary hover:underline"
          >
            Danil Kurmayev
          </a>
          &nbsp;als Full-Stack-Entwickler,&nbsp;
          <a href="#" className="text-primary hover:underline">
            Roman Popov &nbsp;
          </a>
          &nbsp;als QA beteiligt.
        </span>
        Alle Rechte vorbehalten.
      </footer>
    </>
  );
}
