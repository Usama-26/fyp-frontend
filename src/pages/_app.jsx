import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleClientSecret from "@/json/client_secret";
import { Inter, Comfortaa } from "next/font/google";
import { mainnet, sepolia, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig } from "wagmi";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const display = Comfortaa({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "600", "500", "400", "300"],
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }) {
  const { web } = GoogleClientSecret;
  return (
    <WagmiConfig config={config}>
      <GoogleOAuthProvider clientId={web.client_id}>
        <main className={`${display.variable} ${inter.variable}`}>
          <Component {...pageProps} />
        </main>
      </GoogleOAuthProvider>
    </WagmiConfig>
  );
}
