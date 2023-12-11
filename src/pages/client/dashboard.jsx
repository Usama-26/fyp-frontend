import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";

function ClientDashboard() {
  return <WebLayout></WebLayout>;
}

export default withRouteProtect(ClientDashboard, ["client"]);
