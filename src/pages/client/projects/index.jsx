import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";

function Projects() {
  return (
    <WebLayout>
      <section>
        <div className="max-w-7xl mx-auto m-4 p-4 rounded-md  ">
          <h1 className="text-2xl font-display font-bold text-primary-950">
            My Projects
          </h1>
        </div>
      </section>
    </WebLayout>
  );
}

export default withRouteProtect(Projects, ["client"]);
