import PaymentMethodEmptyState from "@/components/EmptyStates/PaymentMethodEmptyState";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { useDisconnect } from "wagmi";
import { useAccount } from "wagmi";

export default function PaymentSettings() {
  const { address, isConnected, connector } = useAccount();
  const { disconnect, status } = useDisconnect();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div>
      {isConnected ? (
        <>
          <div className="max-w-xl space-y-4  mx-auto mb-4">
            <div className="basis-6/12 flex gap-2">
              <input
                value={address}
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
        </>
      ) : (
        <PaymentMethodEmptyState />
      )}
    </div>
  );
}
