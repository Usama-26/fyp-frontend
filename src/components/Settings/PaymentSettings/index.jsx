import ErrorAlert from "@/components/Alerts/ErrorAlert";
import PaymentMethodEmptyState from "@/components/EmptyStates/PaymentMethodEmptyState";
import { useAccounts } from "@/context/AccountContext";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";

export default function PaymentSettings() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { disconnect, walletAddress, walletConnectionError, isConnected, connector } =
    useAccounts();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div>
      {walletConnectionError && (
        <ErrorAlert>
          <p>
            <b>{"Can't Connect Wallet:"}</b>{" "}
            <span>
              Either a wallet connecter is not present or user have rejected the request.
            </span>
          </p>
        </ErrorAlert>
      )}
      {isConnected ? (
        <div>
          <div className="max-w-xl space-y-4  mx-auto mb-4">
            <div className="basis-6/12 flex gap-2">
              <input
                value={walletAddress}
                type={isPasswordVisible ? "text" : "password"}
                disabled
                className="form-input font-medium text-neutral-500 italic"
              />
              <button onClick={togglePasswordVisibility} className="form-input flex-1">
                <IoMdEye />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <h5 className="font-medium text-success-500">{connector.name} Connected</h5>
              <button
                onClick={disconnect}
                className="p-2 font-medium rounded bg-danger-100 text-danger-700 hover:bg-danger-300"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <PaymentMethodEmptyState />
      )}
    </div>
  );
}
