import DashboardNavigation from "@/components/DashboardNavigation";
import WebLayout from "./WebLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const freelancerTabs = [
  { name: "Overview", href: "/freelancer/dashboard", current: false },
  { name: "Orders", href: "/freelancer/dashboard/orders", current: false },
  { name: "Earnings", href: "/freelancer/dashboard/earnings", current: false },
  { name: "Proposals", href: "/freelancer/dashboard/proposals", current: false },
  { name: "Inbox", href: "/freelancer/dashboard/inbox", current: false },
];

export default function FreelancerDashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div className="container mx-auto my-4">
        <div className="text-xl font-semibold mb-2">
          <h1 className="">Freelancer Dashboard</h1>
        </div>
        <DashboardNavigation initialTabs={freelancerTabs} />
        {children}
        <Footer />
      </div>
    </>
  );
}
