/* "use client"; */
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
/* import AboutVideo from "@/components/layout/AboutVideo"; */
import Reviews from "@/components/layout/Reviews";


export default function Home() {

    return (
      <>
        <Hero />
        <HomeMenu />

        <section className="text-center my-16 hidden md:block">
          <SectionHeaders
            subHeader={"Rezensionen Über Uns"}
            mainHeader={"Kontaktieren Sie mit uns"}
          />
        </section>

        <section className="text-center my-16 gap-2" id="our__story">
          {/* <AboutVideo/> */}
        </section>
        <section>
          <Reviews />
        </section>
      </>
    );
}
