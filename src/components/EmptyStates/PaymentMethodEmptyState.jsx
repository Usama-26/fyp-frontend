import Image from "next/image";
import WalletConnect from "../WalletConnect";

export default function PaymentMethodEmptyState() {
  return (
    <div className="text-center">
      <Image
        src="/icons/ethereum-wallet.svg"
        width={144}
        height={144}
        alt="Ethereum Wallet"
        className="mx-auto"
      />
      <h3 className="mt-2 text-sm font-semibold text-neutral-700">
        No Payment Method Added
      </h3>
      <p className="mt-1 text-sm text-neutral-500">
        Add a crypto wallet to enable your payments
      </p>
      <div className="mt-6">
        <WalletConnect />
      </div>
    </div>
  );
}
