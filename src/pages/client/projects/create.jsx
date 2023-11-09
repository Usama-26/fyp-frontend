import { ProjectInfoForm } from "@/components/ProjectForms/ProjectInfoForm";
import { ProjectPricingForm } from "@/components/ProjectForms/ProjectPricingForm";
import { ProjectScopeForm } from "@/components/ProjectForms/ProjectScopeForm";
import withRouteProtect from "@/helpers/withRouteProtect";
import WebLayout from "@/layouts/WebLayout";
import Head from "next/head";

function CreateProject() {
  return (
    <>
      <Head>
        <title>Post a Project | ChainWork</title>
      </Head>
      <WebLayout>
        <section>
          <div className="max-w-7xl mx-auto m-4 rounded-md">
            <div className="rounded-md shadow-custom-md shadow-neutral-300 divide-y ">
              <div className="flex justify-between p-8">
                <div className="basis-5/12">
                  <h1 className="text-2xl font-display text-primary-700 capitalize">
                    {"Let's begin with filling up basic information"}
                  </h1>
                  <h4>Tell us what you got in your mind</h4>
                </div>
                <div className="basis-6/12">
                  <ProjectInfoForm />
                </div>
              </div>

              <div className="flex justify-between p-8">
                <div className="basis-5/12">
                  <h1 className="text-2xl font-display text-primary-700 capitalize">
                    {"Next, estimate the Scope of your project"}
                  </h1>
                  <h4>
                    Choose among the estimated duration and what level of skills
                    do you require for your project
                  </h4>
                </div>
                <div className="basis-6/12">
                  <ProjectScopeForm />
                </div>
              </div>

              <div className="flex justify-between p-8">
                <div className="basis-5/12">
                  <h1 className="text-2xl font-display text-primary-700 capitalize">
                    {"Time to fill up pricing information"}
                  </h1>
                  <h4>
                    Tell us about your budget and your expected delivery date.
                  </h4>
                </div>
                <div className="basis-6/12">
                  <ProjectPricingForm />
                </div>
              </div>

              <div className="px-8 py-4 border-t text-end">
                <div className="flex justify-end gap-2">
                  <button className="px-4 py-2 rounded-md border hover:bg-neutral-200 disabled:bg-neutral-400 font-medium  inline-flex gap-2 items-center text-sm">
                    <span>Cancel</span>
                  </button>
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
    </>
  );
}

export default withRouteProtect(CreateProject, ["client"]);
