import WebLayout from "@/layouts/WebLayout";
import withRouteProtect from "@/helpers/withRouteProtect";

const profileTabs = [
  "Personal Info",
  "Skills & Experience",
  "Contact Info",
  "Portfolio",
  "Security",
  "Billing & Payments",
  "Notifications",
  "Deactivate Account",
];
function FreelancerProfileSettings() {
  return (
    <WebLayout>
      <main className="max-w-screen-2xl mx-auto"></main>
    </WebLayout>
  );
}

export default withRouteProtect(FreelancerProfileSettings, ["freelancer"]);
