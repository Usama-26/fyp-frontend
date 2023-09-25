import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import ServiceExplorer from "@/components/ServiceExplorer";

export default function WebLayout({ children }) {
  return (
    <>
      <Navbar />
      <ServiceExplorer />
      {children}
      <Footer />
    </>
  );
}
