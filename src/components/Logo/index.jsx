import Link from "next/link";
import { SiHiveBlockchain } from "react-icons/si";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="text-2xl text-primary-700 inline-flex items-center"
    >
      <span>
        <SiHiveBlockchain className="inline w-8 h-8 mr-1" />
      </span>
      <b>
        <span>Chain</span>
        <span className="text-neutral-700">Work</span>
      </b>
    </Link>
  );
}
