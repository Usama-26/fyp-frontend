import "@/styles/globals.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { sepolia, createConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import GoogleClientSecret from "@/json/client_secret";
import { Inter, Comfortaa } from "next/font/google";
import { AccountsProvider } from "@/context/AccountContext";
import { ServicesProvider } from "@/context/ServiceContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { FreelancerProvider } from "@/context/FreelancerContext";
import { ClientProvider } from "@/context/ClientContext";
import { ThirdPartyServicesProvider } from "@/context/ThirdPartyContext";
import { ProposalProvider } from "@/context/ProposalContext";
import { WagmiConfig } from "wagmi";
import { GigProvider } from "@/context/GigContext";

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

export default function App({ Component, pageProps }) {
  const { publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [publicProvider()]
  );
  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
  const { web } = GoogleClientSecret;

  return (
    <main className={`${display.variable} ${inter.variable}`}>
      <WagmiConfig config={config}>
        <ThirdPartyServicesProvider>
          <GoogleOAuthProvider clientId={web.client_id}>
            <AccountsProvider>
              <ServicesProvider>
                <ProjectProvider>
                  <GigProvider>
                    <ProposalProvider>
                      <ClientProvider>
                        <FreelancerProvider>
                          <Component {...pageProps} />
                        </FreelancerProvider>
                      </ClientProvider>
                    </ProposalProvider>
                  </GigProvider>
                </ProjectProvider>
              </ServicesProvider>
            </AccountsProvider>
          </GoogleOAuthProvider>
        </ThirdPartyServicesProvider>
      </WagmiConfig>
    </main>
  );
}
