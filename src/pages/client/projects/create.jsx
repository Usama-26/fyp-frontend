import { ProjectInfoForm } from "@/components/ProjectInfoForm";
import { ProjectPricingForm } from "@/components/ProjectPricingForm";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import { useFormikContext } from "formik";
import Link from "next/link";

function CreateProject() {
  const formik = useFormikContext();

  return (
    <WebLayout>
      <section>
        <div className="max-w-7xl mx-auto m-4 rounded-md">
          <div className="rounded-md shadow-custom-md shadow-neutral-300 divide-y ">
            <div className="flex justify-between p-8">
              <div className="basis-5/12">
                <h1 className="text-2xl font-display text-primary-700">
                  {"Let's begin with filling up basic information"}
                </h1>
                <h4 className="text-lg">Tell us what you got in your mind</h4>
              </div>
              <div className="basis-6/12">
                <ProjectInfoForm />
              </div>
            </div>
            <div className="flex justify-between p-8">
              <div className="basis-5/12">
                <h1 className="text-2xl font-display text-primary-700">
                  {"Time to fill up pricing information"}
                </h1>
                <h4 className="text-lg">
                  Tell us about your budget and your expected delivery date.
                </h4>
              </div>
              <div className="basis-6/12">
                <ProjectPricingForm />
              </div>
            </div>
            <div className="px-8 py-4 border-t text-end">
              <div className="">
                <button
                  disabled
                  className=" mr-12 px-4 py-2 rounded-md border bg-primary-500 hover:bg-primary-700 disabled:bg-neutral-400 text-white font-medium  inline-flex gap-2 items-center text-sm"
                >
                  <span>Continue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </WebLayout>
  );
}

export default withRouteProtect(CreateProject, ["client"]);
