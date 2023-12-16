import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-quill/dist/quill.snow.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleClientSecret from "@/json/client_secret";
import { Inter, Comfortaa } from "next/font/google";
import { AccountsProvider } from "@/context/AccountContext";
import { ServicesProvider } from "@/context/ServiceContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { FreelancerProvider } from "@/context/FreelancerContext";
import { ClientProvider } from "@/context/ClientContext";
import { ThirdPartyServicesProvider } from "@/context/ThirdPartyContext";

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
  const { web } = GoogleClientSecret;
  return (
    <main className={`${display.variable} ${inter.variable}`}>
      <GoogleOAuthProvider clientId={web.client_id}>
        <ThirdPartyServicesProvider>
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
        </ThirdPartyServicesProvider>
      </GoogleOAuthProvider>
    </main>
  );
}
