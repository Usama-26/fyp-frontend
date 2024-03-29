import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useAccount } from "wagmi";
import WalletConnect from "../WalletConnect";
import { useContractWrite } from "wagmi";
import { escrowABI, escrowAddress } from "@/contract";
import { parseEther } from "viem";
import { useThirdPartyServices } from "@/context/ThirdPartyContext";
import { useProjects } from "@/context/ProjectContext";
import Spinner from "../Spinner";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function PurchaseGigModal({ open, setOpen, gigData, user }) {
  const { isConnected, address } = useAccount();
  const [isAssigning, setIsAssigning] = useState(false);
  const [inEthereum, setInEthereum] = useState();
  const { convertToEthereum } = useThirdPartyServices();
  const router = useRouter();
  const { postProject, updateProject } = useProjects();

  const { writeAsync } = useContractWrite({
    abi: escrowABI,
    address: escrowAddress,
    functionName: "awardProject",
  });
  const cancelButtonRef = useRef(null);

  const handlePayment = async (project) => {
    try {
      const response = writeAsync?.({
        args: [
          project._id,
          gigData.created_by.wallet_address,
          parseEther(`${parseFloat((project.budget / inEthereum).toFixed(5))}`),
        ],
        from: address,
        value: parseEther(`${parseFloat((project.budget / inEthereum).toFixed(5))}`),
      });
      return response;
    } catch (error) {
      return error.message;
    }
  };

  const createProject = async () => {
    const projectData = {
      created_by: user?._id,
      title: gigData.title,
      description: gigData.description,
      category: gigData.category,
      sub_category: gigData.sub_category,
      service: gigData.service,
      tags: gigData.tags,
      budget: gigData.price,
      pricing_type: "fixed",
      deadline: dayjs().add(gigData.delivery_days, "day").format("YYYY-MM-DD"),
      gig: gigData._id,
      assigned_to: gigData.created_by._id,
      status: "assigned",
      attachments: [],
    };
    try {
      const response = await postProject(projectData);
      return response;
    } catch (error) {
      return error;
    }
  };

  const handlePurchaseService = async () => {
    setIsAssigning(true);
    try {
      const project = await createProject();
      const paymentRes = await handlePayment(project);
      const updatedProject = await updateProject(project?._id, {
        transactions: { escrow_transaction_id: paymentRes?.hash },
      });
      setIsAssigning(false);
      if (updatedProject) {
        router.push("/client/projects");
      }
    } catch (error) {
      setIsAssigning(false);
      return error;
    }
  };

  useEffect(() => {
    convertToEthereum(setInEthereum);
  }, []);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {gigData && user && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                    <div>
                      <div className="mt-3 sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold mb-4 leading-6 text-neutral-700 text-center"
                        >
                          Checkout
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-neutral-700 mb-2">
                              {gigData.title}
                            </h2>
                            <div className="text-end">
                              <span className="text-neutral-700 font-semibold">
                                ${gigData.price}
                              </span>
                              <br />
                              <span className="text-neutral-700 font-semibold">
                                {inEthereum &&
                                  parseFloat(
                                    (gigData.price / inEthereum).toFixed(4)
                                  )}{" "}
                                ETH
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-neutral-700 mb-2">
                              Assigned to
                            </h2>
                            <div className="flex items-center gap-2">
                              <div>
                                <Image
                                  src={gigData.created_by.profile_photo}
                                  width={150}
                                  height={150}
                                  className="w-12 aspect-square object-cover rounded-full"
                                  alt="Profile Picture"
                                />
                              </div>
                              <div className="text-sm">
                                <h2 className="font-semibold text-neutral-700">
                                  {`${gigData.created_by.firstName} ${gigData.created_by.lastName[0]}.`}
                                </h2>
                                <p className="text-neutral-500 "></p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center py-4">
                            <h2 className="font-semibold text-neutral-700">
                              Service Fee
                            </h2>
                            <span className="text-neutral-700 font-semibold">$0.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      {isConnected ? (
                        <button
                          type="button"
                          onClick={handlePurchaseService}
                          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-4 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        >
                          {isAssigning ? <Spinner /> : "Purchase Service"}
                        </button>
                      ) : (
                        <WalletConnect />
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          )}
        </Dialog>
      </Transition.Root>
    </>
  );
}
