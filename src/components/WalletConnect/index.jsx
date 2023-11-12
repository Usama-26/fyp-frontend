import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { useAccount } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function WalletConnect() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { address, isConnected, connector } = useAccount();
  const { disconnect, status } = useDisconnect();
  const { connect, error } = useConnect({ connector: new InjectedConnector() });
  console.log(connector);
  return (
    <>
      {isConnected ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-medium text-success-600">{connector.name} Connected</h5>
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
          </div>
          <button
            onClick={disconnect}
            className="p-2 float-right font-medium rounded bg-danger-100 text-danger-700 hover:bg-danger-300"
          >
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button
          onClick={connect}
          className="p-2 font-medium rounded bg-primary-500 hover:bg-primary-700 text-white"
        >
          Wallet Connect
        </button>
      )}
    </>
  );
}
