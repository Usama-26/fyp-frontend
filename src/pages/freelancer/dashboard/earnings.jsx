import withRouteProtect from "@/helpers/withRouteProtect";
import FreelancerDashboardLayout from "@/layouts/FreelancerDashboardLayout";

function FreelancerEarnings() {
  return (
    <FreelancerDashboardLayout>
      <div className="flex gap-2">Earnings</div>
    </FreelancerDashboardLayout>
  );
}

export default withRouteProtect(FreelancerEarnings, ["freelancer"]);
