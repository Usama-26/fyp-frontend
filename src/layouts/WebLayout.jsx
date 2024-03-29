import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import ServiceExplorer from "@/components/ServiceExplorer";
// import { useRouter } from "next/router";

export default function WebLayout({ children }) {
  // const [isPageLoading, setIsPageLoading] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChangeStart = () => {
  //     setIsPageLoading(true);
  //     setProgress(90);
  //   };
  //   const handleRouteComplete = () => {
  //     setProgress(100);
  //     setIsPageLoading(false);
  //   };
  //   router.events.on("routeChangeStart", handleRouteChangeStart);
  //   router.events.on("routeChangeComplete", handleRouteComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //     router.events.off("routeChangeComplete", handleRouteComplete);
  //   };
  // }, [isPageLoading]);
  return (
    <>
      <Header />
      <ServiceExplorer />
      {children}
      <Footer />
    </>
  );
}
