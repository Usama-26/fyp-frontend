import DashboardNavigation from "@/components/DashboardNavigation";
import WebLayout from "./WebLayout";

const freelancerTabs = [
  { name: "Overview", href: "/freelancer/dashboard", current: false },
  { name: "Orders", href: "/freelancer/dashboard/orders", current: false },
  { name: "Earnings", href: "/freelancer/dashboard/earnings", current: false },
  { name: "Proposals", href: "/freelancer/dashboard/proposals", current: false },
  { name: "Inbox", href: "/freelancer/dashboard/inbox", current: false },
];

export default function FreelancerDashboardLayout({ children }) {
  return (
    <WebLayout>
      <div className="container mx-auto my-8">
        <DashboardNavigation initialTabs={freelancerTabs} />
        {children}
      </div>
    </WebLayout>
  );
}
