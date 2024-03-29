import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import Spinner from "../Spinner";

export default function ProjectCompleteModal({
  open,
  setOpen,
  isLoading,
  onComplete,
  project,
}) {
  const cancelButtonRef = useRef(null);

  return (
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  {(project.deliverables.length === 0 && (
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning-100">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-warning-600"
                        aria-hidden="true"
                      />
                    </div>
                  )) || (
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
                      <CheckCircleIcon
                        className="h-6 w-6 text-success-600"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-neutral-700"
                    >
                      Complete Project{" "}
                    </Dialog.Title>
                    <div className="mt-2">
                      {project.deliverables.length === 0 && (
                        <p className="text-sm text-neutral-500">
                          There are no work submission from freelancer. Are you sure want
                          to complete project without any deliverables.
                        </p>
                      )}
                      <p className="text-sm text-neutral-500">
                        Please check all deliverables before completing a project.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:col-start-2"
                    onClick={onComplete}
                  >
                    {isLoading ? <Spinner /> : "  Mark As Completed"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
