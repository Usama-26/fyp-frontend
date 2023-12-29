import { useAccounts } from "@/context/AccountContext";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function WalletConnect() {
  const { connect, error } = useConnect({ connector: new InjectedConnector() });
  const { address, isConnected } = useAccount();
  const handleConnect = () => {
    connect();
  };

  return (
    <>
      <button
        onClick={handleConnect}
        className="p-2 font-medium rounded bg-primary-500 hover:bg-primary-700 text-white"
      >
        Connect Wallet
      </button>
    </>
  );
}
