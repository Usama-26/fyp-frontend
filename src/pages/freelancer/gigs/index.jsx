import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";

function FreelancerGigs() {
  return <WebLayout></WebLayout>;
}

export default withRouteProtect(FreelancerGigs, ["freelancer"]);
