import DashboardNavigation from "@/components/DashboardNavigation";
import WebLayout from "./WebLayout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const clientTabs = [
  { name: "Overview", href: "/client/dashboard", current: false },
  { name: "Projects", href: "/client/dashboard/projects", current: false },
  { name: "Payments", href: "/client/dashboard/payments", current: false },
  { name: "Inbox", href: "/client/dashboard/inbox", current: false },
  { name: "Reviews", href: "/client/dashboard/reviews", current: false },
];

export default function ClientDashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div className="container mx-auto my-4">
        <div className="text-xl font-semibold mb-2">
          <h1 className="">Client Dashboard</h1>
        </div>
        <DashboardNavigation initialTabs={clientTabs} />
        {children}
      </div>
      <Footer />
    </>
  );
}
