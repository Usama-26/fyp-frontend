import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-quill/dist/quill.snow.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleClientSecret from "@/json/client_secret";
import { Inter, Comfortaa } from "next/font/google";
import { mainnet, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig } from "wagmi";
import { AccountsProvider } from "@/context/AccountContext";
import { ServicesProvider } from "@/context/ServiceContext";
import { useRouter } from "next/router";
import { ProjectProvider } from "@/context/ProjectContext";
import { FreelancerProvider } from "@/context/FreelancerContext";
import { ClientProvider } from "@/context/ClientContext";

import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "WTwFOrxz9Q7lLLK_Gfhm4Px3Jm46KZeM",
  network: Network.ETH_MAINNET,
};

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const display = Comfortaa({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "600", "500", "400"],
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

  const alchemy = new Alchemy(settings);

  // get the latest block
  // const latestBlock = alchemy.core.getBlock("latest").then(console.log);

  return (
    <main className={`${display.variable} ${inter.variable}`}>
      {/* <WagmiConfig config={config}>
      </WagmiConfig> */}
      <GoogleOAuthProvider clientId={web.client_id}>
        <AccountsProvider>
          <ServicesProvider>
            <ProjectProvider>
              <ClientProvider>
                <FreelancerProvider>
                  <Component {...pageProps} />
                </FreelancerProvider>
              </ClientProvider>
            </ProjectProvider>
          </ServicesProvider>
        </AccountsProvider>
      </GoogleOAuthProvider>
    </main>
  );
}
