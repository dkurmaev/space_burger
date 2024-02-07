import SectionHeaders from "@/components/layout/SectionHeaders";

export default function OrderPage() {
  return (
    <section className="text-center mt-16 mx-auto max-w-3xl">
      <div className="text-center">
        <SectionHeaders mainHeader={"Gesamte Bestellungen"} />
        <p className="text-center mt-16">Info werden geladen...</p>
        <span className="flex justify-center mx-auto mt-16 loader-profile"></span>
      </div>
    </section>
  );
}
