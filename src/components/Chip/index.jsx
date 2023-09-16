import Link from "next/link";

export default function Chip({ value }) {
  return (
    <Link
      href={value.toLowerCase()}
      className="px-2 py-1 border rounded-md text-zinc-500 text-xs hover:border-indigo-700 hover:text-indigo-700"
    >
      <span>{value}</span>
    </Link>
  );
}
