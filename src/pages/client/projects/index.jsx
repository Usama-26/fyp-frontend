import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

function ClientProjects() {
  return (
    <WebLayout>
      <section>
        <div className="max-w-7xl mx-auto m-4 p-4 rounded-md  ">
          <h1 className="text-2xl font-display font-bold text-primary-950">
            My Projects
          </h1>

          <div className="my-8">
            <Link
              href={"/client/projects/create"}
              className="px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 text-white font-medium  inline-flex gap-2 items-center"
            >
              <span>Post New Project</span>
              <span>
                <FaPlus className="inline" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </WebLayout>
  );
}

export default withRouteProtect(ClientProjects, ["client"]);
