import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";

function FreelancerDashboard() {
  return <WebLayout></WebLayout>;
}

export default withRouteProtect(FreelancerDashboard, ["freelancer"]);
