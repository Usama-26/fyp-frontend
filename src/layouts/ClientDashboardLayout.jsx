import DashboardNavigation from "@/components/DashboardNavigation";
import WebLayout from "./WebLayout";

const clientTabs = [
  { name: "Overview", href: "/client/dashboard", current: false },
  { name: "Projects", href: "/client/dashboard/projects", current: false },
  { name: "Payments", href: "/client/dashboard/payments", current: false },
  { name: "Inbox", href: "/client/dashboard/inbox", current: false },
];

export default function ClientDashboardLayout({ children }) {
  return (
    <WebLayout>
      <div className="container mx-auto my-8">
        <DashboardNavigation initialTabs={clientTabs} />
        {children}
      </div>
    </WebLayout>
  );
}
