import { useRouter } from "next/router";
import Right from "@/components/icons/Right";

export default function MenuButton() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/menu");
  };

  return (
    <button onClick={handleButtonClick}>
      WAHL&nbsp; AUS DER SPEISEKARTE
      <Right />
    </button>
  );
}
