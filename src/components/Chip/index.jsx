export default function Chip({ value }) {
  return (
    <button className="px-2 py-1 border rounded-md text-neutral-500 text-xs hover:border-primary-700 hover:text-primary-700">
      <span>{value}</span>
    </button>
  );
}
