import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { useAccount } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function WalletConnect() {
  const { connect, error } = useConnect({ connector: new InjectedConnector() });

  return (
    <>
      <button
        onClick={connect}
        className="p-2 font-medium rounded bg-primary-500 hover:bg-primary-700 text-white"
      >
        Connect Wallet
      </button>
    </>
  );
}
