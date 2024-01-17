import { UserCircleIcon, MagnifyingGlassCircleIcon, ChatBubbleLeftRightIcon, LockClosedIcon } from "@heroicons/react/24/outline";

function Step({ iconComponent, title, description }) {
  const cardStyle = {
    height: '330px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  return (
    <div className="p-4 md:w-1/4">
      <div className="flex flex-col items-center text-center">
        <div className="w-full bg-white rounded-lg p-6 flex flex-col items-center shadow-2xl" style={cardStyle}>
          <div className="mb-3">
            {iconComponent}
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
            <hr className="border-t-2 border-b-blue-400 my-2" />
            <p className="leading-relaxed text-justify">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="text-neutral-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-3xl font-medium title-font mb-4 text-neutral-900">
            How it works
          </h2>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Discover, Connect, and Collaborate – Where Clients Find Talent and Freelancers Find Opportunities
          </p>
        </div>
        <div className="flex flex-wrap">
          <Step
            iconComponent={<UserCircleIcon className="h-24 w-24 text-zinc-700" />}
            title="Sign Up & Set Up"
            description="Get started by signing up for free. Whether you're a freelancer or a client, create a comprehensive profile to join our decentralized community."
          />
          <Step
            iconComponent={<MagnifyingGlassCircleIcon className="h-24 w-24 text-zinc-700" />}
            title="Explore & Connect"
            description="Browse through a multitude of gigs or post your project. Freelancers can showcase their skills, while clients find the perfect match for their needs."
          />
          <Step
            iconComponent={<ChatBubbleLeftRightIcon className="h-24 w-24 text-zinc-700" />}
            title="Collaborate Effectively"
            description="Utilize our secure workspace to communicate, share files, and track progress. We ensure a seamless connection between clients and freelancers."
          />
          <Step
            iconComponent={<LockClosedIcon className="h-24 w-24 text-zinc-700" />}
            title="Transact with Trust"
            description="Complete projects and process payments with confidence. Our escrow system protects both parties, ensuring satisfaction and peace of mind."
          />
        </div>
      </div>
    </section>
  );
}
