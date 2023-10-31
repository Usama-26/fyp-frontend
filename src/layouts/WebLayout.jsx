import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import ServiceExplorer from "@/components/ServiceExplorer";
// import { useRouter } from "next/router";
import { getData } from "@/utils/api/genericAPI";

export default function WebLayout({ children }) {
  // const [isPageLoading, setIsPageLoading] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getData(
          "https://fyp-backend.up.railway.app/api/v1/categories/"
        );
        setCategories(response.data.categories);
      } catch (err) {
        return err.response;
      }
    };

    fetchCategories();
  }, []);

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
      <NavBar />
      {categories && <ServiceExplorer data={categories} />}
      {children}
      <Footer />
    </>
  );
}
