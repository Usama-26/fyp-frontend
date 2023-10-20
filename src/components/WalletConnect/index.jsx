import { useAccount } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect, status } = useDisconnect();
  const { connect, error } = useConnect({ connector: new InjectedConnector() });
  return (
    <>
      <button
        onClick={connect}
        className="p-2 font-medium rounded bg-primary-600 text-white"
      >
        Wallet Connect
      </button>
    </>
  );
}
