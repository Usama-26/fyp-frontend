import { XCircleIcon } from "@heroicons/react/20/solid";

export default function ErrorAlert({ children }) {
  return (
    <div className="border-l-4 border-danger-400 bg-danger-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-danger-400" aria-hidden="true" />
        </div>
        <div className="ml-3 text-sm text-danger-700">{children}</div>
      </div>
    </div>
  );
}
