export default function SectionHeaders({ subHeader, mainHeader }) {
  
  const words = mainHeader.split(" ");
 
  const firstWord = words.shift();
 
  const remainingWords = words.join(" ");

  return (
    <>
      <h3 className="md:uppercase text-xs font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="font-bold md:text-6xl uppercase">
        <span
          style={{
            color: "#F1B347",
            textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)",
          }}
        >
          {firstWord}
        </span>{" "}
        {remainingWords}
      </h2>
    </>
  );
}
