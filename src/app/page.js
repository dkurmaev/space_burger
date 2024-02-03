/* "use client"; */
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
/* import AboutVideo from "@/components/layout/AboutVideo"; */
import Reviews from "@/components/layout/Reviews";


export default function Home() {

    return (
        <>
            <Hero/>
            <HomeMenu/>
            <section className="text-center my-16 gap-2" id="our__story">
                <SectionHeaders subHeader={"Reviews"}
                                mainHeader={"Rezensionen Über Uns"}
                />
                <Reviews />
                {/* <AboutVideo/> */}
            </section>
            <section className="text-center my-16">
                <SectionHeaders
                    subHeader={"Zögern Sie nicht"}
                    mainHeader={"Kontaktieren Sie mit uns"}
                />

            </section>
        </>
    );
}
