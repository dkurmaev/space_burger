import Image from "next/image";
import Link from "next/link";
import Phone from "@/components/icons/Phone";
import Email from "@/components/icons/Email";

export default function Footer() {
  return (
    <>
      <section className="grid place-items-center mt-8">
        <div className="container flex flex-col items-center">
          <div className="text-center mt-2 text-gray-400 footer-info ">
            <span className="footer__glow ">
              DIE BESTEN BURGER IN DER STADT
            </span>
            <br />
            <div className="hidden md:block">
              Unsere besten Burger in der Stadt zeichnen sich durch die höchste
              Qualität und den einzigartigen Geschmack aus. Mit handverlesenen
              Zutaten und raffinierten Rezepten bieten wir nicht nur einen
              Burger, sondern ein unvergleichliches kulinarisches Erlebnis.
              Jeder Bissen ist eine Fusion aus Aromen, die die Sinne ansprechen
              und ein unvergessliches Genusserlebnis schaffen. Probieren Sie
              unsere Besten und überzeugen Sie sich selbst!
            </div>
          </div>
          <div>
            <ul className="social flex mt-6 gap-6">
              <li className="group">
                <a
                  href="https://www.instagram.com/spaceboxburger_ia?igsh=MWh5ZGpnZzV0aGNoOA=="
                  target="_blank"
                >
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
            className="relative max-h-auto mt-10  mx-auto w-full h-[160px] border-t border-orange-600 items-center hidden md:block "
            id="contact"
          >
            <div className="md:flex justify-between mt-12 items-center">
              <Link href="/">
                <Image
                  src="/img/Logo_full.png"
                  width={250}
                  height={250}
                  className="md:mt-6 object-contain cursor-pointer"
                  alt="footer_logo"
                />
              </Link>
              <div className="flex  mx-auto gap-8 text-gray-400 justify-evenly items-center  ">
                <div className="">
                  <Link
                    href={
                      "https://www.google.com/maps/place/Schönfelder+Weg+28-31,+16321+Bernau+bei+Berlin"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-primary text-base">Anschrift: </h3>
                    <ul>Schönfelder Weg 28 - 31 </ul>
                    <ul>16321 Bernau bei Berlin </ul>
                  </Link>
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
                  <div className="flex items-center">
                    <Phone />
                    &nbsp;<ul>+49 (0) 176-22-99-77-56 </ul>
                  </div>
                  <div className="flex items-center">
                    <Email />
                    &nbsp;<ul>info@spacebox-burger.de</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t p-5 text-xs text-center text-gray-500 mt-16 border-orange-600">
        Copyright &copy; &nbsp;2023-2024&nbsp;
        <span className="md:bg-grey-500 text-grey-400 p-2 rounded-md">
          Im Projekt waren&nbsp;
          <a
            href="https://www.linkedin.com/in/danil-kurmayev-141b44272/"
            target="_blank"
            className="text-primary hover:underline"
          >
            Danil Kurmayev
          </a>
          &nbsp;als Full-Stack-Entwickler,&nbsp;
          <a
            href="https://www.facebook.com/profile.php?id=100088022222981"
            className="text-primary hover:underline"
          >
            Roman Popov &nbsp;
          </a>
          &nbsp;als QA beteiligt.
        </span>
        Alle Rechte vorbehalten. Impressum, AGB, Datenschutzerklärung, Erklärung
        zur Verwendung von Payments Terms of Use und Cookies
      </footer>
    </>
  );
}
