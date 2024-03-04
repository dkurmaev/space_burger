import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import ScrollToTopButton from "@/components/topUpButton/ScrollToTopButton";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/CookieConsent";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-5xl mx-auto p-4">
          <CookieConsent />
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <ScrollToTopButton />
            <Footer />
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
