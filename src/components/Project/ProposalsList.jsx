import Image from "next/image";
import { useState } from "react";
import ViewProposal from "./ViewProposal";
import dayjs from "dayjs";
export default function ProposalsList({ proposals, project }) {
  const [isProposalViewOpen, setIsProposalViewOpen] = useState(false);
  const [activeProposal, setActiveProposal] = useState("");
  return (
    <>
      <ul role="list" className="space-y-2 py-1 max-h-96 p-1 overflow-auto">
        {proposals.map((proposal) => (
          <li key={proposal._id} className="">
            <button
              onClick={() => {
                setActiveProposal(proposal._id);
                setIsProposalViewOpen(true);
              }}
              className="w-full rounded-md transition duration-150 shadow-custom-sm hover:shadow-custom-lg hover:shadow-neutral-300 px-4 shadow-neutral-300 flex text-left items-center justify-between gap-x-6 py-5"
            >
              <div className="flex gap-x-4">
                <Image
                  className="h-12 w-12 flex-none rounded-full object-cover bg-neutral-50"
                  src={proposal.freelancer_id.profile_photo}
                  height={480}
                  width={480}
                  alt={`${proposal.freelancer_id.firstName} Profile Photo`}
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-neutral-700">
                    {proposal.freelancer_id.firstName}{" "}
                    {proposal.freelancer_id.lastName[0]}.
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-neutral-500">
                    {dayjs(proposal.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <div className="min-w-0 flex-auto text-end">
                <p className="text-sm font-semibold leading-6 text-neutral-700">
                  At ${proposal.bid_amount}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-neutral-500">
                  Delivery On {dayjs(proposal.delivery_data).format("DD/MM/YYYY")}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <ViewProposal
        proposalId={activeProposal}
        open={isProposalViewOpen}
        setOpen={setIsProposalViewOpen}
        project={project}
      />
    </>
  );
}
