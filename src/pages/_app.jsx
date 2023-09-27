import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Inter, Comfortaa } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const display = Comfortaa({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "600", "500", "400", "300"],
});
export default function App({ Component, pageProps }) {
  return (
    <main className={`${display.variable} ${inter.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
