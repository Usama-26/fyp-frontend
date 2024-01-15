import Overview from "@/components/Gig/Overview";
import withRouteProtect from "@/helpers/withRouteProtect";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { default: WebLayout } = require("@/layouts/WebLayout");
const { CheckIcon } = require("@heroicons/react/20/solid");

const steps = [
  {
    id: "01",
    name: "Overview",
    href: "create?step=01",
    status: "completed",
  },
  {
    id: "02",
    name: "Pricing",
    href: "create?step=02",
    status: "upcoming",
  },
  {
    id: "03",
    name: "Gallery",
    href: "create?step=03",
    status: "upcoming",
  },
  {
    id: "04",
    name: "Preview",
    href: "create?step=04",
    status: "upcoming",
  },
];

function CreateGig() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    const active = steps.filter((step) => step.id === router.query.step);
    active[0].status = "current";
    setActiveStep(active[0]);
  }, [router.query]);

  return (
    <WebLayout>
      <div className="container mx-auto">
        <div className="my-4">
          <GigSteps />
          {activeStep?.id === "01" && <Overview step={steps[0]} />}
          {activeStep?.id === "02" && <Pricing />}
          {activeStep?.id === "03" && <Gallery />}
          {activeStep?.id === "04" && <Preview />}
        </div>
      </div>
    </WebLayout>
  );
}

export default withRouteProtect(CreateGig, ["freelancer"]);

function GigSteps() {
  const router = useRouter();
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-neutral-300 rounded-md border border-neutral-300 md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {step.status === "complete" ? (
              <button
                disabled
                onClick={() => router.replace(step.href)}
                className="group flex w-full items-center"
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 group-hover:bg-primary-800">
                    <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-neutral-700">
                    {step.name}
                  </span>
                </span>
              </button>
            ) : step.status === "current" ? (
              <button
                onClick={() => router.replace(step.href)}
                className="flex items-center px-6 py-4 text-sm font-medium"
                aria-current="step"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary-600">
                  <span className="text-primary-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-primary-600">
                  {step.name}
                </span>
              </button>
            ) : (
              <button
                disabled
                onClick={() => router.replace(step.href)}
                className="group flex items-center"
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 group-hover:border-neutral-400">
                    <span className="text-neutral-500 group-hover:text-neutral-700">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-neutral-500 group-hover:text-neutral-700">
                    {step.name}
                  </span>
                </span>
              </button>
            )}

            {stepIdx !== steps.length - 1 ? (
              <>
                {/* Arrow separator for lg screens and up */}
                <div
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-neutral-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Pricing() {
  return <div>STEP 2: PRICING</div>;
}
function Gallery() {
  return <div>STEP 3: GALLERY</div>;
}
function Preview() {
  return <div>STEP 4: PREVIEW</div>;
}
