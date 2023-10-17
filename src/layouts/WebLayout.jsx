import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ServiceExplorer from "@/components/ServiceExplorer";

export default function WebLayout({ children }) {
  return (
    <>
      <NavBar />
      <ServiceExplorer />
      {children}
      <Footer />
    </>
  );
}
