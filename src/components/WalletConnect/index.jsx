import { useAccounts } from "@/context/AccountContext";

export default function WalletConnect() {
  const { connect } = useAccounts();
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
